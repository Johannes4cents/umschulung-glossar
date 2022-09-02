import React from "react";
import useOnHover from "../../modals/useOnHover";

const SimpleQuestionHolder = ({ question, setExpanded, QField, index }) => {
  const hover = useOnHover({
    item: question,
    hoverBgColor: "#2f2f2f",
    normalBgColor: index % 2 == 0 ? "#3f3f3f" : "#5f5f5f",
  });
  return (
    <div
      {...hover.divProps}
      className="divRow"
      style={{
        width: "100%",
        backgroundColor: hover.bgColor,
        borderRadius: "1rem/1rem",
        padding: "4px",
        width: "95%",
        border: "1px solid white",
        marginBottom: "2px",
      }}
      onClick={() => {
        setExpanded(true);
      }}
    >
      <QField
        description={"author"}
        value={question.author}
        color="lightblue"
      />
      <div className="divColumn" style={{ flex: 1, justifyContent: "center" }}>
        <div className="textWhiteSmall" style={{ color: "grey" }}>
          Titel
        </div>
        <div className="textWhite">{question.title}</div>
      </div>

      <div className="divColumn" style={{ justifyContent: "center" }}>
        <div className="textWhiteSmall" style={{ color: "grey" }}>
          Beantwortet
        </div>
        <img
          src={
            question.answered
              ? "/images/icons/icon_thumbs_up.png"
              : "/images/icons/icon_thumbs_down.png"
          }
          className="icon25"
        />
      </div>
    </div>
  );
};

export default SimpleQuestionHolder;
