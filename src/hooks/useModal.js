import React, { useEffect, useRef, useState } from "react";
import { clamp } from "../misc/helperFuncs";
import miscStore from "../stores/miscStore";
import useMousePosition from "./useMousePosition";
import useWindowSize from "./useWindowSize";

const useModal = ({
  password = null,
  modalContent,
  offsetX = 0,
  offsetY = 0,
  extraOpen = true,
  position = "topLeft",
  center = false,
  darkOverlay = false,
  translate = { x: 50, y: 50 },
}) => {
  const contentDiv = useRef(null);
  const mousePosition = useMousePosition();
  const [contentDimensions, setContentDimensions] = useState({
    width: null,
    height: null,
  });
  const [openPos, setOpenPos] = useState({ x: 0, y: 0 });
  const { closeModal, openModal, modalOpen } = miscStore();
  const [offsetPos, setOffsetPos] = useState({ width: 0, height: 0 });
  const [modalPw, setModalPw] = useState(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (contentDiv.current) {
      let dimensions = {
        width: contentDiv.current.offsetWidth,
        height: contentDiv.current.offsetHeight,
      };

      setContentDimensions(dimensions);
    }
  }, [contentDiv, modalOpen]);

  useEffect(() => {
    if (!modalOpen) {
      setModalPw(null);
    }
  }, [modalOpen]);

  const open = (modalPassword) => {
    setModalPw(modalPassword);
    setOpenPos({ x: mousePosition.x, y: mousePosition.y });
    openModal(true);
  };

  useEffect(() => {
    getOffset();
  }, [contentDimensions, position]);

  function getOffset() {
    switch (position) {
      case "topLeft":
        setOffsetPos({ width: 0, height: -contentDimensions.height });
        break;
      case "topRight":
        setOffsetPos({
          width: contentDimensions.width,
          height: contentDimensions.height,
        });
        break;
      case "bottomLeft":
        setOffsetPos({ width: 0, height: 0 });
        break;
      case "bottomRight":
        setOffsetPos({ width: contentDimensions.width, height: 0 });
        break;
      case "middle":
        setOffsetPos({
          width: contentDimensions.width / 2,
          height: contentDimensions.height / 2,
        });
        break;
    }
  }

  return {
    open,
    element: (
      <div>
        {modalOpen && modalPw == password && (
          <div>
            <div
              className={darkOverlay ? "overlay" : "overlayClear"}
              onClick={() => closeModal()}
            />
            <div
              ref={contentDiv}
              className="modalContent"
              style={{
                transform: `translate(-${translate.x}%, -${translate.y}%)`,
                left: center
                  ? "50%"
                  : `${clamp(
                      openPos.x + offsetPos.width + offsetX,
                      0,
                      windowSize.width
                    )}px`,
                top: center
                  ? "40%"
                  : `${clamp(
                      openPos.y + offsetPos.height + offsetY,
                      0,
                      windowSize.height
                    )}px`,
                zIndex: 1,
                backgroundColor: "#00000000",
              }}
            >
              {extraOpen && modalPw == password && modalContent}
            </div>
          </div>
        )}
      </div>
    ),
  };
};

export default useModal;
