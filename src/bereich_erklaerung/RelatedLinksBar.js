import React, { useEffect, useState } from "react";
import { getItemById } from "../misc/helperFuncs";
import useOnHover from "../modals/useOnHover";

const RelatedLinksBar = ({ selectedTerm, setSelectedTerm, terms }) => {
  return (
    <div
      className="divColumn"
      style={{
        width: "100%",
        marginTop: "10px",
        borderTop: "1px dotted white",
      }}
    >
      <div className="textBoldWhite">Themenverwandte Begriffe</div>
      <div
        className="divRow"
        style={{ width: "100%", justifyContent: "center" }}
      >
        {selectedTerm.linked.map((l) => (
          <LinkHolder
            link={l}
            key={l}
            setSelectedTerm={setSelectedTerm}
            terms={terms}
          />
        ))}
      </div>
    </div>
  );
};

const LinkHolder = ({ link, setSelectedTerm, terms }) => {
  const hover = useOnHover({ item: link, unselectedTextColor: "lightblue" });
  const [foundTerm, setFoundTerm] = useState(null);
  useEffect(() => {
    setFoundTerm(getItemById(link, terms));
  }, [link, terms]);
  return (
    <div className="divRow" style={{ marginRight: "5px" }} {...hover.divProps}>
      {foundTerm != null && (
        <div className="divRow">
          <div
            onClick={() => {
              setSelectedTerm(foundTerm);
            }}
            className="textWhite"
            style={{ flex: 1, textAlign: "center", color: hover.textColor }}
          >
            {foundTerm.name}
          </div>
          <img
            src="/images/icons/icon_link.png"
            className="icon20"
            onClick={() => {
              setSelectedTerm(foundTerm);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RelatedLinksBar;
