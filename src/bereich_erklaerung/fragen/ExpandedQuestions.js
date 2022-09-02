import React, { useEffect, useState } from "react";
import { getCollectionListener } from "../../misc/handleFirestore";
import { getItemById } from "../../misc/helperFuncs";
import QuestionHolderList from "./QuestionHolderList";

const ExpandedQuestions = ({ selectedTerm, setSelectedTerm, questions }) => {
  const [displayedQuestions, setDisplayedQuestions] = useState([]);

  useEffect(() => {
    console.log("selectedTerm - ", selectedTerm, " | questions - ", questions);
    if (selectedTerm.questions != null) {
      const questionList = selectedTerm.questions.map((id) =>
        getItemById(id, questions)
      );
      console.log("questionsList - ", questionList);
      setDisplayedQuestions(questionList);
    }
  }, [selectedTerm, questions]);

  return (
    <div
      className="divColumn"
      style={{ maxHeight: "300px", overflow: "auto", width: "100%" }}
    >
      {displayedQuestions.map((q, index) => (
        <QuestionHolderList
          key={q.id}
          question={q}
          selectedTerm={selectedTerm}
          index={index}
        />
      ))}
    </div>
  );
};

export default ExpandedQuestions;
