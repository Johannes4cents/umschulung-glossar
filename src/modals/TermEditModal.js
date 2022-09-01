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
import { forArrayLength, getItemById } from "../misc/helperFuncs";
import { makeTerm } from "../misc/makeObjects";
import miscStore from "../stores/miscStore";
import PickLinksModal from "./PickLinksModal";
import ImagesAndLinksBar from "./TerminEditElements/ImagesAndLinksBar";
import PropFieldDiv from "./TerminEditElements/PropFieldDiv";
import TermEditBottomBar from "./TerminEditElements/TermEditBottomBar";

import DraftEditor from "./TerminEditElements/DraftEditor";

const TermEditModal = ({ setSelectedTerm, terms }) => {
  const [openTerm, setOpenTerm] = useState(makeTerm());
  const [newAlias, setNewAlias] = useState("");
  const refNameInput = useRef(null);
  const refDescriptionInput = useRef(null);
  const refFileInput = useRef(null);
  const refAliaseInput = useRef(null);
  const [from, setFrom] = useState("new");
  const { termPayload, closeModal, dragCursor, info } = miscStore();
  const [loadingImage, setLoadingImage] = useState(false);
  const [pickLinksOpen, setPickLinksOpen] = useState(false);

  useEffect(() => {
    if (termPayload != null) {
      setOpenTerm(termPayload.openTerm);
      setFrom(termPayload.from);
    }
  }, [termPayload]);

  useEffect(() => {
    if (refNameInput.current != null && termPayload != null) {
      refNameInput.current.focus();
      console.log("refName focus");
    }
  }, [termPayload, refNameInput]);

  function addRemoveCats(cats) {
    setOpenTerm({ ...openTerm, cats: cats });
  }

  function onDescriptionChange(text) {
    setOpenTerm({ ...openTerm, definition: text });
  }

  function saveTerm() {
    function closeAfterSave() {
      closeModal();
      console.log("termSaved");
    }
    setDocInFirestore("terms", openTerm.id, openTerm, closeAfterSave);
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

  const onFileChange = (e) => {
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
      refDescriptionInput.current.focus();
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
              onChange={onFileChange}
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
          setPickLinksOpen(!pickLinksOpen);
        }}
      >
        <img src={"/images/icons/icon_link.png"} className="icon25" />
        <div className="textWhiteSmall">Andere Begriffe verlinken</div>
      </div>
    ),

    beschreibung: <DraftEditor openTerm={openTerm} setOpenTerm={setOpenTerm} />,

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

  function handleDrop(files) {
    const imageEndings = ["png", "jpg", "jpeg"];
    const imageFiles = [];
    forArrayLength(files, (file) => {
      if (imageEndings.some((ending) => file.name.endsWith(ending))) {
        imageFiles.push(file);
      }
    });

    console.log("imageFiles - ", imageFiles);
    if (imageFiles.length > 0)
      forArrayLength(imageFiles, (file) => {
        addImageToTerm(file);
      });
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
        {pickLinksOpen && (
          <PickLinksModal
            terms={terms}
            openTerm={openTerm}
            setOpenTerm={setOpenTerm}
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
            {from == "new" ? "Neuen Eintrag hinzufügen" : "Begriff bearbeiten"}
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
            saveTerm={onSaveButtonClicked}
            openTerm={openTerm}
            uploadImageBtn={valueElements.uploadImageBtn}
            linkToOtherTerms={valueElements.linkToOtherTerms}
          />
        </div>
        <ImagesAndLinksBar
          openTerm={openTerm}
          setOpenTerm={setOpenTerm}
          terms={terms}
        />
      </div>
    </DragDropDiv>
  );
};

export default TermEditModal;
