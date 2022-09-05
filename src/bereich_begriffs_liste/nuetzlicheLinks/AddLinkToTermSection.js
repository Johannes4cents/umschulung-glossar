import React from "react";
import { useState } from "react";
import LinkResultBar from "./LinkResultBar";

const AddLinkToTermSection = ({
  links,
  setDisplayedLinks,
  displayedLinks,
  onLinkClicked,
}) => {
  const [search, setSearch] = useState("");
  function onEnter() {}

  function onSearch(searchInput) {
    const foundLinks =
      searchInput.length > 0
        ? links.filter(
            (l) =>
              l.searchTerms.some((string) =>
                string.startsWith(searchInput.toLowerCase())
              ) || l.url.startsWith(searchInput.toLowerCase())
          )
        : links;
    setDisplayedLinks(foundLinks);
    setSearch(searchInput);
  }
  return (
    <div
      className="divColumn"
      style={{ width: "250px", borderRight: "1px solid white", height: "100%" }}
    >
      <div className="textBoldWhite">Mit bestehendem Link verknüpfen</div>
      <div className="divRow">
        <input
          onKeyDown={onEnter}
          autoComplete="off"
          className="textBlackCenter"
          value={search}
          placeholder="search"
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />

        <img src="/images/drawable/icon_search.png" className="icon25" />
      </div>

      <LinkResultBar
        onLinkClicked={onLinkClicked}
        displayedLinks={displayedLinks}
        terms={setDisplayedLinks}
      />
    </div>
  );
};

export default AddLinkToTermSection;
