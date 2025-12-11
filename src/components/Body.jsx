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

export default function Body({
  bodyType,
  setBodyType,
  customBodies,
  bodyRoundness,
  setBodyRoundness,
  bodyColor,
  setBodyColor,
  // pattern bits
  patternType,
  setPatternType,
  customPatterns,
  currentCustomPattern,
  patternDensity,
  setPatternDensity,
  patternColor,
  setPatternColor,
  setDrawTarget,
  moveBodyOffset
}) {
  return (
    <>
      <SectionHeader title="body" />
      <Row>
        <label style={labelStyle}>shape</label>
        <select
          value={bodyType}
          onChange={e => setBodyType(e.target.value)}
          style={selectStyle}
        >
          <option value="default">default blob</option>
          {customBodies.length > 0 && (
            <optgroup label="custom bodies">
              {customBodies.map((cb, idx) => (
                <option key={`cb-${idx}`} value={cb.name}>
                  {cb.name}
                </option>
              ))}
            </optgroup>
          )}
        </select>
        <MiniPenButton
          onClick={() => setDrawTarget("body")}
          title="draw your own body"
        />
      </Row>

      {bodyType === "default" && (
        <>
          <SizeAdjuster
            label="skinny → chubby"
            value={bodyRoundness}
            min={0}
            max={100}
            step={10}
            onChange={setBodyRoundness}
          />
          <Row>
            <label style={labelStyle}>body colour</label>
            <input
              type="color"
              value={bodyColor}
              onChange={e => setBodyColor(e.target.value)}
              style={colorInputStyle}
            />
          </Row>
        </>
      )}

      <PositionAdjuster label="body pos" onChange={moveBodyOffset} />

      {/* pattern controls inline */}
      <div style={{ marginTop: "8px" }}>
        <Row>
          <label style={labelStyle}>pattern</label>
          <select
            value={patternType}
            onChange={e => setPatternType(e.target.value)}
            style={selectStyle}
          >
            <option value="solid">none / solid</option>
            <option value="stripes">stripes (head + body)</option>
            <option value="spots">spots (head + body)</option>
            <option value="merle">merle-ish (head + body)</option>
            <option value="different">
              different: stripes body, spots head
            </option>
            {customPatterns.length > 0 && (
              <optgroup label="custom patterns">
                {customPatterns.map((cp, idx) => (
                  <option key={`cp-${idx}`} value={cp.name}>
                    {cp.name}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
          <MiniPenButton
            onClick={() => setDrawTarget("pattern")}
            title="draw your own pattern"
          />
        </Row>

        {!currentCustomPattern && patternType !== "solid" && (
          <>
            <SizeAdjuster
              label="density"
              value={patternDensity}
              min={0}
              max={100}
              step={10}
              onChange={setPatternDensity}
            />
            <Row>
              <label style={labelStyle}>pattern colour</label>
              <input
                type="color"
                value={patternColor}
                onChange={e => setPatternColor(e.target.value)}
                style={colorInputStyle}
              />
            </Row>
          </>
        )}
      </div>

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
