import React, { useEffect, useState } from "react";
import TermList from "../bereich_begriffs_liste/TermList";
import { catList } from "../misc/lists";

const PickLinksModal = ({ terms, openTerm, setOpenTerm }) => {
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

  function onTermClicked(term) {
    console.log(
      "clickedTerm  - ",
      term,
      " |openTerm.linked - ",
      openTerm.linked,
      " |openTerm.linked.includes(term.id) - ",
      openTerm.linked.includes(term.id)
    );
    if (openTerm.linked.includes(term.id)) {
      console.log("id is included");
      setOpenTerm({
        ...openTerm,
        linked: openTerm.linked.filter((id) => id != term.id),
      });
    } else setOpenTerm({ ...openTerm, linked: [...openTerm.linked, term.id] });
  }

  return (
    <div className="divColumn">
      <div className="textBoldWhite">Themenverwandte Begriffe</div>
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
        selectedCats={catList.map((c) => c.id)}
        displayedTerms={displayedTerms}
        onTermClicked={onTermClicked}
        inclusionList={openTerm.linked}
      />
    </div>
  );
};

export default PickLinksModal;
