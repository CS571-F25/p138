import SizeAdjuster from "./SizeAdjuster";
import PositionAdjuster from "./PositionAdjuster";

const labelStyle = {
  flexShrink: 0,
  width: "80px",
  fontSize: "0.8rem",
  textTransform: "lowercase",
  color: "#777"
};

const selectStyle = {
  flex: 1,
  borderRadius: "999px",
  border: "1px solid #ded3ff",
  padding: "4px 10px",
  fontSize: "0.85rem",
  backgroundColor: "#fbf9ff"
};

const colorInputStyle = {
  width: "40px",
  height: "24px",
  padding: 0,
  borderRadius: "6px",
  border: "1px solid #ded3ff",
  background: "transparent"
};

function isEyePngType(t) {
  return (
    t === "eyes1" ||
    t === "eyes2" ||
    t === "eyes3" ||
    (t && t.endsWith(".png") && t.startsWith("eyes"))
  );
}

function isMouthPngType(t) {
  return (
    t === "mouth1" ||
    t === "mouth2" ||
    t === "mouth3" ||
    (t && t.endsWith(".png") && t.startsWith("mouth"))
  );
}

export default function Face({
  eyeType,
  setEyeType,
  customEyes,
  eyeStyle,
  setEyeStyle,
  eyeColor,
  setEyeColor,
  customNoses,
  noseType,
  setNoseType,
  noseSize,
  setNoseSize,
  customMouths,
  mouthType,
  setMouthType,
  mouthSize,
  setMouthSize,
  mouthColor,
  setMouthColor,
  currentCustomMouth,
  moveFaceOffset,
  moveEyesOffset,
  moveNoseOffset,
  moveMouthOffset,
  setDrawTarget
}) {
  const eyeIsPng = isEyePngType(eyeType);
  const mouthIsPng = isMouthPngType(mouthType);

  return (
    <>
      <SectionHeader title="face" />

      {/* eyes */}
      <Row>
        <label style={labelStyle}>eyes</label>
        <select
          value={eyeType}
          onChange={e => setEyeType(e.target.value)}
          style={selectStyle}
        >
          <option value="default">default eyes</option>
          <option value="eyes1">eyes 1 (png)</option>
          <option value="eyes2">eyes 2 (png)</option>
          <option value="eyes3">eyes 3 (png)</option>
          {customEyes.length > 0 && (
            <optgroup label="custom eyes">
              {customEyes.map((ce, idx) => (
                <option key={`eyes-${idx}`} value={ce.name}>
                  {ce.name}
                </option>
              ))}
            </optgroup>
          )}
        </select>
        <MiniPenButton
          onClick={() => setDrawTarget("eyes")}
          title="draw your own eyes"
        />
      </Row>

      {/* eye size slider – now can go smaller */}
      <SizeAdjuster
        label="eye size"
        value={eyeStyle}
        min={0}
        max={10}
        step={1}
        onChange={setEyeStyle}
      />
      {!eyeIsPng && eyeType === "default" && (
        <Row>
          <label style={labelStyle}>eye colour</label>
          <input
            type="color"
            value={eyeColor}
            onChange={e => setEyeColor(e.target.value)}
            style={colorInputStyle}
          />
        </Row>
      )}

      {/* nose */}
      <Row>
        <label style={labelStyle}>nose</label>
        <select
          value={noseType}
          onChange={e => setNoseType(e.target.value)}
          style={selectStyle}
        >
          <option value="tiny triangle">tiny triangle</option>
          <option value="button nose">button nose</option>
          <option value="heart nose">heart nose</option>
          <option value="long snoot">long snoot</option>
          <option value="simple dot">simple dot</option>
          {customNoses.length > 0 && (
            <optgroup label="custom noses">
              {customNoses.map((cn, idx) => (
                <option key={`nose-${idx}`} value={cn.name}>
                  {cn.name}
                </option>
              ))}
            </optgroup>
          )}
        </select>
        <MiniPenButton
          onClick={() => setDrawTarget("nose")}
          title="draw your own nose"
        />
      </Row>
      <SizeAdjuster
        label="nose size"
        value={noseSize}
        min={0}
        max={100}
        step={10}
        onChange={setNoseSize}
      />

      {/* mouth */}
      <Row>
        <label style={labelStyle}>mouth</label>
        <select
          value={mouthType}
          onChange={e => setMouthType(e.target.value)}
          style={selectStyle}
        >
          <option value="none">none</option>
          <option value="smile">simple smile</option>
          <option value="mouth1">mouth 1 (png)</option>
          <option value="mouth2">mouth 2 (png)</option>
          <option value="mouth3">mouth 3 (png)</option>
          {customMouths.length > 0 && (
            <optgroup label="custom mouths">
              {customMouths.map((cm, idx) => (
                <option key={`mouth-${idx}`} value={cm.name}>
                  {cm.name}
                </option>
              ))}
            </optgroup>
          )}
        </select>
        <MiniPenButton
          onClick={() => setDrawTarget("mouth")}
          title="draw your own mouth"
        />
      </Row>

      {mouthType !== "none" && !currentCustomMouth && (
        <>
          <SizeAdjuster
            label="mouth size"
            value={mouthSize}
            min={0}
            max={100}
            step={10}
            onChange={setMouthSize}
          />
          {!mouthIsPng && (
            <Row>
              <label style={labelStyle}>mouth colour</label>
              <input
                type="color"
                value={mouthColor}
                onChange={e => setMouthColor(e.target.value)}
                style={colorInputStyle}
              />
            </Row>
          )}
        </>
      )}

      {/* global + per-part offsets */}
      <PositionAdjuster label="face pos" onChange={moveFaceOffset} />
      <PositionAdjuster label="eyes pos" onChange={moveEyesOffset} />
      <PositionAdjuster label="nose pos" onChange={moveNoseOffset} />
      <PositionAdjuster label="mouth pos" onChange={moveMouthOffset} />

      <Divider />
    </>
  );
}

/* tiny helpers – local to this file */

function SectionHeader({ title }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "6px"
      }}
    >
      <p
        style={{
          fontSize: "0.9rem",
          fontWeight: 600,
          color: "#8c7fff",
          textTransform: "lowercase",
          margin: 0
        }}
      >
        {title}
      </p>
    </div>
  );
}

function MiniPenButton({ onClick, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        borderRadius: "999px",
        border: "1px solid #ded3ff",
        width: "24px",
        height: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#faf7ff",
        fontSize: "0.8rem",
        cursor: "pointer",
        color: "#7c6aff",
        padding: 0,
        flexShrink: 0
      }}
    >
      🖊
    </button>
  );
}

function Row({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "8px"
      }}
    >
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: "1px",
        background:
          "linear-gradient(90deg, rgba(199,187,255,0.15), rgba(199,187,255,0.9), rgba(199,187,255,0.15))",
        margin: "10px 0 14px"
      }}
    />
  );
}
