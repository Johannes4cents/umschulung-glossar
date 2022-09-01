import React from "react";
import ImagePreview from "../../components/ImagePreview";
import useModal from "../../hooks/useModal";
import EnlargedImageModal from "../EnlargedImageModal";

const ImagesList = ({ openTerm, setOpenTerm }) => {
  const modal = useModal({
    modalContent: <EnlargedImageModal />,
    password: "biggerImage",
  });

  const deleteImage = (term, imgUrl) => {
    setOpenTerm({
      ...openTerm,
      images: openTerm.images.filter((url) => url != imgUrl),
    });
  };

  return (
    <div className="divColumn" style={{ height: "50%", overflow: "auto" }}>
      <div className="textBoldWhite">Images</div>
      <div className="divColumn" style={{ overflow: "auto" }}>
        {openTerm.images.map((imgUrl) => (
          <ImagePreview
            key={imgUrl}
            size={120}
            image={imgUrl}
            onImageClicked={() => {
              modal.open("biggerImage");
            }}
            deleteImage={deleteImage}
            term={openTerm}
          />
        ))}
      </div>
    </div>
  );
};

export default ImagesList;
