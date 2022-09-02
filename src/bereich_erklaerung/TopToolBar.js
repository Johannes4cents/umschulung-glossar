import React from "react";
import HoverImage from "../components/HoverImage";
import useModal from "../hooks/useModal";
import { deleteDocInFirestore } from "../misc/handleFirestore";
import ConfirmationModal from "../modals/ConfirmationModal";
import useOnHover from "../modals/useOnHover";
import AskQuestionModal from "../QuestionAndAnswers/AskQuestionModal";
import miscStore from "../stores/miscStore";

const TopToolBar = ({ selectedTerm, setSelectedTerm, modal }) => {
  const { setTermPayload } = miscStore();
  const confModal = useModal({
    password: "deleteEntry",
    modalContent: (
      <ConfirmationModal
        text={"Eintrag wirklich löschen?"}
        onConfirmed={confirmDeletion}
      />
    ),
  });

  const questionModal = useModal({
    password: "askQuestion",
    modalContent: <AskQuestionModal term={selectedTerm} />,
    position: "bottomLeft",
    translate: { x: 0, y: 0 },
  });
  function openEdit() {
    if (selectedTerm != null) {
      modal.open("newTerm");
      setTermPayload({
        from: "edit",
        openTerm: { ...selectedTerm },
      });
    }
  }

  function confirmDeletion(confirmation) {
    if (confirmation) {
      deleteDocInFirestore("terms", selectedTerm.id, () => {
        setSelectedTerm(null);
      });
    }
  }

  function askQuestion() {
    questionModal.open("askQuestion");
  }
  return (
    <div
      className="divRow"
      style={{
        width: "100%",
        justifyContent: "space-around",
        marginBottom: "5px",
      }}
    >
      <HoverImage
        imgUrl={"/images/icons/icon_trashcan.png"}
        onClick={() => {
          confModal.open("deleteEntry");
        }}
        description={"Eintrag Löschen"}
      />
      <HoverImage
        imgUrl={"/images/icons/icon_edit.png"}
        onClick={openEdit}
        description={"Eintrag Bearbeiten"}
      />
      <HoverImage
        imgUrl={"/images/icons/icon_question.png"}
        onClick={askQuestion}
        description={"Frage Stellen"}
      />
      <AuthorField selectedTerm={selectedTerm} />
      {confModal.element}
      {questionModal.element}
    </div>
  );
};

const AuthorField = ({ selectedTerm }) => {
  return (
    <div className="divColumn">
      <div className="textWhiteSmall" style={{ color: "gray" }}>
        Author
      </div>
      <div className="textWhite">{selectedTerm.author ?? "Unknown"}</div>
    </div>
  );
};

export default TopToolBar;
