export default function AnimalPreview(props) {
  const {
    // background
    backgroundMode,
    backgroundColour,
    gradientColor1,
    gradientColor2,
    // extras
    extraType,
    extraColor,
    extrasOffset,
    extrasScale,
    currentCustomExtras,
    // body
    currentCustomBody,
    bodyW,
    bodyH,
    bodyColor,
    bodyOffset,
    // pattern
    patternType,
    patternDensity,
    patternColor,
    currentCustomPattern,
    // head
    currentCustomHead,
    headType,
    headW,
    headH,
    headColor,
    headOffset,
    // tail
    currentCustomTail,
    tailType,
    tailW,
    tailLen,
    tailColor,
    tailOffset,
    tailScale,
    // ears
    currentCustomEar,
    earType,
    earColor,
    earOffset,
    earScale,
    baseEarH,
    // face
    currentCustomEyes,
    eyeType,
    eyeSizePx,
    eyeColor,
    eyesOffset,
    currentCustomNose,
    noseType,
    noseSizePx,
    noseOffset,
    currentCustomMouth,
    mouthType,
    mouthScale,
    mouthColor,
    mouthOffset,
    faceOffset,
    // legs
    currentCustomLegs,
    legStyle,
    legCount,
    legOffset,
    legScale,
    legColor,
    legOffsets
  } = props;

  const showSvgWings =
    !currentCustomExtras &&
    (extraType === "tiny angel wings" || extraType === "bat wings");

  function renderDefaultLegs(count) {
    const spread = Math.min(count, 6);
    return Array.from({ length: count }, (_, i) => {
      const baseOffset =
        spread <= 1 ? 0 : (i - (spread - 1) / 2) * (28 / spread);
      const extra =
        legOffsets && legOffsets[i] ? legOffsets[i] : { x: 0, y: 0 };
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `calc(50% + ${baseOffset + extra.x}px)`,
            top: `${extra.y}px`,
            width: 8,
            height: 30,
            borderRadius: "999px",
            backgroundColor: legColor || "#444444"
          }}
        />
      );
    });
  }

  let previewBackgroundStyles = {};
  if (backgroundMode === "gradient") {
    previewBackgroundStyles = {
      background: `linear-gradient(180deg, ${gradientColor1}, ${gradientColor2})`
    };
  } else if (backgroundMode === "colour") {
    previewBackgroundStyles = {
      backgroundColor: backgroundColour
    };
  } else if (backgroundMode === "scene1") {
    previewBackgroundStyles = {
      backgroundImage: 'url("/p138/build-bg-1.png")',
      backgroundSize: "cover",
      backgroundPosition: "center"
    };
  } else if (backgroundMode === "scene2") {
    previewBackgroundStyles = {
      backgroundImage: 'url("/p138/build-bg-2.png")',
      backgroundSize: "cover",
      backgroundPosition: "center"
    };
  } else if (backgroundMode === "ocean") {
    previewBackgroundStyles = {
      backgroundImage: 'url("/p138/ocean.png")',
      backgroundSize: "cover",
      backgroundPosition: "center"
    };
  } else if (backgroundMode === "field") {
    previewBackgroundStyles = {
      backgroundImage: 'url("/p138/field.png")',
      backgroundSize: "cover",
      backgroundPosition: "center"
    };
  } else if (backgroundMode === "snow") {
    previewBackgroundStyles = {
      backgroundImage: 'url("/p138/snow.png")',
      backgroundSize: "cover",
      backgroundPosition: "center"
    };
  } else if (backgroundMode === "forest") {
    previewBackgroundStyles = {
      backgroundImage: 'url("/p138/forest.png")',
      backgroundSize: "cover",
      backgroundPosition: "center"
    };
  }

  // helpers for patterns
  function spotsBackground() {
    // bigger, more obvious spots
    const r = 6 + patternDensity / 6;
    const rBig = r + 3;
    return `
      radial-gradient(circle at 18% 25%, ${patternColor} 0, ${patternColor} ${rBig}px, transparent ${rBig + 1}px),
      radial-gradient(circle at 55% 30%, ${patternColor} 0, ${patternColor} ${r}px, transparent ${r + 1}px),
      radial-gradient(circle at 82% 22%, ${patternColor} 0, ${patternColor} ${rBig}px, transparent ${rBig + 1}px),
      radial-gradient(circle at 30% 70%, ${patternColor} 0, ${patternColor} ${r}px, transparent ${r + 1}px),
      radial-gradient(circle at 70% 80%, ${patternColor} 0, ${patternColor} ${rBig}px, transparent ${rBig + 1}px)
    `;
  }

  function merleBackground(area) {
    const size = 18 + patternDensity / 3;

    if (area === "head") {
      // moved DOWN from 42% → 55%
      return `
        radial-gradient(circle at 50% 55%, ${patternColor} 0,
          ${patternColor} ${size}px, transparent ${size + 1}px)
      `;
    }

    // tummy spot (leave as-is unless you want lower)
    return `
      radial-gradient(circle at 50% 72%, ${patternColor} 0,
        ${patternColor} ${size}px, transparent ${size + 1}px)
    `;
  }

  function patternBackgroundForBody() {
    if (patternType === "stripes" || patternType === "different") {
      return `repeating-linear-gradient(
        120deg,
        ${patternColor} 0,
        ${patternColor} ${4 + patternDensity / 8}px,
        transparent ${4 + patternDensity / 8}px,
        transparent ${10 + patternDensity / 6}px
      )`;
    }
    if (patternType === "spots") {
      return spotsBackground();
    }
    if (patternType === "merle") {
      return merleBackground("body");
    }
    return spotsBackground();
  }

  function patternBackgroundForHead() {
    if (patternType === "different") {
      return spotsBackground();
    }
    if (patternType === "spots") {
      return spotsBackground();
    }
    if (patternType === "merle") {
      return merleBackground("head");
    }
    return patternBackgroundForBody();
  }

  // helpers for built-in png eyes / mouths
  function eyePngPath(type) {
    if (!type) return null;
    if (type.endsWith(".png")) return `/p138/${type}`;
    if (type === "eyes1" || type === "eyes2" || type === "eyes3") {
      return `/p138/${type}.png`;
    }
    return null;
  }

  function mouthPngPath(type) {
    if (!type) return null;
    if (type.endsWith(".png")) return `/p138/${type}`;
    if (type === "mouth1" || type === "mouth2" || type === "mouth3") {
      return `/p138/${type}.png`;
    }
    return null;
  }

  // png eyes use same logical size but wider image
  const eyeImgWidth = eyeSizePx * 6;

  return (
    <div
      style={{
        width: "420px",
        height: "500px",
        borderRadius: "16px",
        border: "2px dashed #d3caff",
        position: "relative",
        overflow: "hidden",
        ...previewBackgroundStyles
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            position: "relative",
            width: 280,
            height: 320
          }}
        >
          {/* extras behind body / head */}
          {currentCustomExtras ? (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "46%",
                transform: `translate(calc(-50% + ${extrasOffset.x}px), ${extrasOffset.y}px) scale(${extrasScale})`,
                transformOrigin: "center center"
              }}
            >
              <img
                src={currentCustomExtras.dataUrl}
                alt={currentCustomExtras.name}
                style={{
                  width: 220,
                  height: "auto",
                  pointerEvents: "none"
                }}
              />
            </div>
          ) : extraType && extraType.endsWith(".png") ? (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "46%",
                transform: `translate(calc(-50% + ${extrasOffset.x}px), ${extrasOffset.y}px) scale(${extrasScale})`,
                transformOrigin: "center center"
              }}
            >
              <img
                src={`/p138/${extraType}`}
                alt={extraType}
                style={{
                  width: 220,
                  height: "auto",
                  pointerEvents: "none"
                }}
              />
            </div>
          ) : (
            showSvgWings && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "46%",
                  transform: `translate(calc(-50% + ${extrasOffset.x}px), ${extrasOffset.y}px) scale(${extrasScale})`,
                  transformOrigin: "center center"
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "-60px",
                    width: 80,
                    height: 60,
                    borderRadius: "60% 40% 40% 60%",
                    backgroundColor: extraColor,
                    opacity: 0.7
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: "-60px",
                    width: 80,
                    height: 60,
                    borderRadius: "40% 60% 60% 40%",
                    backgroundColor: extraColor,
                    opacity: 0.7
                  }}
                />
              </div>
            )
          )}

          {/* tail – BEFORE body so it sits behind */}
          {currentCustomTail ? (
            <div
              style={{
                position: "absolute",
                right: "3%",
                top: "62%",
                transform: `translate(${tailOffset.x}px, ${tailOffset.y}px) scale(${tailScale})`,
                transformOrigin: "center center"
              }}
            >
              <img
                src={currentCustomTail.dataUrl}
                alt={currentCustomTail.name}
                style={{
                  width: 120,
                  height: "auto",
                  pointerEvents: "none"
                }}
              />
            </div>
          ) : tailType && tailType.endsWith(".png") ? (
            <div
              style={{
                position: "absolute",
                right: "3%",
                top: "62%",
                transform: `translate(${tailOffset.x}px, ${tailOffset.y}px) scale(${tailScale})`,
                transformOrigin: "center center"
              }}
            >
              <img
                src={`/p138/${tailType}`}
                alt={tailType}
                style={{
                  width: 120,
                  height: "auto",
                  pointerEvents: "none"
                }}
              />
            </div>
          ) : (
            tailType !== "no tail" && (
              <div
                style={{
                  position: "absolute",
                  right: "3%",
                  top: "62%",
                  width: tailW,
                  height: tailW,
                  borderRadius: "50%",
                  backgroundColor: tailColor,
                  boxShadow: "0 0 8px rgba(0,0,0,0.1)",
                  transform: `translate(${tailOffset.x}px, ${tailOffset.y}px) scale(${tailScale})`,
                  transformOrigin: "center center"
                }}
              />
            )
          )}

          {/* body / custom body */}
          {currentCustomBody ? (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "60%",
                transform: `translate(calc(-50% + ${bodyOffset.x}px), calc(-50% + ${bodyOffset.y}px))`
              }}
            >
              <img
                src={currentCustomBody.dataUrl}
                alt={currentCustomBody.name}
                style={{
                  width: 240,
                  height: "auto",
                  pointerEvents: "none"
                }}
              />
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "60%",
                transform: `translate(calc(-50% + ${bodyOffset.x}px), calc(-50% + ${bodyOffset.y}px))`,
                width: bodyW,
                height: bodyH,
                borderRadius: "50%",
                backgroundColor: bodyColor,
                boxShadow: "0 8px 16px rgba(0,0,0,0.12)"
              }}
            />
          )}

          {/* head */}
          {currentCustomHead ? (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "42%",
                transform: `translate(calc(-50% + ${headOffset.x}px), calc(-50% + ${headOffset.y}px))`
              }}
            >
              <img
                src={currentCustomHead.dataUrl}
                alt={currentCustomHead.name}
                style={{
                  width: headW,
                  height: "auto",
                  pointerEvents: "none"
                }}
              />
            </div>
          ) : (
            headType === "default" && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "42%",
                  transform: `translate(calc(-50% + ${headOffset.x}px), calc(-50% + ${headOffset.y}px))`,
                  width: headW,
                  height: headH,
                  borderRadius: "50%",
                  backgroundColor: headColor,
                  boxShadow: "0 6px 12px rgba(0,0,0,0.12)"
                }}
              />
            )
          )}

          {/* pattern overlay – body + head */}
          {currentCustomPattern ? (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "60%",
                transform: `translate(calc(-50% + ${bodyOffset.x}px), calc(-50% + ${bodyOffset.y}px))`
              }}
            >
              <img
                src={currentCustomPattern.dataUrl}
                alt={currentCustomPattern.name}
                style={{
                  width: 240,
                  height: "auto",
                  pointerEvents: "none"
                }}
              />
            </div>
          ) : (
            patternType !== "solid" &&
            patternDensity > 5 && (
              <>
                {/* body pattern – full coverage */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "60%",
                    transform: `translate(calc(-50% + ${bodyOffset.x}px), calc(-50% + ${bodyOffset.y}px))`,
                    width: bodyW,
                    height: bodyH,
                    borderRadius: "50%",
                    backgroundImage: patternBackgroundForBody(),
                    opacity: 0.5,
                    mixBlendMode: "multiply"
                  }}
                />
                {/* head pattern – full head */}
                {headType === "default" && (
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "42%",
                      transform: `translate(calc(-50% + ${headOffset.x}px), calc(-50% + ${headOffset.y}px))`,
                      width: headW,
                      height: headH,
                      borderRadius: "50%",
                      backgroundImage: patternBackgroundForHead(),
                      opacity: 0.5,
                      mixBlendMode: "multiply"
                    }}
                  />
                )}
              </>
            )
          )}

          {/* ears */}
          {currentCustomEar ? (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "26%",
                transform: `translate(calc(-50% + ${earOffset.x}px), ${earOffset.y}px) scale(${earScale})`,
                transformOrigin: "center bottom"
              }}
            >
              <img
                src={currentCustomEar.dataUrl}
                alt={currentCustomEar.name}
                style={{
                  width: 180,
                  height: "auto",
                  pointerEvents: "none"
                }}
              />
            </div>
          ) : earType && earType.endsWith(".png") ? (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "26%",
                transform: `translate(calc(-50% + ${earOffset.x}px), ${earOffset.y}px) scale(${earScale})`,
                transformOrigin: "center bottom"
              }}
            >
              <img
                src={`/p138/${earType}`}
                alt={earType}
                style={{
                  width: 180,
                  height: "auto",
                  pointerEvents: "none"
                }}
              />
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "26%",
                transform: `translate(calc(-50% + ${earOffset.x}px), ${earOffset.y}px) scale(${earScale})`,
                transformOrigin: "center bottom"
              }}
            >
              {/* default = two little balls */}
              <div
                style={{
                  position: "absolute",
                  left: "-30px",
                  bottom: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: earColor,
                  boxShadow: "0 0 4px rgba(0,0,0,0.15)"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: "-30px",
                  bottom: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: earColor,
                  boxShadow: "0 0 4px rgba(0,0,0,0.15)"
                }}
              />
            </div>
          )}

          {/* eyes + nose + mouth (on head) */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "44%",
              transform: `translate(calc(-50% + ${faceOffset.x}px), calc(-50% + ${faceOffset.y}px))`
            }}
          >
            {/* eyes */}
            {currentCustomEyes ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  transform: `translate(${eyesOffset.x}px, ${eyesOffset.y}px)`
                }}
              >
                <img
                  src={currentCustomEyes.dataUrl}
                  alt={currentCustomEyes.name}
                  style={{
                    width: eyeImgWidth,
                    height: "auto",
                    pointerEvents: "none"
                  }}
                />
              </div>
            ) : eyePngPath(eyeType) ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  transform: `translate(${eyesOffset.x}px, ${eyesOffset.y}px)`
                }}
              >
                <img
                  src={eyePngPath(eyeType)}
                  alt={eyeType}
                  style={{
                    width: eyeImgWidth,
                    height: "auto",
                    pointerEvents: "none"
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `translate(${eyesOffset.x}px, ${eyesOffset.y}px)`
                }}
              >
                <Eye eyeSizePx={eyeSizePx} eyeColor={eyeColor} />
                <Eye eyeSizePx={eyeSizePx} eyeColor={eyeColor} />
              </div>
            )}

            {/* nose */}
            <div
              style={{
                marginTop: 8,
                display: "flex",
                justifyContent: "center",
                transform: `translate(${noseOffset.x}px, ${noseOffset.y}px)`
              }}
            >
              {currentCustomNose ? (
                <div
                  style={{
                    transform: "scale(1)",
                    transformOrigin: "center center"
                  }}
                >
                  <img
                    src={currentCustomNose.dataUrl}
                    alt={currentCustomNose.name}
                    style={{
                      width: 60,
                      height: "auto",
                      pointerEvents: "none"
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width:
                      noseType === "heart nose"
                        ? noseSizePx * 1.2
                        : noseSizePx,
                    height: noseSizePx,
                    borderRadius:
                      noseType === "heart nose"
                        ? "40% 40% 60% 60%"
                        : "999px",
                    backgroundColor: "#333",
                    clipPath:
                      noseType === "tiny triangle"
                        ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                        : "none"
                  }}
                />
              )}
            </div>

            {/* mouth */}
            <div
              style={{
                marginTop: 6,
                display: "flex",
                justifyContent: "center",
                transform: `translate(${mouthOffset.x}px, ${mouthOffset.y}px)`
              }}
            >
              {mouthType === "none" && !currentCustomMouth ? null : currentCustomMouth ? (
                <div
                  style={{
                    transform: `scale(${mouthScale})`,
                    transformOrigin: "center center"
                  }}
                >
                  <img
                    src={currentCustomMouth.dataUrl}
                    alt={currentCustomMouth.name}
                    style={{
                      width: 70,
                      height: "auto",
                      pointerEvents: "none"
                    }}
                  />
                </div>
              ) : mouthPngPath(mouthType) ? (
                <div
                  style={{
                    transform: `scale(${mouthScale})`,
                    transformOrigin: "center center"
                  }}
                >
                  <img
                    src={mouthPngPath(mouthType)}
                    alt={mouthType}
                    style={{
                      width: 70,
                      height: "auto",
                      pointerEvents: "none"
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: 40 + (mouthScale - 0.6) * 40,
                    height: 16,
                    borderRadius: "999px",
                    borderBottom: `3px solid ${mouthColor}`,
                    borderTop: "transparent",
                    borderLeft: "transparent",
                    borderRight: "transparent"
                  }}
                />
              )}
            </div>
          </div>

          {/* legs */}
          {currentCustomLegs ? (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "80%",
                transform: `translate(calc(-50% + ${legOffset.x}px), calc(-50% + ${legOffset.y}px)) scale(${legScale})`,
                transformOrigin: "center top"
              }}
            >
              <img
                src={currentCustomLegs.dataUrl}
                alt={currentCustomLegs.name}
                style={{
                  width: 200,
                  height: "auto",
                  pointerEvents: "none"
                }}
              />
            </div>
          ) : (
            legStyle === "default" && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "80%",
                  width: 200,
                  height: 40,
                  transform: `translate(calc(-50% + ${legOffset.x}px), calc(-50% + ${legOffset.y}px)) scale(${legScale})`,
                  transformOrigin: "center top"
                }}
              >
                {renderDefaultLegs(legCount)}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function Eye({ eyeSizePx, eyeColor }) {
  return (
    <div
      style={{
        width: eyeSizePx,
        height: eyeSizePx,
        borderRadius: "50%",
        backgroundColor: eyeColor,
        boxShadow: "0 0 3px rgba(0,0,0,0.3)"
      }}
    />
  );
}
