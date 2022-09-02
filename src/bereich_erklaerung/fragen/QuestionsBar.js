import React, { useEffect, useState } from "react";
import ExpandedQuestions from "./ExpandedQuestions";

const QuestionsBar = ({ selectedTerm, setSelectedTerm, questions }) => {
  const [expanded, setExpanded] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);

  useEffect(() => {
    setQuestionsOpen((selectedTerm.questions ?? []).length > 0);
  }, [selectedTerm]);
  return (
    <div className="divColumn" style={{ width: "100%" }}>
      <div
        onClick={() => {
          setExpanded(!expanded);
        }}
        className="divRow"
        style={{
          width: "100%",
          justifyContent: "center",
          marginTop: "5px",
          backgroundColor: "#6f6f6f",
          padding: "4px",
          borderRadius: "1rem/1rem",
        }}
      >
        <img
          src="/images/icons/icon_Question.png"
          className="icon20"
          style={{ filter: questionsOpen ? null : "grayscale(100%)" }}
        />
        <div style={{ flex: 1 }} />
        <div className="textBoldWhite" style={{ fontStyle: "italic" }}>
          Offene Fragen
        </div>
        <div style={{ flex: 1 }} />
        <img
          src="/images/icons/icon_Question.png"
          className="icon20"
          style={{ filter: questionsOpen ? null : "grayscale(100%)" }}
        />
      </div>
      {expanded && (
        <ExpandedQuestions
          questions={questions}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
        />
      )}
    </div>
  );
};

export default QuestionsBar;
