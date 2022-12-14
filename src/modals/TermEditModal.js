import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import CatsListTerms from "../bereich_begriffs_liste/CatsListTerms";
import DragDropDiv from "../components/DragDropDiv";
import LoadingSpinner from "../components/LoadingSpinner";
import { storage } from "../firebase/fireInit";
import {
  setDocInFirestore,
  uploadImageToStorage,
} from "../misc/handleFirestore";
import {
  addRemoveItem,
  checkIfListsTheSame,
  forArrayLength,
  getItemById,
  newTrim,
} from "../misc/helperFuncs";
import { makeTerm } from "../misc/makeObjects";
import miscStore from "../stores/miscStore";
import PickLinksModal from "./PickLinksModal";
import ImagesAndLinksBar from "./TerminEditElements/ImagesAndLinksBar";
import PropFieldDiv from "./TerminEditElements/PropFieldDiv";
import TermEditBottomBar from "./TerminEditElements/TermEditBottomBar";

import DraftEditor from "./TerminEditElements/DraftEditor";
import { EditorState, convertFromRaw } from "draft-js";
import NewLinkModal from "../bereich_begriffs_liste/nuetzlicheLinks/NewLinkModal";

const TermEditModal = ({
  setSelectedTerm,
  terms,
  links,
  setDisplayedLinks,
  displayedLinks,
}) => {
  const [openTerm, setOpenTerm] = useState(makeTerm());
  const [oldTerm, setOldterm] = useState(null);
  const [newAlias, setNewAlias] = useState("");
  const [addedLinks, setAddedLinks] = useState([]);
  const [removedLinks, setRemovedLinks] = useState([]);
  const refNameInput = useRef(null);
  const refEditor = useRef(null);
  const refFileInput = useRef(null);
  const refAliaseInput = useRef(null);
  const [from, setFrom] = useState("new");
  const { termPayload, closeModal, dragCursor, info, setInfo } = miscStore();
  const [loadingImage, setLoadingImage] = useState(false);
  const [pickLinksOpen, setPickLinksOpen] = useState(false);
  const [addExternalLinks, setAddExternalLinks] = useState(false);

  const [editorState, setEditorState] = useState(() =>
    openTerm.rawContentState != null
      ? EditorState.createWithContent(convertFromRaw(openTerm.rawContentState))
      : EditorState.createEmpty()
  );

  function setOldLinks(term) {
    let linkUrls = links
      .filter((l) => l.terms.includes(term.id))
      .map((l) => newTrim(l.url));
    setAddedLinks(linkUrls);
  }

  useEffect(() => {
    if (termPayload != null) {
      if (termPayload.from == "edit") {
        setOldLinks(termPayload.openTerm);
        setOldterm({
          term: { ...termPayload.openTerm },
          author: termPayload.openTerm.author ?? "unknown",
        });
      }
      setOpenTerm(termPayload.openTerm);
      setFrom(termPayload.from);
    }
  }, [termPayload]);

  useEffect(() => {
    if (refNameInput.current != null && termPayload != null) {
      refNameInput.current.focus();
    }
  }, [termPayload, refNameInput]);

  function addRemoveCats(cats) {
    setOpenTerm({ ...openTerm, cats: cats });
  }

  function onDescriptionChange(text) {
    setOpenTerm({ ...openTerm, definition: text });
  }

  function updateLinksBeforeSave() {
    forArrayLength(links, (link) => {
      const newLink = { ...link };
      let trimmedNames = addedLinks.map((l) => newTrim(l));
      if (trimmedNames.includes(newTrim(newLink.url))) {
        if (!newLink.terms.includes(openTerm.id))
          newLink.terms = [...newLink.terms, openTerm.id];
      } else newLink.terms = newLink.terms.filter((id) => id != openTerm.id);
      if (!checkIfListsTheSame(newLink.terms, link.terms))
        setDocInFirestore("links", newTrim(link.url), newLink);
    });
  }

  function saveTerm() {
    updateLinksBeforeSave();
    function closeAfterSave() {
      if (oldTerm == null) {
        setInfo({
          ...info,
          createdEntries: [...info.createdEntries, openTerm.id],
        });
      }
      closeModal();
    }
    var newTerm = { ...openTerm };
    if (oldTerm != null) {
      newTerm.editHistory = [...(newTerm.editHistory ?? []), oldTerm];
      newTerm.lastEditor = info.username;
      newTerm.author = newTerm.author ?? "unknown";
    }
    setDocInFirestore("terms", newTerm.id, newTerm, closeAfterSave);
    setSelectedTerm(openTerm);
  }

  function onSaveButtonClicked() {
    if (
      openTerm.name.length > 1 &&
      openTerm.cats.length > 0 &&
      openTerm.content.length > 2
    ) {
      saveTerm();
    }
  }

  function onInputEnter(e) {
    if (e.key == "Enter") {
      refAliaseInput.current.focus();
    }
  }

  function onImageUploaded(url) {
    setOpenTerm((state) => {
      return { ...state, images: [...state.images, url] };
    });
    setLoadingImage(false);
  }

  function onNewAlias() {
    if (newAlias.length > 1) {
      let allNames = [];
      forArrayLength(terms, (term) => {
        allNames.push(term.name.toLowerCase());
        forArrayLength(term.aliases ?? [], (alias) =>
          allNames.push(alias.toLowerCase())
        );
      });
      if (!allNames.includes(newAlias)) {
        setOpenTerm({
          ...openTerm,
          aliases: [...openTerm.aliases, newAlias],
        });
        setNewAlias("");
        refAliaseInput.current.focus();
      }
    }
  }

  function addImageToTerm(file) {
    setLoadingImage(true);
    uploadImageToStorage("termImages", file, (path) => {
      getDownloadURL(ref(storage, path)).then((url) => {
        console.log("url - ", url);
        onImageUploaded(url);
      });
    });
  }

  const onImageFileChange = (e) => {
    let file = e.target.files[0];
    addImageToTerm(file);
  };

  function deleteAlias(a) {
    setOpenTerm({
      ...openTerm,
      aliases: openTerm.aliases.filter((string) => string != a),
    });
  }

  function onAliasEnter(e) {
    if (e.key == "Enter") {
      setEditorState(EditorState.moveFocusToEnd(editorState));
    }
  }

  const valueElements = {
    uploadImageBtn: (
      <div>
        {!loadingImage && (
          <div
            className="divColumn"
            style={{ position: "relative" }}
            onClick={() => {
              refFileInput.current.click();
            }}
          >
            <img src={"/images/icons/icon_image.png"} className="icon25" />
            <input
              onChange={onImageFileChange}
              type={"file"}
              ref={refFileInput}
              style={{ display: "none" }}
              accept="image/*"
            />
            <div className="textWhiteSmall">Click or drag/drop</div>
          </div>
        )}
        {loadingImage && <LoadingSpinner />}
      </div>
    ),
    linkToOtherTerms: (
      <div
        className="divColumn"
        style={{ position: "relative" }}
        onClick={() => {
          setAddExternalLinks(false);
          setPickLinksOpen(!pickLinksOpen);
        }}
      >
        <img src={"/images/icons/icon_link.png"} className="icon25" />
        <div className="textWhiteSmall">Begriffe verlinken</div>
      </div>
    ),

    beschreibung: (
      <DraftEditor
        openTerm={openTerm}
        setOpenTerm={setOpenTerm}
        refEditor={refEditor}
        editorState={editorState}
        setEditorState={setEditorState}
      />
    ),

    aliases: (
      <div className="divColumn">
        <div className="divRow">
          <input
            ref={refAliaseInput}
            onKeyDown={onAliasEnter}
            value={newAlias}
            onChange={(e) => {
              setNewAlias(e.target.value);
            }}
            style={{ textAlign: "center" }}
          />
          {newAlias.length > 1 && (
            <img
              style={{ marginLeft: "5px" }}
              onClick={onNewAlias}
              className="icon20"
              src="/images/icons/icon_plus.png"
            />
          )}
        </div>
        <div
          className="divRow"
          style={{
            marginTop: "3px",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          {(openTerm.aliases ?? []).map((a) => (
            <div
              style={{ border: "1px solid white" }}
              key={a}
              onClick={() => {
                deleteAlias(a);
              }}
              className="textWhiteSmall"
            >
              {a}
            </div>
          ))}
        </div>
      </div>
    ),
    cats: (
      <CatsListTerms
        selectedCats={openTerm.cats}
        setSelectedCats={addRemoveCats}
      />
    ),
    nameInput: (
      <input
        style={{ textAlign: "center" }}
        onKeyDown={(e) => {
          onInputEnter(e, refNameInput);
        }}
        value={openTerm.name}
        ref={refNameInput}
        onChange={(e) => {
          setOpenTerm({ ...openTerm, name: e.target.value });
        }}
      />
    ),
  };

  function onLinkClicked(link) {
    console.log("link - ", link);
    function afterAddRemove(list) {
      console.log("list - ", list);
      setAddedLinks(list);
    }
    addRemoveItem(newTrim(link.url), addedLinks, afterAddRemove);
  }

  function handleDrop(files) {
    const imageEndings = ["png", "jpg", "jpeg"];
    const imageFiles = [];
    forArrayLength(files, (file) => {
      if (imageEndings.some((ending) => file.name.endsWith(ending))) {
        imageFiles.push(file);
      }
    });

    if (imageFiles.length > 0)
      forArrayLength(imageFiles, (file) => {
        addImageToTerm(file);
      });
  }

  function onPickedTermClicked(term) {
    if (openTerm.linked.includes(term.id)) {
      setOpenTerm({
        ...openTerm,
        linked: openTerm.linked.filter((id) => id != term.id),
      });
    } else setOpenTerm({ ...openTerm, linked: [...openTerm.linked, term.id] });
  }

  return (
    <DragDropDiv
      handleDrop={handleDrop}
      dragCursor={dragCursor}
      className="divColumn"
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "end",
        alignItems: "end",
        width: "100%",
      }}
    >
      <div className="divRow" style={{ height: "100%", alignItems: "end" }}>
        {pickLinksOpen && !addExternalLinks && (
          <PickLinksModal
            onPickedTermClicked={onPickedTermClicked}
            terms={terms}
            inclusionList={openTerm.linked}
          />
        )}
        {addExternalLinks && !pickLinksOpen && (
          <NewLinkModal
            asModal={false}
            term={openTerm}
            terms={terms}
            fromEditTerm={true}
            displayedLinks={displayedLinks}
            setDisplayedLinks={setDisplayedLinks}
            links={links}
            onLinkClicked={onLinkClicked}
          />
        )}
        <div
          className="divColumn"
          style={{
            width: "500px",
            backgroundColor: "#5f5f5f",
            padding: "10px",
            border: "1px solid lightgray",
            borderRadius: "1rem/1rem",
          }}
        >
          <div
            className="textBoldWhite"
            onClick={() => {
              console.log("openTerm - ", openTerm);
            }}
            style={{
              fontSize: "20px",

              marginBottom: "10px",
            }}
          >
            {from == "new" ? "Neuen Eintrag hinzuf??gen" : "Begriff bearbeiten"}
          </div>

          <PropFieldDiv
            description={"Begriff"}
            valueElement={valueElements.nameInput}
          />

          <PropFieldDiv
            description={"Synonyme"}
            valueElement={valueElements.aliases}
          />

          <PropFieldDiv
            description={"Kategorien"}
            valueElement={valueElements.cats}
          />

          <PropFieldDiv
            description={"Beschreibung"}
            valueElement={valueElements.beschreibung}
          />

          <TermEditBottomBar
            setPickLinksOpen={setPickLinksOpen}
            saveTerm={onSaveButtonClicked}
            openTerm={openTerm}
            setOpenTerm={setOpenTerm}
            setLoadingImage={setLoadingImage}
            uploadImageBtn={valueElements.uploadImageBtn}
            linkToOtherTerms={valueElements.linkToOtherTerms}
            loadingImage={loadingImage}
            onFileChange={onImageFileChange}
            oldTerm={oldTerm}
            terms={terms}
            links={links}
            displayedLinks={displayedLinks}
            setDisplayedLinks={setDisplayedLinks}
            setAddExternalLinks={setAddExternalLinks}
            addExternalLinks={addExternalLinks}
            onLinkClicked={onLinkClicked}
          />
        </div>
        <ImagesAndLinksBar
          addedLinks={addedLinks}
          setAddedLinks={setAddedLinks}
          openTerm={openTerm}
          setOpenTerm={setOpenTerm}
          terms={terms}
          links={links}
        />
      </div>
    </DragDropDiv>
  );
};

export default TermEditModal;
