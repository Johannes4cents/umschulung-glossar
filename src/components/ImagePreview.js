import React, { useEffect } from "react";
import miscStore from "../stores/miscStore";

const ImagePreview = ({ image, deleteImage, term, size = 50 }) => {
  const { setClickedImages } = miscStore();
  return (
    <div className="divRow">
      <div className="divRow" style={{ marginRight: "5px" }}>
        {deleteImage && (
          <img
            src="/images/icons/icon_cancel.png"
            className="icon20"
            onClick={() => {
              if (deleteImage) deleteImage(term, image);
            }}
          />
        )}
      </div>
      <img
        style={{
          objectFit: "contain",
          width: `${size}px`,
          height: `${size}px`,
        }}
        src={image}
        onClick={() => {
          setClickedImages(term.images);
        }}
      />
    </div>
  );
};

export default ImagePreview;
