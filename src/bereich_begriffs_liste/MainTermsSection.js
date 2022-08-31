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
  setTerms,
  modal,
}) => {
  const onSearch = (search) => {
    setSearchInput(search);
  };
  const { setTermPayload } = miscStore();

  function openTermModal() {
    modal.open("newTerm");
    setTermPayload({
      from: "new",
      openTerm: makeTerm(searchInput, selectedCats),
    });
    setSearchInput("");
  }

  const onSearchEnter = (e) => {
    if (e.key == "Enter") {
      if (displayedTerms.length < 1 && searchInput.length > 1) {
        openTermModal();
      } else setSearchInput("");
    }
  };

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
          onKeyDown={onSearchEnter}
          style={{ textAlign: "center" }}
          value={searchInput}
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />
        <img src="/images/drawable/icon_search.png" className="icon25" />
        {searchInput.length > 1 && displayedTerms.length < 1 && (
          <img
            onClick={openTermModal}
            src="/images/icons/icon_new.png"
            className="icon25"
            style={{ marginLeft: "10px" }}
          />
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
        displayedTerms={displayedTerms}
        onTermClicked={setSelectedTerm}
      />
    </div>
  );
};

export default MainTermsSection;
