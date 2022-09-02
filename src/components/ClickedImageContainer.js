import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useTransition, animated } from "react-spring";
import miscStore from "../stores/miscStore";
import useWindowSize from "../hooks/useWindowSize";
import HoverArrow from "./HoverArrows";

const ClickedImageContainer = () => {
  const keyRef = useRef();
  const [clickDirection, setClickDirection] = useState(1);
  const windowSize = useWindowSize();
  const { clearClickedImages, clickedImages, changeClickedImageIndex } =
    miscStore();
  const transition = useTransition(clickedImages.index, {
    from: { x: clickDirection == 1 ? 500 : -500, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { opacity: 0, width: 0 },
  });

  function onKey(e) {
    console.log("e.keyCode", e.keyCode);
  }

  function onArrowClicked(upDown) {
    setClickDirection(upDown);
    changeClickedImageIndex(upDown);
  }

  useEffect(() => {
    if (clickedImages.images.length > 0) {
      console.log("focusing");
      keyRef.current.focus();
    }
  }, [clickedImages]);
  return (
    <div>
      {clickedImages.images.length > 0 && (
        <div>
          <div
            onKeyDown={onKey}
            onClick={clearClickedImages}
            style={{
              zIndex: 9999998,
              width: "100vw",
              height: "100vh",
              backgroundColor: "#000000cc",
              position: "fixed",
            }}
          />
          <div
            ref={keyRef}
            onKeyDown={onKey}
            className="divRow"
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "space-between",
              position: "absolute",
            }}
          >
            <HoverArrow upDown={-1} onArrowClicked={onArrowClicked} />
            {transition((style, index) => (
              <animated.div style={{ ...style, zIndex: 9999999 }}>
                <img
                  src={clickedImages.images[index]}
                  style={{
                    objectFit: "contain",
                    maxHeight: windowSize.height,
                    maxWidth: windowSize.width,
                  }}
                />
              </animated.div>
            ))}
            <HoverArrow upDown={1} onArrowClicked={onArrowClicked} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickedImageContainer;
