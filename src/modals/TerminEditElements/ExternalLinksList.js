import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import LinksHolder from "../../bereich_begriffs_liste/nuetzlicheLinks/LinksHolder";
import SearchTermsArea from "../../bereich_begriffs_liste/nuetzlicheLinks/SearchTermsArea";
import { newTrim } from "../../misc/helperFuncs";

const ExternalLinksList = ({
  openTerm,
  setAddedLinks,
  links,
  addedLinks,
  terms,
}) => {
  const [displayedLinks, setDisplayedLinks] = useState([]);

  function removeLink(link) {
    setAddedLinks(
      addedLinks.map((l) => newTrim(l)).filter((l) => l != newTrim(link.url))
    );
  }

  useEffect(() => {
    const trimmedAddedList = addedLinks.map((l) => newTrim(l));
    console.log("trimmedAddedList - ", trimmedAddedList);
    setDisplayedLinks(
      links.filter((link) => trimmedAddedList.includes(newTrim(link.url)))
    );
  }, [addedLinks]);
  return (
    <div className="divColumn" style={{ height: "20%", width: "100%" }}>
      <div className="textBoldWhite">Externe Links</div>
      <div className="divColumn" style={{ height: "100%", overflow: "auto" }}>
        {displayedLinks.map((l) => (
          <LinksHolder link={l} terms={terms} onLinkClicked={removeLink} />
        ))}
      </div>
    </div>
  );
};

export default ExternalLinksList;
