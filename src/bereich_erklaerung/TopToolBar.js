import React from "react";
import useModal from "../hooks/useModal";
import { deleteDocInFirestore } from "../misc/handleFirestore";
import ConfirmationModal from "../modals/ConfirmationModal";
import useOnHover from "../modals/useOnHover";
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
      <AuthorField selectedTerm={selectedTerm} />
      {confModal.element}
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

const HoverImage = ({ imgUrl, onClick, description }) => {
  const hover = useOnHover({ item: imgUrl, hoverDescription: description });
  return (
    <div {...hover.divProps}>
      <img src={imgUrl} className="icon25" onClick={onClick} />
      {hover.hoverDescription}
    </div>
  );
};

export default TopToolBar;
