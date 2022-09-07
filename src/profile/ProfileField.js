import React from "react";
import useOnHover from "../modals/useOnHover";

const ProfileField = ({ description, value, textColor = "white", onClick }) => {
  const hover = useOnHover({
    item: description,
    unselectedTextColor: textColor,
  });
  return (
    <div
      {...hover.divProps}
      onClick={() => {
        if (onClick) onClick();
      }}
      className="divColumn"
      style={{ width: "100%", justifyContent: "center", marginBottom: "2px" }}
    >
      <div className="textWhite" style={{ color: "grey" }}>
        {description}
      </div>
      <div
        className="textBoldWhite"
        style={{ color: onClick ? hover.textColor : textColor }}
      >
        {value}
      </div>
    </div>
  );
};

export default ProfileField;
