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

export default function Extras({
  extraType,
  setExtraType,
  customExtras,
  extraColor,
  setExtraColor,
  extrasSize,
  setExtrasSize,
  currentCustomExtras,
  moveExtrasOffset,
  setDrawTarget
}) {
  return (
    <>
      <SectionHeader
        title="extras"
        onDraw={() => setDrawTarget("extras")}
      />
      <Row>
        <label style={labelStyle}>type</label>
        <select
          value={extraType}
          onChange={e => setExtraType(e.target.value)}
          style={selectStyle}
        >
          <option value="none">none</option>
          <option value="tiny angel wings">tiny angel wings (svg)</option>
          <option value="bat wings">bat wings (svg)</option>
          <optgroup label="extras stickers">
            <option value="butterflywings.png">butterfly wings (png)</option>
            <option value="batwings.png">bat wings (png)</option>
            <option value="angelwings.png">angel wings (png)</option>
            <option value="devilwings.png">devil wings (png)</option>
            <option value="halo.png">halo (png)</option>
          </optgroup>
          {customExtras.length > 0 && (
            <optgroup label="custom extras">
              {customExtras.map((ce, idx) => (
                <option key={`ex-${idx}`} value={ce.name}>
                  {ce.name}
                </option>
              ))}
            </optgroup>
          )}
        </select>
      </Row>

      {extraType !== "none" && (
        <>
          <SizeAdjuster
            label="resize"
            value={extrasSize}
            min={0}
            max={100}
            step={10}
            onChange={setExtrasSize}
          />
          {!currentCustomExtras && !extraType.endsWith(".png") && (
            <Row>
              <label style={labelStyle}>colour</label>
              <input
                type="color"
                value={extraColor}
                onChange={e => setExtraColor(e.target.value)}
                style={colorInputStyle}
              />
            </Row>
          )}
          <PositionAdjuster
            label="position"
            onChange={moveExtrasOffset}
          />
        </>
      )}
    </>
  );
}

function SectionHeader({ title, onDraw }) {
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
      {onDraw && (
        <button
          type="button"
          onClick={onDraw}
          title={`draw your own ${title}`}
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
      )}
    </div>
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
