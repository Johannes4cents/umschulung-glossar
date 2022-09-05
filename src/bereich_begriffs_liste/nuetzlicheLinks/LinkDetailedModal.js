import React from "react";
import HoverImage from "../../components/HoverImage";

const LinkDetailedModal = ({ link }) => {
  function deleteLink() {}

  function editLink() {}
  return (
    <div
      className="divColumn"
      style={{
        width: "300px",
        backgroundColor: "#4f4f4f",
        padding: "5px",
        border: "1px solid white",
        borderRadius: "0.5rem/0.5rem",
      }}
    >
      <div
        className="divRow"
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <div
          className="divRow"
          style={{ flex: 1, justifyContent: "space-around" }}
        >
          <HoverImage
            imgUrl={"/images/icons/icon_trashcan.png"}
            standardGray={true}
            maxHeight={20}
            maxWidth={20}
            description={"Link löschen"}
            onClick={deleteLink}
          />
          <HoverImage
            onClick={editLink}
            imgUrl={"/images/icons/icon_edit.png"}
            standardGray={true}
            maxHeight={20}
            maxWidth={20}
            description={"Link Bearbeiten"}
          />
        </div>
        <div
          className="textBoldWhite"
          onClick={() => {
            console.log("Link - ", link);
          }}
          style={{ marginBottom: "5px", flex: 2, textAlign: "center" }}
        >
          Link Detailiert
        </div>
        <div style={{ flex: 1 }} />
      </div>

      <div className="divColumn" style={{ width: "100%", marginBottom: "5px" }}>
        <div className="textWhiteSmall" style={{ color: "grey" }}>
          Link
        </div>
        <a
          href={link.url}
          target="_blank"
          rel="noreferrer noopener"
          style={{ color: "turquoise" }}
        >
          {link.url}
        </a>
      </div>

      <div className="textWhite" style={{ color: "grey" }}>
        Suchbegriffe
      </div>
      <div
        className="divRow"
        style={{
          width: "100%",
          overflow: "auto",
          justifyContent: "space-around",
        }}
      >
        {link.searchTerms.map((s) => (
          <div
            key={s}
            className="textWhiteSmall"
            style={{
              padding: "2px",
              border: "1px solid green",
              borderRadius: "0.5rem/0.5rem",
            }}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkDetailedModal;
