import React from "react";
import ValidateAnswer from "./ValidateAnswer";

const AnswerHolder = ({
  question,
  answer,
  selectedTerm,
  setSelectedTerm,
  setExpanded,
}) => {
  return (
    <div
      className="divRow"
      style={{
        padding: "4px",
        width: "95%",
        backgroundColor: "#1f6f6f",
        borderRadius: "0.5rem/0.5rem",
      }}
    >
      <div className="divRow">
        <div className="textWhiteSmall" style={{ color: "gray" }}>
          from
        </div>
        <div className="textWhite" style={{ fontStyle: "italic" }}>
          {answer.author}
        </div>
      </div>
      <div
        className="divColumn"
        style={{ flex: 1, justifyContent: "center", textAlign: "center" }}
      >
        <div className="textWhiteSmall" style={{ color: "gray" }}>
          Antwort
        </div>
        <div className="textWhite">{answer.answer}</div>
      </div>
      <ValidateAnswer
        setExpanded={setExpanded}
        question={question}
        answer={answer}
        selectedTerm={selectedTerm}
        setSelectedTerm={setSelectedTerm}
      />
    </div>
  );
};

export default AnswerHolder;
