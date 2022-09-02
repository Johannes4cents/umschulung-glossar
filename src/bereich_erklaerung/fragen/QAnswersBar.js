import React from "react";
import AnswerHolder from "./AnswerHolder";

const QAnswersBar = ({
  question,
  selectedTerm,
  setSelectedTerm,
  setExpanded,
}) => {
  return (
    <div style={{ width: "100%", borderTop: "1px dotted white" }}>
      {question.answers.length > 0 && (
        <div
          className="divColumn"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <div className="textBoldWhite">Antworten</div>
          <div
            className="divColumn"
            style={{ maxHeight: "200px", overflow: "auto", width: "100%" }}
          >
            {question.answers.map((a) => (
              <AnswerHolder
                answer={a}
                key={a.id}
                question={question}
                selectedTerm={selectedTerm}
                setSelectedTerm={setSelectedTerm}
                setExpanded={setExpanded}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QAnswersBar;
