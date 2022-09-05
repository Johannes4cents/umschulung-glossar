import React, { useEffect, useState } from "react";
import HoverImage from "../../components/HoverImage";
import useModal from "../../hooks/useModal";
import miscStore from "../../stores/miscStore";
import LinkResultBar from "./LinkResultBar";
import NewLinkModal from "./NewLinkModal";
import { toast } from "react-toastify";

const MainNuetzlicheLinks = ({
  displayedLinks,
  setDisplayedLinks,
  links,
  selectedCats,
  terms,
}) => {
  const [search, setSearch] = useState("");
  const { loggedIn } = miscStore();
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

  function openNewLinkModal() {
    if (loggedIn) {
      modal.open("openNewLink");
    } else {
      toast(`Bitte Einloggen um neue Einträge zu erstellen`, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
      });
    }
  }

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
          openNewLinkModal();
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
      <LinkResultBar displayedLinks={displayedLinks} terms={terms} />
      {modal.element}
    </div>
  );
};

export default MainNuetzlicheLinks;
