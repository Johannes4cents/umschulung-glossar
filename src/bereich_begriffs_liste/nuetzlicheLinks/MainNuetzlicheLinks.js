import React, { useEffect, useState } from "react";
import HoverImage from "../../components/HoverImage";
import SearchBar from "../../components/SearchBar";
import useModal from "../../hooks/useModal";
import LinksHolder from "./LinksHolder";
import NewLinkModal from "./NewLinkModal";

const MainNuetzlicheLinks = ({
  displayedLinks,
  setDisplayedLinks,
  links,
  selectedCats,
  terms,
}) => {
  const [search, setSearch] = useState("");
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
    setDisplayedLinks(
      foundLinks.filter((l) => l.cats.some((t) => selectedCats.includes(t)))
    );
    setSearch(searchInput);
  }
  function onEnter() {}

  useEffect(() => {
    const foundLinks =
      search.length > 0
        ? links.filter(
            (l) =>
              l.searchTerms.some((string) =>
                string.startsWith(search.toLowerCase())
              ) || l.url.startsWith(search.toLowerCase())
          )
        : links;
    setDisplayedLinks(
      foundLinks.filter((l) => l.cats.some((t) => selectedCats.includes(t)))
    );
  }, [selectedCats]);

  const modal = useModal({
    position: "topRight",
    translate: { x: 100, y: 100 },
    password: "openNewLink",
    modalContent: <NewLinkModal terms={terms} />,
  });
  return (
    <div className="divColumn" style={{ marginTop: "15px" }}>
      <div className="textBoldWhite">Nützliche Links</div>
      <HoverImage
        onClick={() => {
          modal.open("openNewLink");
        }}
        imgUrl={"images/icons/icon_link_new.png"}
        standardGray={true}
        description={"Neuen Link hinzufügen"}
      />
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
      <div
        className="divColumn"
        style={{ width: "100%", maxHeight: "300px", overflow: "auto" }}
      >
        {displayedLinks.map((l) => (
          <LinksHolder key={l.url} link={l} />
        ))}
      </div>
      {modal.element}
    </div>
  );
};

export default MainNuetzlicheLinks;
