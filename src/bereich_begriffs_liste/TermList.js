import React from "react";
import TermHolderList from "./TermHolderList";

const TermList = ({
  displayedTerms,
  maxHeight = 300,
  onTermClicked,
  selectedTerm,
  selectedCats,
  inclusionList,
}) => {
  return (
    <div
      className="divColumn"
      style={{ maxHeight: `${maxHeight}px`, overflow: "auto", width: "100%" }}
    >
      {displayedTerms
        .filter((t) => t.cats.some((c) => selectedCats.includes(c)))
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((t, index) => (
          <TermHolderList
            inclusionList={inclusionList}
            term={t}
            key={t.id}
            onTermClicked={onTermClicked}
            index={index}
            selectedTerm={selectedTerm}
          />
        ))}
    </div>
  );
};

export default TermList;
