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

export default function Legs({
  legStyle,
  setLegStyle,
  customLegs,
  legCount,
  setLegCount,
  legSize,
  setLegSize,
  legColor,
  setLegColor,
  activeLegIndex,
  setActiveLegIndex,
  moveLegOffset,
  moveSingleLegOffset,
  setDrawTarget
}) {
  const clampedIndex = Math.min(
    Math.max(activeLegIndex, 0),
    Math.max(legCount - 1, 0)
  );

  return (
    <>
      <SectionHeader title="legs" />
      <Row>
        <label style={labelStyle}>style</label>
        <select
          value={legStyle}
          onChange={e => setLegStyle(e.target.value)}
          style={selectStyle}
        >
          <option value="default">default legs</option>
          {customLegs.length > 0 && (
            <optgroup label="custom legs">
              {customLegs.map((cl, idx) => (
                <option key={`cl-${idx}`} value={cl.name}>
                  {cl.name}
                </option>
              ))}
            </optgroup>
          )}
        </select>
        <MiniPenButton
          onClick={() => setDrawTarget("legs")}
          title="draw your own legs"
        />
      </Row>

      {legStyle === "default" && (
        <>
          <SizeAdjuster
            label="count (0–8)"
            value={legCount}
            min={0}
            max={8}
            step={1}
            onChange={setLegCount}
          />
          <Row>
            <label style={labelStyle}>leg colour</label>
            <input
              type="color"
              value={legColor}
              onChange={e => setLegColor(e.target.value)}
              style={colorInputStyle}
            />
          </Row>
        </>
      )}

      <SizeAdjuster
        label="resize (all legs)"
        value={legSize}
        min={0}
        max={100}
        step={10}
        onChange={setLegSize}
      />

      <PositionAdjuster
        label="group position"
        onChange={moveLegOffset}
      />

      {legStyle === "default" && legCount > 0 && (
        <>
          <SizeAdjuster
            label="which leg to nudge"
            value={clampedIndex + 1}
            min={1}
            max={Math.max(legCount, 1)}
            step={1}
            onChange={val => setActiveLegIndex((val || 1) - 1)}
          />
          <PositionAdjuster
            label="nudge that leg"
            onChange={moveSingleLegOffset}
          />
        </>
      )}

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
