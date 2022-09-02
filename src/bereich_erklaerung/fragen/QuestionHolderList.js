import React from "react";
import HoverImage from "../../components/HoverImage";
import useOnHover from "../../modals/useOnHover";

const QuestionHolderList = ({ selectedTerm, question, index }) => {
  const hover = useOnHover({
    item: selectedTerm,
    hoverBgColor: "#2f2f2f",
    normalBgColor: index % 2 == 0 ? "#3f3f3f" : "#5f5f5f",
  });
  return (
    <div
      {...hover.divProps}
      className="divRow"
      style={{
        borderRadius: "1rem/1rem",
        padding: "4px",
        width: "95%",
        backgroundColor: hover.bgColor,
      }}
    >
      <QField
        description={"author"}
        value={question.author}
        color="lightblue"
      />
      <div className="divColumn" style={{ flex: 1, marginLeft: "10px" }}>
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
      <HoverImage
        description={"beantworten"}
        standardGray={true}
        imgUrl={"Images/icons/icon_answer.png"}
        maxWidth={25}
        maxHeight={40}
      />
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
