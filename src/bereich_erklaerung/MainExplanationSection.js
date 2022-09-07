import React from "react";
import ImagePreview from "../components/ImagePreview";
import RelatedLinksBar from "./RelatedLinksBar";
import TopToolBar from "./TopToolBar";
import parse from "html-react-parser";
import AttachedFilesBar from "./AttachedFilesBar";
import QuestionsBar from "./fragen/QuestionsBar";
import useModal from "../hooks/useModal";
import ViewImagesModal from "../modals/ViewImagesModal";
import ExternalLinksSection from "./ExternalLinksSection";

const MainExplanationSection = ({
  selectedTerm,
  setSelectedTerm,
  editModal,
  terms,
  questions,
  links,
}) => {
  return (
    <div className="divColumn" style={{ height: "100%", width: "700px" }}>
      <div
        className="textBoldWhite"
        style={{ marginBottom: "10px", fontSize: "20px" }}
      >
        Erklärung
      </div>
      {selectedTerm != null && (
        <TopToolBar
          modal={editModal}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
        />
      )}
      {!selectedTerm && (
        <div
          className="textWhiteSmall"
          style={{ color: "lightgray", fontStyle: "italic" }}
        >
          Bitte einen Begriff auswählen
        </div>
      )}
      {selectedTerm && (
        <div className="divColumn" style={{ width: "100%" }}>
          <div
            className="textBoldWhite"
            style={{
              padding: "5px",
              fontStyle: "italic",
              border: "1px solid gray",
              backgroundColor: "#496349",
              width: "100%",
              color: "lightgray",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            {selectedTerm.name}
          </div>
          <div style={{ marginBottom: "15px" }} />
          <DefinitionField selectedTerm={selectedTerm} />
          <ImagesRow selectedTerm={selectedTerm} />
          <div
            className="divRow"
            style={{
              width: "100%",
              justifyContent: "space-between",
              borderTop: "1px dotted white",
            }}
          >
            <RelatedLinksBar
              selectedTerm={selectedTerm}
              setSelectedTerm={setSelectedTerm}
              terms={terms}
            />

            <AttachedFilesBar selectedTerm={selectedTerm} />
          </div>
          <QuestionsBar
            selectedTerm={selectedTerm}
            setSelectedTerm={setSelectedTerm}
            questions={questions}
          />
          <ExternalLinksSection
            selectedTerm={selectedTerm}
            links={links}
            terms={terms}
          />
        </div>
      )}
    </div>
  );
};

const DefinitionField = ({ selectedTerm }) => {
  return (
    <div className="divColumn" style={{ maxHeight: "300px", overflow: "auto" }}>
      <div className="textBoldWhite">{parse(selectedTerm.content ?? "")}</div>
    </div>
  );
};

const ImagesRow = ({ selectedTerm }) => {
  const imageModal = useModal({
    password: "openImages",
    modalContent: <ViewImagesModal images={selectedTerm.images} />,
  });

  function onImageClicked(term, image) {
    imageModal.open("openImages");
  }

  return (
    <div
      className="divRow"
      style={{
        width: "100%",
        justifyContent: "space-around",
        overflow: "auto",
      }}
    >
      {selectedTerm.images.map((url) => (
        <ImagePreview
          key={url}
          image={url}
          size={150}
          onImageClicked={onImageClicked}
          term={selectedTerm}
        />
      ))}
      {imageModal.element}
    </div>
  );
};

export default MainExplanationSection;
