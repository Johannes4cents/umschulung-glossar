import React from "react";
import TermHolderList from "./TermHolderList";

const TermList = ({ displayedTerms, maxHeight = 300, onTermClicked }) => {
  return (
    <div
      className="divColumn"
      style={{ maxHeight: `${maxHeight}px`, overflow: "auto", width: "100%" }}
    >
      {displayedTerms.map((t, index) => (
        <TermHolderList
          term={t}
          key={t.id}
          onTermClicked={onTermClicked}
          index={index}
        />
      ))}
    </div>
  );
};

export default TermList;
