import React from "react";

const QuestionHolderList = ({ selectedTerm, question, index }) => {
  return (
    <div className="divRow" style={{ width: "100%" }}>
      <QField
        description={"author"}
        value={question.author}
        color="lightblue"
      />
      <div className="divRow" style={{ flex: 1, marginLeft: "10px" }}>
        <img src="/images/icons/icon_question.png" className="icon20" />
        <div
          className="textWhite"
          style={{ textAlign: "center", marginLeft: "5px" }}
        >
          {question.question}
        </div>
      </div>
    </div>
  );
};

const QField = ({ description, value, color }) => {
  return (
    <div className="divColumn">
      <div className="textWhiteSmall" style={{ color: "gray" }}>
        {description}
      </div>
      <div className="textWhite" style={{ color: color }}>
        {value}
      </div>
    </div>
  );
};

export default QuestionHolderList;
