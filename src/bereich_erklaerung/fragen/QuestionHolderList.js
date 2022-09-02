import React, { useState } from "react";
import HoverImage from "../../components/HoverImage";
import useModal from "../../hooks/useModal";
import useOnHover from "../../modals/useOnHover";
import AnswerQuestionModal from "../../QuestionAndAnswers/AnswerQuestionModal";
import AskQuestionModal from "../../QuestionAndAnswers/AskQuestionModal";
import miscStore from "../../stores/miscStore";
import ExpandedQuestionHolder from "./ExpandedQuestionHolder";
import SimpleQuestionHolder from "./SimpleQuestionHolder";

const QuestionHolderList = ({
  selectedTerm,
  question,
  index,
  setSelectedTerm,
}) => {
  const { info } = miscStore();
  const [expanded, setExpanded] = useState(false);
  const answerModal = useModal({
    password: "answer",
    modalContent: (
      <AnswerQuestionModal term={selectedTerm} question={question} />
    ),
  });

  const questionModal = useModal({
    password: "updateQuestion",
    modalContent: (
      <AskQuestionModal term={selectedTerm} incomingQuestion={question} />
    ),
    position: "topLeft",
    translate: { x: 0, y: 0 },
  });

  return (
    <div style={{ width: "100%" }}>
      {expanded && (
        <ExpandedQuestionHolder
          answerModal={answerModal}
          questionModal={questionModal}
          QField={QField}
          info={info}
          HoverImage={HoverImage}
          selectedTerm={selectedTerm}
          index={index}
          question={question}
          setExpanded={setExpanded}
          setSelectedTerm={setSelectedTerm}
        />
      )}
      {!expanded && (
        <SimpleQuestionHolder
          question={question}
          setExpanded={setExpanded}
          QField={QField}
        />
      )}
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
