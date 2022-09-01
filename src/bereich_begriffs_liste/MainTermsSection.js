import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import useModal from "../hooks/useModal";
import { makeTerm } from "../misc/makeObjects";
import TermEditModal from "../modals/TermEditModal";
import miscStore from "../stores/miscStore";
import CatsListTerms from "./CatsListTerms";
import TermList from "./TermList";

const MainTermsSection = ({
  selectedTerm,
  setSelectedTerm,
  selectedCats,
  setSelectedCats,
  searchInput,
  setSearchInput,
  displayedTerms,
  setDisplayedterms,
  terms,
  modal,
}) => {
  const onSearch = (search) => {
    setSearchInput(search);
    if (search.length > 0) {
      let foundTerms = terms.filter(
        (t) =>
          t.name.toLowerCase().startsWith(search.toLowerCase()) ||
          (t.aliases ?? [])
            .map((a) => a.toLowerCase())
            .some((string) => string.startsWith(search.toLowerCase()))
      );
      setDisplayedterms(foundTerms);
    } else setDisplayedterms(terms);
  };
  const { setTermPayload, loggedIn, info } = miscStore();

  function openTermModal() {
    if (searchInput.length > 2 && displayedTerms.length < 1) {
      modal.open("newTerm");
      setTermPayload({
        from: "new",
        openTerm: makeTerm(searchInput, selectedCats, info.username),
      });
      setSearchInput("");
    }
  }

  const onSearchEnter = (e) => {
    if (e.key == "Enter") {
      if (displayedTerms.length < 1 && searchInput.length > 1) {
        openTermModal();
      } else setSearchInput("");
    }
  };

  function checkmarkTest(term) {
    return term.id == selectedTerm.id;
  }

  function onTermClicked(term) {
    console.log("term clicked - ", term);
    setSelectedTerm(term);
  }

  return (
    <div className="divColumn">
      <div
        className="textBoldWhite"
        style={{ marginBottom: "10px", fontSize: "20px" }}
      >
        Begriffe
      </div>
      <div className="divRow" style={{ width: "100%" }}>
        <input
          placeholder="Begriff Eingeben"
          onKeyDown={onSearchEnter}
          style={{ textAlign: "center" }}
          value={searchInput}
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />
        <img src="/images/drawable/icon_search.png" className="icon25" />
        <img
          onClick={openTermModal}
          src="/images/icons/icon_neuer_eintrag.png"
          className="icon25"
          style={{
            marginLeft: "10px",
            filter:
              searchInput.length > 2 && displayedTerms.length < 1
                ? null
                : "grayscale(100%)",
          }}
        />

        {!loggedIn && searchInput.length > 1 && displayedTerms.length < 1 && (
          <div className="textWhiteSmall">
            LogIn um neue Einträge zu schreiben
          </div>
        )}
      </div>
      <div className="divColumn">
        <div
          className="textWhiteSmall"
          style={{ color: "gray", fontStyle: "italic" }}
        >
          Kategorien
        </div>
        <CatsListTerms
          selectedCats={selectedCats}
          setSelectedCats={setSelectedCats}
        />
      </div>
      <TermList
        selectedTerm={selectedTerm}
        displayedTerms={displayedTerms}
        onTermClicked={onTermClicked}
        selectedFilter={checkmarkTest}
        selectedCats={selectedCats}
      />
    </div>
  );
};

export default MainTermsSection;
