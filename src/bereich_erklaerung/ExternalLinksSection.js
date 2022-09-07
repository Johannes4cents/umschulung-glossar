import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import LinksHolder from "../bereich_begriffs_liste/nuetzlicheLinks/LinksHolder";

const ExternalLinksSection = ({ selectedTerm, links, terms }) => {
  const [displayedLinks, setDisplayedLinks] = useState([]);

  useEffect(() => {
    setDisplayedLinks(links.filter((l) => l.terms.includes(selectedTerm.id)));
  }, [selectedTerm, links]);
  return (
    <div
      className="divColumn"
      style={{
        width: "100%",
        marginTop: "10px",
        backgroundColor: "#588258",
        borderRadius: "0.5rem/0.5rem",
      }}
    >
      <div className="textBoldWhite">Externe links</div>
      <div
        className="divColumn"
        style={{ maxHeight: "200px", overflow: "auto" }}
      >
        {displayedLinks.map((l) => (
          <LinksHolder key={l.url} link={l} terms={terms} />
        ))}
      </div>
    </div>
  );
};

export default ExternalLinksSection;
