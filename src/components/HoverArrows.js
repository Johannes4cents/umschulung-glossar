import { useState } from "react";

const HoverArrow = ({ upDown, onArrowClicked, size = 70, margins = true }) => {
  const [hover, setHover] = useState();
  return (
    <img
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        onArrowClicked(upDown);
      }}
      src={
        hover
          ? "/images/icons/icon_up_down_arrow_selected.png"
          : "/images/icons/icon_up_down_arrow.png"
      }
      style={{
        objectFit: "contain",
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,
        transform: upDown == -1 ? "rotate(-90deg)" : "rotate(90deg)",
        zIndex: 9999999,
        marginLeft: margins ? margins.left : upDown == -1 ? "100px" : "0px",
        marginRight: margins ? margins.right : upDown == 1 ? "100px" : "0px",
      }}
    />
  );
};

export default HoverArrow;
