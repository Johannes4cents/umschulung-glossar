import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import {
  addRemoveItem,
  extractCatsFromTerms,
  getItemById,
  newTrim,
} from "../../misc/helperFuncs";
import { makeLink } from "../../misc/makeObjects";
import PickLinksModal from "../../modals/PickLinksModal";
import SearchTermsArea from "./SearchTermsArea";
import { toast } from "react-toastify";
import miscStore from "../../stores/miscStore";
import { setDocInFirestore } from "../../misc/handleFirestore";
import useModal from "../../hooks/useModal";
import AddLinkToTermSection from "./AddLinkToTermSection";

const NewLinkModal = ({
  asModal = true,
  terms,
  oldLink,
  term,
  fromEditTerm = false,
  displayedLinks,
  setDisplayedLinks,
  links,
  onLinkClicked,
}) => {
  const [newLink, setNewLink] = useState(oldLink ?? makeLink());
  const { closeModal } = miscStore();
  const [filled, setFilled] = useState(false);
  const newSearchTermRef = useRef();
  const urlInputRef = useRef();

  useEffect(() => {
    if (term != null) {
      if (!newLink.terms.includes(term.id))
        setNewLink({ ...newLink, terms: [...newLink.terms, term.id] });
    }
  }, [term]);

  useEffect(() => {
    setFilled(newLink.url.length > 5 && newLink.searchTerms.length > 0);
  }, [newLink]);

  function onPickedTermClicked(term) {
    const pickedTerms = [...newLink.terms];

    function onItemAdded(list) {
      const fullTerms = list.map((id) => getItemById(id, terms));
      console.log("fullTerms - ", fullTerms);
      const cats = extractCatsFromTerms(fullTerms);
      setNewLink({ ...newLink, terms: list, cats });
    }
    addRemoveItem(term.id, pickedTerms, (list) => onItemAdded(list));
  }

  useEffect(() => {
    if (urlInputRef.current != null) {
      urlInputRef.current.focus();
    }
  }, [urlInputRef]);

  function onURLchange(url) {
    setNewLink({ ...newLink, url });
  }

  function saveLink() {
    if (filled) {
      if (!newLink.url.startsWith("http"))
        newLink.url = "https://" + newLink.url;

      console.log("newLink - ", newLink);
      setDocInFirestore("links", newTrim(newLink.url), newLink, () => {
        toast("Neuer Link gespeichert");
        if (asModal) closeModal();
      });
    }
  }

  function onUrlEnter(e) {
    if (e.key == "Enter") {
      if (newLink.url.length < 5) {
        toast("url zu kurz");
      } else if (!newLink.url.includes(".")) toast("keine Url");
      else newSearchTermRef.current.focus();
    }
  }

  function onSearchTermAdded(searchTerm) {
    if (newLink.searchTerms.includes(searchTerm.toLowerCase())) {
      toast("Suchbegriff bereits hinzugefügt");
    } else
      setNewLink({
        ...newLink,
        searchTerms: [...newLink.searchTerms, searchTerm.toLowerCase()],
      });
  }

  function onSearchTermClicked(searchTerm) {
    console.log("searchTerm - ", searchTerm, " | newLink - ", newLink);
    setNewLink({
      ...newLink,
      searchTerms: newLink.searchTerms.filter((s) => s != searchTerm),
    });
  }
  return (
    <div
      className="divRow"
      style={{
        backgroundColor: "#4f4f4f",
        padding: "2px",
        border: "1px solid white",
        borderRadius: "0.5rem/0.5rem",
        alignItems: "baseline",
      }}
    >
      {fromEditTerm && (
        <AddLinkToTermSection
          onLinkClicked={onLinkClicked}
          links={links}
          setDisplayedLinks={setDisplayedLinks}
          displayedLinks={displayedLinks}
        />
      )}
      <div
        className="divColumn"
        style={{
          width: "550px",
        }}
      >
        <div className="divRow" style={{ width: "100%" }}>
          <div className="divColumn" style={{ width: "100%" }}>
            <div className="textBoldWhite" style={{ marginBottom: "5px" }}>
              Neuen Link eintragen
            </div>
            <div className="divRow" style={{ marginBottom: "5px" }}>
              <div
                className="textWhite"
                style={{ color: "grey", marginRight: "5px" }}
              >
                URL
              </div>
              <input
                style={{ textAlign: "center" }}
                value={newLink.url}
                onKeyDown={onUrlEnter}
                onChange={(e) => {
                  onURLchange(e.target.value);
                }}
                ref={urlInputRef}
              />
            </div>
          </div>
          <img
            onClick={saveLink}
            className="icon40"
            src="/images/icons/icon_link_new.png"
            style={{
              marginRight: "4px",
              marginTop: "4px",
              filter: filled ? null : "grayscale(100%)",
            }}
          />
        </div>

        <div
          className="divRow"
          style={{
            width: "100%",
            justifyContent: "space-around",
            alignItems: "baseline",
          }}
        >
          <SearchTermsArea
            newSearchTermRef={newSearchTermRef}
            newLink={newLink}
            onSearchTermClicked={onSearchTermClicked}
            onSearchTermAdded={onSearchTermAdded}
          />
          <PickLinksModal
            headerColor="grey"
            terms={terms}
            inclusionList={newLink.terms}
            onPickedTermClicked={onPickedTermClicked}
            maxHeight={100}
          />
        </div>
      </div>
    </div>
  );
};

export default NewLinkModal;
