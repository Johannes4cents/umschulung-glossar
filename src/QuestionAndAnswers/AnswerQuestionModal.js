import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { setDocInFirestore } from "../misc/handleFirestore";
import { makeAnswer, makeQuestion } from "../misc/makeObjects";
import miscStore from "../stores/miscStore";

const AnswerQuestionModal = ({ term, question }) => {
  const { info, closeModal } = miscStore();
  const [answer, setAnswer] = useState(makeAnswer(info.username, question.id));
  const refContent = useRef(null);

  useEffect(() => {
    if (refContent.current != null) {
      refContent.current.focus();
    }
  }, [refContent, term, question]);

  function saveAnswer() {
    if (answer.answer.length > 5) {
      let newQuestion = { ...question, answers: [...question.answers, answer] };
      setDocInFirestore("questions", question.id, newQuestion, () => {
        closeModal();
      });
    } else toast("Antwort muss einen Text haben");
  }
  return (
    <div
      className="divColumn"
      style={{
        backgroundColor: "#3f3f3f",
        padding: "4px",
        border: "1px solid white",
        width: "250px",
        minHeight: "300px",
      }}
    >
      <div className="textBoldWhite">Antworten</div>
      <div
        className="textWhite"
        style={{ fontStyle: "italic", marginBottom: "5px" }}
      >
        {question.title}
      </div>

      <div className="divColumn" style={{ width: "100%" }}>
        <div className="textWhiteSmall" style={{ color: "gray" }}>
          Author
        </div>
        <div className="textWhite" style={{ color: "lightblue" }}>
          {info.username}
        </div>
      </div>

      <div className="divColumn" style={{ width: "100%" }}>
        <div className="textWhiteSmall" style={{ color: "gray" }}>
          Antwort
        </div>
        <textarea
          ref={refContent}
          style={{ width: "95%", height: "200px", resize: "none" }}
          value={answer.answer}
          onChange={(e) => {
            setAnswer({ ...answer, answer: e.target.value });
          }}
        />
      </div>
      <div
        className="divRow"
        style={{
          width: "90%",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <img
          src="/images/icons/icon_cancel.png"
          className="icon25"
          onClick={closeModal}
        />
        <img
          src="/images/icons/icon_answer.png"
          className="icon25"
          onClick={saveAnswer}
        />
      </div>
    </div>
  );
};

export default AnswerQuestionModal;
