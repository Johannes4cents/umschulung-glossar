import React, { useEffect, useState } from "react";
import TermList from "../bereich_begriffs_liste/TermList";
import { catList } from "../misc/lists";

const PickLinksModal = ({
  terms,
  inclusionList,
  onPickedTermClicked,
  maxHeight = 300,
  headerColor = "white",
}) => {
  const [displayedTerms, setDisplayedTerms] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setDisplayedTerms(terms);
  }, [terms]);

  function onSearch(search) {
    setSearchInput(search);
    if (search.length > 0) {
      let foundTerms = terms.filter(
        (t) =>
          t.name.toLowerCase().startsWith(search.toLowerCase()) ||
          (t.aliases ?? [])
            .map((a) => a.toLowerCase())
            .some((string) => string.startsWith(search.toLowerCase()))
      );
      setDisplayedTerms(foundTerms);
    } else setDisplayedTerms(terms);
  }

  return (
    <div className="divColumn">
      <div className="textBoldWhite" style={{ color: headerColor }}>
        Themenverwandte Begriffe
      </div>
      <div className="divRow">
        <input
          style={{ textAlign: "center", marginTop: "5px" }}
          value={searchInput}
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />
        <img src="/images/drawable/icon_search.png" className="icon25" />
      </div>
      <TermList
        maxHeight={maxHeight}
        selectedCats={catList.map((c) => c.id)}
        displayedTerms={displayedTerms}
        onTermClicked={onPickedTermClicked}
        inclusionList={inclusionList}
      />
    </div>
  );
};

export default PickLinksModal;
