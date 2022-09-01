import React, { useEffect, useState } from "react";
import SimpleTermHolder from "../../bereich_begriffs_liste/SimpleTermHolder";
import { getItemById } from "../../misc/helperFuncs";

const LinksList = ({ openTerm, setOpenTerm, terms }) => {
  const [links, setLinks] = useState([]);

  function deleteLink(link) {
    setOpenTerm({
      ...openTerm,
      linked: openTerm.linked.filter((id) => id != link.id),
    });
  }

  useEffect(() => {
    setLinks(openTerm.linked.map((id) => getItemById(id, terms)));
  }, [openTerm]);
  return (
    <div
      className="divColumn"
      style={{ height: "50%", width: "100%", overflow: "auto" }}
    >
      <div className="textBoldWhite">Links</div>
      <div className="divColumn" style={{ overflow: "auto", width: "100%" }}>
        {links.map((l) => (
          <SimpleTermHolder term={l} key={l.id} deleteTerm={deleteLink} />
        ))}
      </div>
    </div>
  );
};

export default LinksList;
