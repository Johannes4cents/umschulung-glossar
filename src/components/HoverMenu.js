import React, { useEffect } from "react";
import { useState } from "react";
import useMousePosition from "../hooks/useMousePosition";

const HoverMenu = ({
  options,
  direction,
  size = "icon20",
  setShowHoverMenu,
  inside = false,
}) => {
  const sizeObj = {
    icon15: 15,
    icon20: 20,
    icon30: 30,
    icon40: 40,
  };

  return (
    <div
      className={direction == "horizontal" ? "divRow" : "divColumn"}
      style={{
        position: "absolute",
        left: -options.length * sizeObj[size],
        top: inside ? 0 : `${-sizeObj[size]}px`,
        padding: "5px",
        backgroundColor: "#4f4f4f",
        borderRadius: "1rem/1rem",
        border: "2px solid white",
        zindex: 9999999,
      }}
      onMouseEnter={() => setShowHoverMenu(true)}
    >
      {options
        .filter((o) => o != null)
        .map((o) => {
          return (
            <HoverOptionHolder option={o} size={size} key={o.description} />
          );
        })}
    </div>
  );
};

const HoverOptionHolder = ({ option, size = "icon20" }) => {
  const mousePosition = useMousePosition();
  const [entered, setEntered] = useState(false);
  return (
    <div
      onMouseEnter={() => setEntered(true)}
      onMouseLeave={() => setEntered(false)}
      className="divRow"
      style={{
        position: "relative",
        marginRight: "3px",
        marginLeft: "3px",
        zindex: 9999998,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
        option.click(option.payload);
        setEntered(false);
      }}
    >
      <img
        src={option.imgUrl}
        className={size}
        style={{
          filter: entered ? null : option.greyHover ? "grayscale(100%)" : null,
        }}
      />
      {entered && (
        <div
          style={{
            top: `${mousePosition.y}px`,
            left: `${mousePosition.x + 20}px`,
            zindex: 9999999,
            position: "fixed",
            backgroundColor: "#4f4f4f",
          }}
        >
          <div className="textWhite">{option.description}</div>
        </div>
      )}
    </div>
  );
};

export default HoverMenu;
