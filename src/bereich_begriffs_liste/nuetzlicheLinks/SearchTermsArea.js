import { isFocusable } from "@testing-library/user-event/dist/utils";
import React from "react";
import { useState } from "react";
import { capitalize } from "../../misc/helperFuncs";

const SearchTermsArea = ({
  newSearchTermRef,
  newLink,
  onSearchTermClicked,
  onSearchTermAdded,
}) => {
  const [newString, setNewString] = useState("");

  function onEnter(e) {
    if (e.key == "Enter" && newString.length > 1) {
      onSearchTermAdded(newString);
      setNewString("");
    }
  }
  return (
    <div className="divColumn">
      <div className="textBoldWhite" style={{ color: "grey" }}>
        Suchbegriff Hinzufügen
      </div>
      <div className="divRow">
        <input
          ref={newSearchTermRef}
          onKeyDown={onEnter}
          style={{ textAlign: "center", marginTop: "5px" }}
          value={newString}
          onChange={(e) => {
            setNewString(e.target.value);
          }}
        />
        <img
          src="/images/icons/icon_plus.png"
          style={{
            marginLeft: "5px",
            filter: newString.length > 1 ? null : "grayscale(100%)",
          }}
          className="icon25"
          onClick={() => {
            if (newString.length > 1) {
              onSearchTermAdded(newString);
              setNewString("");
            }
          }}
        />
      </div>
      <div
        className="divColumn"
        style={{ maxHeight: "200px", overflow: "auto" }}
      >
        {newLink.searchTerms.map((s) => (
          <SearchTermHolder
            searchTerm={s}
            onTermClicked={onSearchTermClicked}
            key={s}
          />
        ))}
      </div>
    </div>
  );
};

const SearchTermHolder = ({ searchTerm, onTermClicked }) => {
  return (
    <div
      className="divRow"
      style={{ width: "100%" }}
      onClick={() => {
        onTermClicked(searchTerm);
      }}
    >
      <div className="textWhite" style={{ width: "100%", textAlign: "center" }}>
        {capitalize(searchTerm)}
      </div>
    </div>
  );
};

export default SearchTermsArea;
