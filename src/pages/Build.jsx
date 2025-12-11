import { useState } from "react";
import DrawingPad from "../components/DrawingPad";
import SizeAdjuster from "../components/SizeAdjuster";
import PositionAdjuster from "../components/PositionAdjuster";

import AnimalPreview from "../components/AnimalPreview";
import Face from "../components/Face";
import Legs from "../components/Legs";
import Body from "../components/Body";
import Head from "../components/Head";
import Extras from "../components/Extras";

export default function Build() {
  const [backgroundMode, setBackgroundMode] = useState("gradient");
  const [backgroundColour, setBackgroundColour] = useState("#fef6f9");
  const [gradientColor1, setGradientColor1] = useState("#fff7fb");
  const [gradientColor2, setGradientColor2] = useState("#f3f7ff");

  // ears
  const [earType, setEarType] = useState("default");
  const [earSize, setEarSize] = useState(60);
  const [earColor, setEarColor] = useState("#ffffff");
  const [earOffset, setEarOffset] = useState({ x: 0, y: 0 });
  const [customEars, setCustomEars] = useState([]);

  const [bodyOffset, setBodyOffset] = useState({ x: 0, y: 0 });

  const [patternType, setPatternType] = useState("solid");
  const [patternDensity, setPatternDensity] = useState(40);
  const [patternColor, setPatternColor] = useState("#ffd6f5");
  const [customPatterns, setCustomPatterns] = useState([]);

  const [eyeType, setEyeType] = useState("default");
  const [customEyes, setCustomEyes] = useState([]);
  const [eyeStyle, setEyeStyle] = useState(3); // 0–10
  const [eyeColor, setEyeColor] = useState("#000000");

  const [noseType, setNoseType] = useState("tiny triangle");
  const [noseSize, setNoseSize] = useState(40);
  const [customNoses, setCustomNoses] = useState([]);

  const [mouthType, setMouthType] = useState("none");
  const [mouthSize, setMouthSize] = useState(40);
  const [mouthColor, setMouthColor] = useState("#333333");
  const [customMouths, setCustomMouths] = useState([]);

  const [faceOffset, setFaceOffset] = useState({ x: 0, y: 0 });
  const [eyesOffset, setEyesOffset] = useState({ x: 0, y: 0 });
  const [noseOffset, setNoseOffset] = useState({ x: 0, y: 0 });
  const [mouthOffset, setMouthOffset] = useState({ x: 0, y: 0 });

  const [legStyle, setLegStyle] = useState("default");
  const [customLegs, setCustomLegs] = useState([]);
  const [legCount, setLegCount] = useState(4);
  const [legSize, setLegSize] = useState(50);
  const [legOffset, setLegOffset] = useState({ x: 0, y: 0 });
  const [legColor, setLegColor] = useState("#444444");
  const [legOffsets, setLegOffsets] = useState(
    Array.from({ length: 8 }, () => ({ x: 0, y: 0 }))
  );
  const [activeLegIndex, setActiveLegIndex] = useState(0);

  // body
  const [bodyType, setBodyType] = useState("default");
  const [customBodies, setCustomBodies] = useState([]);
  const [bodyRoundness, setBodyRoundness] = useState(50);
  const [bodyColor, setBodyColor] = useState("#ffffff");

  // head
  const [headType, setHeadType] = useState("default");
  const [customHeads, setCustomHeads] = useState([]);
  const [headSize, setHeadSize] = useState(50);
  const [headColor, setHeadColor] = useState("#ffffff");
  const [headOffset, setHeadOffset] = useState({ x: 0, y: 0 });

  // tails – puffball svg + pngs
  const baseTailOptions = [
    { value: "puffball", label: "puffball (svg)" },
    { value: "no tail", label: "no tail" }
  ];
  const [tailType, setTailType] = useState("puffball");
  const [tailSize, setTailSize] = useState(50);
  const [tailColor, setTailColor] = useState("#ffffff");
  const [tailOffset, setTailOffset] = useState({ x: 0, y: 0 });
  const [customTails, setCustomTails] = useState([]);

  const [extraType, setExtraType] = useState("none");
  const [extraColor, setExtraColor] = useState("#ffeaa7");
  const [extrasOffset, setExtrasOffset] = useState({ x: 0, y: 0 });
  const [extrasSize, setExtrasSize] = useState(50);
  const [customExtras, setCustomExtras] = useState([]);

  const [drawTarget, setDrawTarget] = useState(null);

  function moveOffset(setter, dx, dy) {
    const step = 4;
    setter(prev => ({
      x: prev.x + dx * step,
      y: prev.y + dy * step
    }));
  }

  function handleCustomSave(target, part) {
    if (!part || !part.name || !part.dataUrl) return;

    if (target === "ears") {
      setCustomEars(prev =>
        prev.some(e => e.name === part.name) ? prev : [...prev, part]
      );
      setEarType(part.name);
    } else if (target === "pattern") {
      setCustomPatterns(prev =>
        prev.some(e => e.name === part.name) ? prev : [...prev, part]
      );
      setPatternType(part.name);
    } else if (target === "eyes") {
      setCustomEyes(prev =>
        prev.some(e => e.name === part.name) ? prev : [...prev, part]
      );
      setEyeType(part.name);
    } else if (target === "nose") {
      setCustomNoses(prev =>
        prev.some(e => e.name === part.name) ? prev : [...prev, part]
      );
      setNoseType(part.name);
    } else if (target === "mouth") {
      setCustomMouths(prev =>
        prev.some(e => e.name === part.name) ? prev : [...prev, part]
      );
      setMouthType(part.name);
    } else if (target === "legs") {
      setCustomLegs(prev =>
        prev.some(e => e.name === part.name) ? prev : [...prev, part]
      );
      setLegStyle(part.name);
    } else if (target === "body") {
      setCustomBodies(prev =>
        prev.some(e => e.name === part.name) ? prev : [...prev, part]
      );
      setBodyType(part.name);
    } else if (target === "head") {
      setCustomHeads(prev =>
        prev.some(e => e.name === part.name) ? prev : [...prev, part]
      );
      setHeadType(part.name);
    } else if (target === "tail") {
      setCustomTails(prev =>
        prev.some(e => e.name === part.name) ? prev : [...prev, part]
      );
      setTailType(part.name);
    } else if (target === "extras") {
      setCustomExtras(prev =>
        prev.some(e => e.name === part.name) ? prev : [...prev, part]
      );
      setExtraType(part.name);
    }

    setDrawTarget(null);
  }

  const bodyW = 120 + (bodyRoundness / 100) * 70;
  const bodyH = 140 + (bodyRoundness / 100) * 40;

  const headW = 90 + (headSize / 100) * 40;
  const headH = 80 + (headSize / 100) * 30;

  const baseEarH = 80;
  const tailLen = 60;
  const tailW = 40;
  // eye style now 0–10, allow smaller
  const eyeSizePx = 4 + eyeStyle * 2;
  const noseSizePx = 6 + (noseSize / 100) * 18;
  const mouthScale = 0.6 + mouthSize / 100;

  const earScale = 0.6 + earSize / 100;
  const tailScale = 0.6 + tailSize / 100;
  const legScale = 0.6 + legSize / 100;
  const extrasScale = 0.6 + extrasSize / 100;

  const currentCustomEar = customEars.find(e => e.name === earType);
  const currentCustomPattern = customPatterns.find(p => p.name === patternType);
  const currentCustomEyes = customEyes.find(e => e.name === eyeType);
  const currentCustomNose = customNoses.find(n => n.name === noseType);
  const currentCustomMouth = customMouths.find(m => m.name === mouthType);
  const currentCustomLegs = customLegs.find(l => l.name === legStyle);
  const currentCustomBody = customBodies.find(b => b.name === bodyType);
  const currentCustomHead = customHeads.find(h => h.name === headType);
  const currentCustomTail = customTails.find(t => t.name === tailType);
  const currentCustomExtras = customExtras.find(x => x.name === extraType);

  return (
    <div
      style={{
        fontFamily: "'Quicksand', sans-serif",
        background: "linear-gradient(180deg, #fef6f9 0%, #f5faff 100%)",
        minHeight: "100vh",
        padding: "40px",
        color: "#555"
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          color: "#7c6aff",
          textTransform: "lowercase",
          textAlign: "center",
          marginBottom: "10px"
        }}
      >
        build your own animal
      </h1>
      <p
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#777",
          fontSize: "0.95rem"
        }}
      >
        pick pieces or sketch your own ears, tails, face parts, patterns and
        more.
      </p>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px 50px",
          boxShadow: "0 6px 16px rgba(200,200,255,0.3)",
          marginTop: "-10px",
          position: "relative"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            alignItems: "flex-start",
            flexWrap: "wrap"
          }}
        >
          <AnimalPreview
            backgroundMode={backgroundMode}
            backgroundColour={backgroundColour}
            gradientColor1={gradientColor1}
            gradientColor2={gradientColor2}
            extraType={extraType}
            extraColor={extraColor}
            extrasOffset={extrasOffset}
            extrasScale={extrasScale}
            currentCustomExtras={currentCustomExtras}
            currentCustomBody={currentCustomBody}
            bodyW={bodyW}
            bodyH={bodyH}
            bodyColor={bodyColor}
            bodyOffset={bodyOffset}
            patternType={patternType}
            patternDensity={patternDensity}
            patternColor={patternColor}
            currentCustomPattern={currentCustomPattern}
            currentCustomHead={currentCustomHead}
            headType={headType}
            headW={headW}
            headH={headH}
            headColor={headColor}
            headOffset={headOffset}
            currentCustomTail={currentCustomTail}
            tailType={tailType}
            tailW={tailW}
            tailLen={tailLen}
            tailColor={tailColor}
            tailOffset={tailOffset}
            tailScale={tailScale}
            currentCustomEar={currentCustomEar}
            earType={earType}
            earColor={earColor}
            earOffset={earOffset}
            earScale={earScale}
            baseEarH={baseEarH}
            currentCustomEyes={currentCustomEyes}
            eyeType={eyeType}
            eyeSizePx={eyeSizePx}
            eyeColor={eyeColor}
            eyesOffset={eyesOffset}
            currentCustomNose={currentCustomNose}
            noseType={noseType}
            noseSizePx={noseSizePx}
            noseOffset={noseOffset}
            currentCustomMouth={currentCustomMouth}
            mouthType={mouthType}
            mouthScale={mouthScale}
            mouthColor={mouthColor}
            mouthOffset={mouthOffset}
            faceOffset={faceOffset}
            currentCustomLegs={currentCustomLegs}
            legStyle={legStyle}
            legCount={legCount}
            legOffset={legOffset}
            legScale={legScale}
            legColor={legColor}
            legOffsets={legOffsets}
          />

          <div
            style={{
              padding: "24px",
              width: "360px",
              borderRadius: "16px",
              background: "#fffaff",
              border: "2px solid #f0e9ff",
              boxShadow: "0 2px 8px rgba(180,160,255,0.15)",
              maxHeight: "500px",
              overflowY: "auto"
            }}
          >
            <SectionHeader title="background" />
            <Row>
              <label style={labelStyle}>style</label>
              <select
                value={backgroundMode}
                onChange={e => setBackgroundMode(e.target.value)}
                style={selectStyle}
              >
                <option value="gradient">soft gradient</option>
                <option value="colour">solid colour</option>
                <option value="ocean">ocean</option>
                <option value="field">field</option>
                <option value="snow">snow</option>
                <option value="forest">forest</option>
              </select>
            </Row>

            {backgroundMode === "gradient" && (
              <>
                <Row>
                  <label style={labelStyle}>top colour</label>
                  <input
                    type="color"
                    value={gradientColor1}
                    onChange={e => setGradientColor1(e.target.value)}
                    style={colorInputStyle}
                  />
                </Row>
                <Row>
                  <label style={labelStyle}>bottom colour</label>
                  <input
                    type="color"
                    value={gradientColor2}
                    onChange={e => setGradientColor2(e.target.value)}
                    style={colorInputStyle}
                  />
                </Row>
              </>
            )}

            {backgroundMode === "colour" && (
              <Row>
                <label style={labelStyle}>colour</label>
                <input
                  type="color"
                  value={backgroundColour}
                  onChange={e => setBackgroundColour(e.target.value)}
                  style={colorInputStyle}
                />
              </Row>
            )}

            <Divider />

            {/* ears */}
            <SectionHeader
              title="ears"
              onDraw={() => setDrawTarget("ears")}
            />
            <Row>
              <label style={labelStyle}>type</label>
              <select
                value={earType}
                onChange={e => setEarType(e.target.value)}
                style={selectStyle}
              >
                <option value="default">default ears</option>
                <optgroup label="ear stickers">
                  <option value="bunnyears.png">bunny ears (png)</option>
                  <option value="catears.png">cat ears (png)</option>
                  <option value="dogears.png">dog ears (png)</option>
                  <option value="bearears.png">bear ears (png)</option>
                </optgroup>
                {customEars.length > 0 && (
                  <optgroup label="custom ears">
                    {customEars.map((ce, idx) => (
                      <option key={`ce-${idx}`} value={ce.name}>
                        {ce.name}
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
            </Row>
            <SizeAdjuster
              label="resize"
              value={earSize}
              min={0}
              max={100}
              step={10}
              onChange={setEarSize}
            />
            {!currentCustomEar && !earType.endsWith(".png") && (
              <Row>
                <label style={labelStyle}>colour</label>
                <input
                  type="color"
                  value={earColor}
                  onChange={e => setEarColor(e.target.value)}
                  style={colorInputStyle}
                />
              </Row>
            )}
            <PositionAdjuster
              label="position"
              onChange={(dx, dy) => moveOffset(setEarOffset, dx, dy)}
            />

            <Divider />

            <Face
              eyeType={eyeType}
              setEyeType={setEyeType}
              customEyes={customEyes}
              eyeStyle={eyeStyle}
              setEyeStyle={setEyeStyle}
              eyeColor={eyeColor}
              setEyeColor={setEyeColor}
              customNoses={customNoses}
              noseType={noseType}
              setNoseType={setNoseType}
              noseSize={noseSize}
              setNoseSize={setNoseSize}
              customMouths={customMouths}
              mouthType={mouthType}
              setMouthType={setMouthType}
              mouthSize={mouthSize}
              setMouthSize={setMouthSize}
              mouthColor={mouthColor}
              setMouthColor={setMouthColor}
              currentCustomMouth={currentCustomMouth}
              moveFaceOffset={(dx, dy) => moveOffset(setFaceOffset, dx, dy)}
              moveEyesOffset={(dx, dy) => moveOffset(setEyesOffset, dx, dy)}
              moveNoseOffset={(dx, dy) => moveOffset(setNoseOffset, dx, dy)}
              moveMouthOffset={(dx, dy) => moveOffset(setMouthOffset, dx, dy)}
              setDrawTarget={setDrawTarget}
            />

            <Body
              bodyType={bodyType}
              setBodyType={setBodyType}
              customBodies={customBodies}
              bodyRoundness={bodyRoundness}
              setBodyRoundness={setBodyRoundness}
              bodyColor={bodyColor}
              setBodyColor={setBodyColor}
              patternType={patternType}
              setPatternType={setPatternType}
              customPatterns={customPatterns}
              currentCustomPattern={currentCustomPattern}
              patternDensity={patternDensity}
              setPatternDensity={setPatternDensity}
              patternColor={patternColor}
              setPatternColor={setPatternColor}
              setDrawTarget={setDrawTarget}
              moveBodyOffset={(dx, dy) => moveOffset(setBodyOffset, dx, dy)}
            />

            <Legs
              legStyle={legStyle}
              setLegStyle={setLegStyle}
              customLegs={customLegs}
              legCount={legCount}
              setLegCount={setLegCount}
              legSize={legSize}
              setLegSize={setLegSize}
              legColor={legColor}
              setLegColor={setLegColor}
              activeLegIndex={activeLegIndex}
              setActiveLegIndex={setActiveLegIndex}
              moveLegOffset={(dx, dy) => moveOffset(setLegOffset, dx, dy)}
              moveSingleLegOffset={(dx, dy) => {
                const step = 4;
                setLegOffsets(prev =>
                  prev.map((off, idx) =>
                    idx === activeLegIndex
                      ? { x: off.x + dx * step, y: off.y + dy * step }
                      : off
                  )
                );
              }}
              setDrawTarget={setDrawTarget}
            />

            <Head
              headType={headType}
              setHeadType={setHeadType}
              customHeads={customHeads}
              headSize={headSize}
              setHeadSize={setHeadSize}
              headColor={headColor}
              setHeadColor={setHeadColor}
              moveHeadOffset={(dx, dy) => moveOffset(setHeadOffset, dx, dy)}
              setDrawTarget={setDrawTarget}
            />

            <SectionHeader
              title="tail"
              onDraw={() => setDrawTarget("tail")}
            />
            <Row>
              <label style={labelStyle}>type</label>
              <select
                value={tailType}
                onChange={e => setTailType(e.target.value)}
                style={selectStyle}
              >
                {baseTailOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
                <optgroup label="tail stickers">
                  <option value="bunnytail.png">bunny tail (png)</option>
                  <option value="cattail.png">cat tail (png)</option>
                  <option value="dogtail.png">dog tail (png)</option>
                </optgroup>
                {customTails.length > 0 && (
                  <optgroup label="custom tails">
                    {customTails.map((ct, idx) => (
                      <option key={`ct-${idx}`} value={ct.name}>
                        {ct.name}
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
            </Row>
            {tailType !== "no tail" && (
              <>
                <SizeAdjuster
                  label="resize"
                  value={tailSize}
                  min={0}
                  max={100}
                  step={10}
                  onChange={setTailSize}
                />
                {!currentCustomTail && !tailType.endsWith(".png") && (
                  <Row>
                    <label style={labelStyle}>tail colour</label>
                    <input
                      type="color"
                      value={tailColor}
                      onChange={e => setTailColor(e.target.value)}
                      style={colorInputStyle}
                    />
                  </Row>
                )}
                <PositionAdjuster
                  label="position"
                  onChange={(dx, dy) => moveOffset(setTailOffset, dx, dy)}
                />
              </>
            )}

            <Divider />

            <Extras
              extraType={extraType}
              setExtraType={setExtraType}
              customExtras={customExtras}
              extraColor={extraColor}
              setExtraColor={setExtraColor}
              extrasSize={extrasSize}
              setExtrasSize={setExtrasSize}
              currentCustomExtras={currentCustomExtras}
              moveExtrasOffset={(dx, dy) => moveOffset(setExtrasOffset, dx, dy)}
              setDrawTarget={setDrawTarget}
            />

            <Divider />

            <div
              style={{
                marginTop: "8px",
                padding: "12px 14px",
                borderRadius: "12px",
                background: "#f5f0ff",
                fontSize: "0.85rem",
                lineHeight: 1.4
              }}
            >
              <b>current build:</b>
              <br />
              ears: {earType}; pattern: {patternType}; eyes: {eyeType}; nose:{" "}
              {noseType}; mouth: {mouthType}; legs:{" "}
              {legStyle === "default" ? `${legCount} legs` : legStyle}; body:{" "}
              {bodyType}; head: {headType}; tail: {tailType}; extras:{" "}
              {extraType}.
            </div>

            <p
              style={{
                marginTop: "8px",
                fontSize: "0.75rem",
                color: "#999",
                textAlign: "right"
              }}
            >
              backgrounds, ears, tails and extras pngs from huaban.com;
              eye and mouth stickers are my own drawings.
            </p>
          </div>
        </div>

        {drawTarget && (
          <div
            onClick={() => setDrawTarget(null)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3000
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "20px 22px 18px",
                boxShadow: "0 10px 28px rgba(0,0,0,0.25)",
                maxWidth: "680px",
                width: "90vw"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px"
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.95rem",
                    color: "#555",
                    textTransform: "lowercase"
                  }}
                >
                  draw your own{" "}
                  <b>
                    {drawTarget === "ears"
                      ? "ears"
                      : drawTarget === "pattern"
                      ? "pattern"
                      : drawTarget === "eyes"
                      ? "eyes"
                      : drawTarget === "nose"
                      ? "nose"
                      : drawTarget === "mouth"
                      ? "mouth"
                      : drawTarget === "legs"
                      ? "legs"
                      : drawTarget === "body"
                      ? "body"
                      : drawTarget === "head"
                      ? "head"
                      : drawTarget === "tail"
                      ? "tail"
                      : "extra"}
                  </b>
                </p>
                <button
                  type="button"
                  onClick={() => setDrawTarget(null)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    lineHeight: 1,
                    color: "#999"
                  }}
                >
                  ×
                </button>
              </div>
              <DrawingPad
                label={
                  drawTarget === "ears"
                    ? "ears"
                    : drawTarget === "pattern"
                    ? "pattern"
                    : drawTarget === "eyes"
                    ? "eyes"
                    : drawTarget === "nose"
                    ? "nose"
                    : drawTarget === "mouth"
                    ? "mouth"
                    : drawTarget === "legs"
                    ? "legs"
                    : drawTarget === "body"
                    ? "body"
                    : drawTarget === "head"
                    ? "head"
                    : drawTarget === "tail"
                    ? "tail"
                    : "extra"
                }
                onSave={part => handleCustomSave(drawTarget, part)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
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
            width: "26px",
            height: "26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#faf7ff",
            fontSize: "0.9rem",
            cursor: "pointer",
            color: "#7c6aff",
            padding: 0
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
