import React from "react";
import FilesList from "./FilesList";
import ImagesList from "./ImagesList";
import ConnectedTermList from "./ConnectedTermList";
import ExternalLinksList from "./ExternalLinksList";

const ImagesAndLinksBar = ({
  openTerm,
  setOpenTerm,
  terms,
  links,
  setAddedLinks,
  addedLinks,
}) => {
  return (
    <div
      className="divColumn"
      style={{
        height: "600px",
        marginLeft: "20px",
        width: "200px",
        backgroundColor: "#4f4f4f",
      }}
    >
      <FilesList openTerm={openTerm} setOpenTerm={setOpenTerm} />
      <ExternalLinksList
        openTerm={openTerm}
        setAddedLinks={setAddedLinks}
        links={links}
        addedLinks={addedLinks}
        terms={terms}
      />
      <ConnectedTermList
        openTerm={openTerm}
        setOpenTerm={setOpenTerm}
        terms={terms}
      />
      <ImagesList openTerm={openTerm} setOpenTerm={setOpenTerm} />
    </div>
  );
};

export default ImagesAndLinksBar;
