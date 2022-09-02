import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { setDocInFirestore } from "../misc/handleFirestore";
import { makeQuestion } from "../misc/makeObjects";
import miscStore from "../stores/miscStore";

const AskQuestionModal = ({ term, incomingQuestion }) => {
  const { info, closeModal } = miscStore();
  const [question, setQuestion] = useState(makeQuestion(info.username));
  const refTitel = useRef(null);
  const refContent = useRef(null);

  useEffect(() => {
    if (incomingQuestion) {
      setQuestion(incomingQuestion);
    }
  }, [incomingQuestion]);

  useEffect(() => {
    if (refTitel.current != null) {
      refTitel.current.focus();
    }
  }, [refTitel]);

  function saveQuestion() {
    if (question.title.length > 2 || question.question.length > 5) {
      setDocInFirestore("questions", question.id, question, () => {
        if (![...(term.questions ?? [])].includes(question.id)) {
          const newTerm = {
            ...term,
            questions: [...(term.questions ?? []), question.id],
          };
          setDocInFirestore("terms", term.id, newTerm, () => {
            toast(`Frage für den Begriff ${term.name} gespeichert`);
            closeModal();
          });
        } else closeModal();
      });
    } else toast("Frage muss einen Titel und eine Beschreibung haben");
  }

  const onInputEnter = (e, ref) => {
    if (e.key == "Enter") {
      refContent.current.focus();
    }
  };

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
      <div className="textBoldWhite">Frage Stellen über</div>
      <div
        className="textWhite"
        style={{ fontStyle: "italic", marginBottom: "5px" }}
      >
        {term.name}
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
          Titel
        </div>
        <input
          ref={refTitel}
          onKeyDown={(e) => {
            onInputEnter(e, refTitel);
          }}
          style={{ textAlign: "center" }}
          value={question.title}
          onChange={(e) => {
            setQuestion({ ...question, title: e.target.value });
          }}
        />
      </div>

      <div className="divColumn" style={{ width: "100%" }}>
        <div className="textWhiteSmall" style={{ color: "gray" }}>
          Frage
        </div>
        <textarea
          ref={refContent}
          style={{ width: "95%", height: "200px", resize: "none" }}
          value={question.question}
          onChange={(e) => {
            setQuestion({ ...question, question: e.target.value });
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
          src="/images/icons/icon_question.png"
          className="icon25"
          onClick={saveQuestion}
        />
      </div>
    </div>
  );
};

export default AskQuestionModal;
