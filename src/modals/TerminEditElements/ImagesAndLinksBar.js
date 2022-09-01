import React from "react";
import ImagesList from "./ImagesList";
import LinksList from "./LinksList";

const ImagesAndLinksBar = ({ openTerm, setOpenTerm, terms }) => {
  return (
    <div
      className="divColumn"
      style={{
        height: "550px",
        marginLeft: "20px",
        width: "200px",
        backgroundColor: "#4f4f4f",
      }}
    >
      <LinksList openTerm={openTerm} setOpenTerm={setOpenTerm} terms={terms} />
      <ImagesList openTerm={openTerm} setOpenTerm={setOpenTerm} />
    </div>
  );
};

export default ImagesAndLinksBar;
