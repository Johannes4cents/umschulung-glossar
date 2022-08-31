import React from "react";

const ClickedColorImage = ({ imgUrl, size, itemSelected, onClick }) => {
  return (
    <img
      onClick={onClick}
      src={imgUrl}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: "contain",
        filter: itemSelected ? null : "grayscale(100%)",
      }}
    />
  );
};

export default ClickedColorImage;
