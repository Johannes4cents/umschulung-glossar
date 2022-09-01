import React from "react";
import ImagePreview from "../components/ImagePreview";
import RelatedLinksBar from "./RelatedLinksBar";
import TopToolBar from "./TopToolBar";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

const MainExplanationSection = ({
  selectedTerm,
  setSelectedTerm,
  editModal,
  terms,
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
              backgroundColor: "#5f5f5f",
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
          <RelatedLinksBar
            selectedTerm={selectedTerm}
            setSelectedTerm={setSelectedTerm}
            terms={terms}
          />
        </div>
      )}
    </div>
  );
};

const DefinitionField = ({ selectedTerm }) => {
  return (
    <div className="divColumn">
      <div className="textBoldWhite">
        {ReactHtmlParser(selectedTerm.content)}
      </div>
    </div>
  );
};

const ImagesRow = ({ selectedTerm }) => {
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
        <ImagePreview image={url} size={150} />
      ))}
    </div>
  );
};

export default MainExplanationSection;
