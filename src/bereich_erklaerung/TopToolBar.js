import React from "react";
import HoverImage from "../components/HoverImage";
import useModal from "../hooks/useModal";
import {
  deleteDocInFirestore,
  setDocInFirestore,
} from "../misc/handleFirestore";
import ConfirmationModal from "../modals/ConfirmationModal";
import useOnHover from "../modals/useOnHover";
import AskQuestionModal from "../QuestionAndAnswers/AskQuestionModal";
import miscStore from "../stores/miscStore";

const TopToolBar = ({ selectedTerm, setSelectedTerm, modal }) => {
  const { setTermPayload, loggedIn } = miscStore();
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
      setDocInFirestore("termsArchive", selectedTerm.id, selectedTerm, () => {
        deleteDocInFirestore("terms", selectedTerm.id, () => {
          setSelectedTerm(null);
        });
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
      {loggedIn && (
        <div
          className="divRow"
          style={{ flex: 2, justifyContent: "space-around" }}
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
        </div>
      )}

      <div
        className="divRow"
        style={{ flex: 1, justifyContent: "space-around" }}
      >
        <AuthorField selectedTerm={selectedTerm} />
        <AuthorField selectedTerm={selectedTerm} lastEdit={true} />
      </div>

      {confModal.element}
      {questionModal.element}
    </div>
  );
};

const AuthorField = ({ selectedTerm, lastEdit = false }) => {
  return (
    <div className="divColumn">
      <div className="textWhiteSmall" style={{ color: "gray" }}>
        {!lastEdit ? "Author" : "Last Edit"}
      </div>
      <div className="textWhite">
        {!lastEdit
          ? selectedTerm.author ?? "Unknown"
          : selectedTerm.lastEditor ?? "unknown"}
      </div>
    </div>
  );
};

export default TopToolBar;
