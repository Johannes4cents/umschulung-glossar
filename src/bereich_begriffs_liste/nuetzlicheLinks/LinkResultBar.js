import React from "react";
import LinksHolder from "./LinksHolder";

const LinkResultBar = ({ displayedLinks, terms, onLinkClicked }) => {
  return (
    <div
      className="divColumn"
      style={{ width: "100%", maxHeight: "300px", overflow: "auto" }}
    >
      {displayedLinks.map((l) => (
        <LinksHolder
          key={l.url}
          link={l}
          terms={terms}
          onLinkClicked={onLinkClicked}
        />
      ))}
    </div>
  );
};

export default LinkResultBar;
