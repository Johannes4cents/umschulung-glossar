import React from "react";
import useOnHover from "../../modals/useOnHover";
import QAnswersBar from "./QAnswersBar";

const ExpandedQuestionHolder = ({
  setExpanded,
  question,
  QField,
  info,
  HoverImage,
  answerModal,
  questionModal,
  selectedTerm,
  index,
  setSelectedTerm,
}) => {
  const hover = useOnHover({
    item: selectedTerm,
    hoverBgColor: "#2f2f2f",
    normalBgColor: index % 2 == 0 ? "#3f3f3f" : "#5f5f5f",
  });
  return (
    <div
      className="divColumn"
      style={{
        borderRadius: "1rem/1rem",
        padding: "4px",
        width: "95%",
        backgroundColor: hover.bgColor,
      }}
    >
      <div {...hover.divProps} className="divRow" style={{ width: "100%" }}>
        <QField
          description={"author"}
          value={question.author}
          color="lightblue"
        />
        {question.author == info.username && (
          <img
            onClick={() => {
              questionModal.open("updateQuestion");
            }}
            className="icon25"
            src="/images/icons/icon_edit.png"
            style={{ marginLeft: "10px" }}
          />
        )}
        <div
          className="divColumn"
          style={{ flex: 1, marginLeft: "10px" }}
          onClick={() => {
            setExpanded(false);
          }}
        >
          <div className="textWhiteSmall" style={{ color: "gray" }}>
            Frage
          </div>
          <div
            className="textWhite"
            style={{ textAlign: "center", marginLeft: "5px" }}
          >
            {question.question}
          </div>
        </div>
        <div style={{ marginRight: "5px" }}>
          <HoverImage
            onClick={() => {
              answerModal.open("answer");
            }}
            description={"beantworten"}
            standardGray={true}
            imgUrl={"/images/icons/icon_answer.png"}
            maxWidth={25}
            maxHeight={40}
          />
        </div>

        {answerModal.element}
        {questionModal.element}
      </div>
      <QAnswersBar
        setExpanded={setExpanded}
        question={question}
        selectedTerm={selectedTerm}
        setSelectedTerm={setSelectedTerm}
      />
    </div>
  );
};

export default ExpandedQuestionHolder;
