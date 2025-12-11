import React, { useState, useRef, useEffect } from "react";

export default function DrawingPad({
  width = 480,
  height = 320,
  label = "piece",
  onSave
}) {
  const canvasRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const [penSize, setPenSize] = useState(4);
  const [mode, setMode] = useState("pen"); // "pen" | "eraser"

  const [name, setName] = useState("");
  const [justSaved, setJustSaved] = useState(false);

  const [historyState, setHistoryState] = useState({
    stack: [],
    index: -1
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveSnapshot(canvas, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveSnapshot(canvas, isInitial = false) {
    const dataUrl = canvas.toDataURL("image/png");
    setHistoryState(prev => {
      let stack = prev.stack;
      let index = prev.index;

      if (!isInitial && index >= 0 && index < stack.length - 1) {
        stack = stack.slice(0, index + 1);
      }

      const newStack = [...stack, dataUrl];
      return { stack: newStack, index: newStack.length - 1 };
    });
  }

  function loadFromHistoryAt(stack, idx) {
    const canvas = canvasRef.current;
    if (!canvas || idx < 0 || idx >= stack.length) return;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = stack[idx];
  }

  function handleUndo() {
    if (historyState.index <= 0) return;
    const newIndex = historyState.index - 1;
    loadFromHistoryAt(historyState.stack, newIndex);
    setHistoryState(prev => ({ ...prev, index: newIndex }));
  }

  function handleRedo() {
    if (
      historyState.index < 0 ||
      historyState.index >= historyState.stack.length - 1
    ) {
      return;
    }
    const newIndex = historyState.index + 1;
    loadFromHistoryAt(historyState.stack, newIndex);
    setHistoryState(prev => ({ ...prev, index: newIndex }));
  }

  function handleClear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveSnapshot(canvas);
  }

  // convert pointer coords -> canvas coords, accounting for CSS scaling
  function getCanvasCoords(e) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    return { x, y };
  }

  function startDrawing(e) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const { x, y } = getCanvasCoords(e);

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = penSize;

    if (mode === "pen") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = penColor;
    } else {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  }

  function draw(e) {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const { x, y } = getCanvasCoords(e);

    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function stopDrawing() {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.closePath();
    setIsDrawing(false);
    saveSnapshot(canvas);
  }

  function handlePointerDown(e) {
    e.preventDefault();
    e.target.setPointerCapture(e.pointerId);
    startDrawing(e);
  }

  function handlePointerMove(e) {
    if (!isDrawing) return;
    e.preventDefault();
    draw(e);
  }

  function handlePointerUp(e) {
    e.preventDefault();
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    stopDrawing();
  }

  function handleSavePart() {
    if (!canvasRef.current || !onSave) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    const trimmed = name.trim() || `${label} doodle`;
    onSave({ name: trimmed, dataUrl });
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1200);
  }

  const canUndo = historyState.index > 0;
  const canRedo =
    historyState.index >= 0 &&
    historyState.index < historyState.stack.length - 1;

  const presetColours = [
    "#000000",
    "#ffffff",
    "#ff6b81",
    "#ffb347",
    "#ffe066",
    "#63e6be",
    "#74c0fc",
    "#b197fc"
  ];

  return (
    <div
      style={{
        borderRadius: "18px",
        border: "1px solid #ded3ff",
        padding: "12px 14px 14px",
        backgroundColor: "#faf7ff",
        maxWidth: "620px"
      }}
    >
      {/* toolbar top row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px"
        }}
      >
        {/* mode toggle */}
        <div
          style={{
            display: "inline-flex",
            borderRadius: "999px",
            border: "1px solid #ded3ff",
            overflow: "hidden"
          }}
        >
          <button
            type="button"
            onClick={() => setMode("pen")}
            style={{
              padding: "4px 10px",
              fontSize: "0.8rem",
              border: "none",
              background: mode === "pen" ? "#7c6aff" : "transparent",
              color: mode === "pen" ? "#fff" : "#5b4f94",
              cursor: "pointer"
            }}
          >
            pen
          </button>
          <button
            type="button"
            onClick={() => setMode("eraser")}
            style={{
              padding: "4px 10px",
              fontSize: "0.8rem",
              border: "none",
              borderLeft: "1px solid #ded3ff",
              background: mode === "eraser" ? "#7c6aff" : "transparent",
              color: mode === "eraser" ? "#fff" : "#5b4f94",
              cursor: "pointer"
            }}
          >
            eraser
          </button>
        </div>

        {/* brush size */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flex: "1 1 auto",
            minWidth: "140px"
          }}
        >
          <span
            style={{
              fontSize: "0.8rem",
              color: "#777"
            }}
          >
            size
          </span>
          <input
            type="range"
            min={1}
            max={30}
            value={penSize}
            onChange={e => setPenSize(Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <span
            style={{
              fontSize: "0.8rem",
              color: "#777",
              width: "30px",
              textAlign: "right"
            }}
          >
            {penSize}
          </span>
        </div>

        {/* undo / redo / clear */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            flexWrap: "wrap"
          }}
        >
          <button
            type="button"
            onClick={handleUndo}
            disabled={!canUndo}
            style={{
              ...smallButton,
              opacity: canUndo ? 1 : 0.4,
              cursor: canUndo ? "pointer" : "default"
            }}
          >
            undo
          </button>
          <button
            type="button"
            onClick={handleRedo}
            disabled={!canRedo}
            style={{
              ...smallButton,
              opacity: canRedo ? 1 : 0.4,
              cursor: canRedo ? "pointer" : "default"
            }}
          >
            redo
          </button>
          <button
            type="button"
            onClick={handleClear}
            style={{
              ...smallButton,
              background: "#ffe3e3",
              borderColor: "#ffb3b3",
              color: "#a33232"
            }}
          >
            clear
          </button>
        </div>
      </div>

      {/* colours row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px",
          flexWrap: "wrap"
        }}
      >
        <span
          style={{
            fontSize: "0.8rem",
            color: "#777"
          }}
        >
          colour
        </span>
        <input
          type="color"
          value={penColor}
          onChange={e => setPenColor(e.target.value)}
          style={{
            width: "34px",
            height: "26px",
            padding: 0,
            border: "1px solid #ded3ff",
            borderRadius: "6px",
            background: "transparent"
          }}
        />
        <div
          style={{
            display: "flex",
            gap: "4px",
            flexWrap: "wrap"
          }}
        >
          {presetColours.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setPenColor(c);
                setMode("pen");
              }}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "999px",
                border:
                  penColor.toLowerCase() === c.toLowerCase()
                    ? "2px solid #7c6aff"
                    : "1px solid #ccc",
                backgroundColor: c,
                cursor: "pointer"
              }}
            />
          ))}
        </div>
      </div>

      {/* name + save */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px",
          flexWrap: "wrap"
        }}
      >
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={`name this ${label} (eg: pastel bunny ears)`}
          style={{
            flex: "1 1 200px",
            minWidth: "180px",
            borderRadius: "999px",
            border: "1px solid #ded3ff",
            padding: "6px 12px",
            fontSize: "0.8rem",
            backgroundColor: "#fff"
          }}
        />
        <button
          type="button"
          onClick={handleSavePart}
          style={{
            borderRadius: "999px",
            border: "1px solid #7c6aff",
            padding: "6px 12px",
            fontSize: "0.8rem",
            background: "#7c6aff",
            color: "#fff",
            cursor: "pointer",
            whiteSpace: "nowrap"
          }}
        >
          save {label}
        </button>
        {justSaved && (
          <span
            style={{
              fontSize: "0.75rem",
              color: "#4c7c3a"
            }}
          >
            saved ✓
          </span>
        )}
      </div>

      {/* canvas */}
      <div
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid #ded3ff",
          background: "#ffffff"
        }}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            touchAction: "none",
            cursor: mode === "eraser" ? "cell" : "crosshair"
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      </div>
    </div>
  );
}

const smallButton = {
  borderRadius: "999px",
  border: "1px solid #ded3ff",
  padding: "3px 8px",
  fontSize: "0.75rem",
  background: "#faf7ff",
  color: "#5b4f94",
  cursor: "pointer"
};
