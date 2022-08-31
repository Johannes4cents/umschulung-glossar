import React from "react";

const MainExplanationSection = ({ selectedTerm, setSelectedTerm }) => {
  return (
    <div className="divColumn">
      <div
        className="textBoldWhite"
        style={{ marginBottom: "10px", fontSize: "20px" }}
      >
        Erklärung
      </div>
      {!selectedTerm && (
        <div
          className="textWhiteSmall"
          style={{ color: "lightgray", fontStyle: "italic" }}
        >
          Bitte einen Begriff auswählen
        </div>
      )}
    </div>
  );
};

export default MainExplanationSection;
