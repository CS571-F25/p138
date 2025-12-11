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

export default function Head({
  headType,
  setHeadType,
  customHeads,
  headSize,
  setHeadSize,
  headColor,
  setHeadColor,
  moveHeadOffset,
  setDrawTarget
}) {
  return (
    <>
      <SectionHeader title="head" />
      <Row>
        <label style={labelStyle}>shape</label>
        <select
          value={headType}
          onChange={e => setHeadType(e.target.value)}
          style={selectStyle}
        >
          <option value="default">default head</option>
          {customHeads.length > 0 && (
            <optgroup label="custom heads">
              {customHeads.map((ch, idx) => (
                <option key={`ch-${idx}`} value={ch.name}>
                  {ch.name}
                </option>
              ))}
            </optgroup>
          )}
        </select>
        <MiniPenButton
          onClick={() => setDrawTarget("head")}
          title="draw your own head"
        />
      </Row>

      {headType === "default" && (
        <>
          <SizeAdjuster
            label="head size"
            value={headSize}
            min={0}
            max={100}
            step={10}
            onChange={setHeadSize}
          />
          <Row>
            <label style={labelStyle}>head colour</label>
            <input
              type="color"
              value={headColor}
              onChange={e => setHeadColor(e.target.value)}
              style={colorInputStyle}
            />
          </Row>
        </>
      )}

      <PositionAdjuster label="head pos" onChange={moveHeadOffset} />

      <Divider />
    </>
  );
}

/* tiny helpers */

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
