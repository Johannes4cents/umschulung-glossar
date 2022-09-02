import React from "react";
import HoverImage from "../../components/HoverImage";
import { setDocInFirestore } from "../../misc/handleFirestore";
import miscStore from "../../stores/miscStore";

const ValidateAnswer = ({
  question,
  answer,
  selectedTerm,
  setSelectedTerm,
  setExpanded,
}) => {
  const { info } = miscStore();

  function deleteAnswer() {
    console.log("selectedTerm - ", selectedTerm);
    let newQuestion = {
      ...question,
      answers: question.answers.filter((a) => a.id != answer.id),
    };
    if (newQuestion.answered == answer.id) newQuestion.answered = false;
    setDocInFirestore("questions", newQuestion.id, newQuestion, () => {
      setExpanded(false);
    });
  }

  function thumbsDownFunc() {
    if (question.answered == answer.id) {
      question.answered = null;
    }
    let goodAnswer = question.answers.find((a) => a == answer);
    goodAnswer.accepted = false;
    setDocInFirestore("questions", question.id, question, () => {
      setExpanded(false);
    });
  }

  function thumbsUpFunc() {
    console.log("question - ", question, " | answer : ", answer);
    let goodAnswer = question.answers.find((a) => a == answer);
    goodAnswer.accepted = true;
    let newQuestion = { ...question, answered: answer.id };
    const newTerm = {
      ...selectedTerm,
      question: [
        ...selectedTerm.questions.filter((q) => q.id != question.id),
        newQuestion,
      ],
    };
    setSelectedTerm(newTerm);
    setDocInFirestore("questions", question.id, newQuestion, () => {
      setExpanded(false);
    });
  }
  return (
    <div>
      {info.username == question.author && (
        <div className="divRow">
          <div style={{ marginRight: "7px" }}>
            <HoverImage
              imgUrl={"/images/icons/icon_trashcan.png"}
              onClick={deleteAnswer}
              description={"Antwort löschen"}
            />
          </div>

          <div style={{ marginRight: "7px" }}>
            <HoverImage
              imgUrl={"/images/icons/icon_thumbs_down.png"}
              onClick={thumbsDownFunc}
              description={"Antwort passt nicht"}
            />
          </div>

          <div style={{ marginRight: "7px" }}>
            <HoverImage
              imgUrl={"/images/icons/icon_thumbs_up.png"}
              onClick={thumbsUpFunc}
              description={"Frage Als Beantwortet Vermerken"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidateAnswer;
