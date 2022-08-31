import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import CatsListTerms from "../bereich_begriffs_liste/CatsListTerms";
import ClickedColorImage from "../components/ClickedColorImage";
import ImagePreview from "../components/ImagePreview";
import LoadingSpinner from "../components/LoadingSpinner";
import { storage } from "../firebase/fireInit";
import useModal from "../hooks/useModal";
import {
  setDocInFirestore,
  uploadImageToStorage,
} from "../misc/handleFirestore";
import { makeTerm } from "../misc/makeObjects";
import miscStore from "../stores/miscStore";
import EnlargedImageModal from "./EnlargedImageModal";

const TermEditModal = ({ terms, setTerms, setSelectedTerm }) => {
  const [openTerm, setOpenTerm] = useState(makeTerm());
  const refNameInput = useRef(null);
  const refDescriptionInput = useRef(null);
  const refFileInput = useRef(null);
  const [from, setFrom] = useState("new");
  const { termPayload, closeModal } = miscStore();
  const [loadingImage, setLoadingImage] = useState(false);

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
  }

  function onSaveButtonClicked() {
    if (
      openTerm.name.length > 1 &&
      openTerm.cats.length > 0 &&
      openTerm.definition.length > 2
    ) {
      saveTerm();
    }
  }

  function onInputEnter(e) {
    if (e.key == "Enter") {
      refDescriptionInput.current.focus();
    }
  }

  function onImageUploaded(url) {
    setOpenTerm({ ...openTerm, images: [...openTerm.images, url] });
    setLoadingImage(false);
  }

  const onFileChange = (e) => {
    let file = e.target.files[0];
    setLoadingImage(true);
    uploadImageToStorage("termImages", file, (path) => {
      getDownloadURL(ref(storage, path)).then((url) => {
        console.log("url - ", url);
        onImageUploaded(url);
      });
    });
  };

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
      <div className="divColumn" style={{ position: "relative" }}>
        <img src={"/images/icons/icon_link.png"} className="icon25" />
        <div className="textWhiteSmall">Andere Begriffe verlinken</div>
      </div>
    ),
    beschreibung: (
      <textarea
        value={openTerm.definition}
        onChange={(e) => {
          onDescriptionChange(e.target.value);
        }}
        onKeyDown={(e) => {
          onInputEnter(e, refDescriptionInput);
        }}
        type="text"
        ref={refDescriptionInput}
        style={{ resize: "none", width: "90%", height: "300px" }}
      />
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

  return (
    <div className="divRow" style={{ height: "100%" }}>
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
          style={{ fontSize: "20px", color: "lightgray", marginBottom: "10px" }}
        >
          {from == "new" ? "Neuen Eintrag hinzufügen" : "Begriff bearbeiten"}
        </div>

        <PropFieldDiv
          description={"Begriff"}
          valueElement={valueElements.nameInput}
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
      <ImagesAndLinks openTerm={openTerm} setOpenTerm={setOpenTerm} />
    </div>
  );
};

const ImagesAndLinks = ({ openTerm, setOpenTerm }) => {
  return (
    <div
      className="divColumn"
      style={{
        height: "550px",
        marginLeft: "20px",
        width: "200px",
        backgroundColor: "#4f4f4f",
      }}
    >
      <LinksList openTerm={openTerm} setOpenTerm={setOpenTerm} />
      <ImagesList openTerm={openTerm} setOpenTerm={setOpenTerm} />
    </div>
  );
};

const LinksList = ({ openTerm, setOpenTerm }) => {
  return (
    <div className="divColumn" style={{ flex: 1 }}>
      <div className="textBoldWhite">Links</div>
    </div>
  );
};

const ImagesList = ({ openTerm, setOpenTerm }) => {
  const modal = useModal({
    modalContent: <EnlargedImageModal />,
    password: "biggerImage",
  });

  const deleteImage = (term, imgUrl) => {
    setOpenTerm({
      ...openTerm,
      images: openTerm.images.filter((url) => url != imgUrl),
    });
  };

  return (
    <div className="divColumn" style={{ flex: 1 }}>
      <div className="textBoldWhite">Images</div>
      <div className="divColumn" style={{ overflow: "auto" }}>
        {openTerm.images.map((imgUrl) => (
          <ImagePreview
            key={imgUrl}
            size={120}
            image={imgUrl}
            onImageClicked={() => {
              modal.open("biggerImage");
            }}
            deleteImage={deleteImage}
            term={openTerm}
          />
        ))}
      </div>
    </div>
  );
};

const PropFieldDiv = ({ description, valueElement }) => {
  return (
    <div className="divColumn" style={{ width: "100%", marginBottom: "5px" }}>
      <div className="textWhite">{description}</div>
      {valueElement}
    </div>
  );
};

const TermEditBottomBar = ({
  saveTerm,
  openTerm,
  uploadImageBtn,
  linkToOtherTerms,
}) => {
  return (
    <div
      className="divRow"
      style={{ width: "100%", justifyContent: "space-between" }}
    >
      {linkToOtherTerms}
      {uploadImageBtn}
      <ClickedColorImage
        imgUrl={"/images/icons/icon_create.png"}
        size={30}
        itemSelected={
          openTerm.name.length > 1 &&
          openTerm.cats.length > 0 &&
          openTerm.definition.length > 2
        }
        onClick={saveTerm}
      />
    </div>
  );
};

export default TermEditModal;
