import React from "react";

const ImagePreview = ({
  image,
  onImageClicked,
  deleteImage,
  term,
  size = 50,
}) => {
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
          onImageClicked(term, image);
        }}
      />
    </div>
  );
};

export default ImagePreview;
