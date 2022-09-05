import React from "react";
import HoverImage from "../../components/HoverImage";
import useModal from "../../hooks/useModal";
import { deleteDocInFirestore } from "../../misc/handleFirestore";
import { getItemById, newTrim } from "../../misc/helperFuncs";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { toast } from "react-toastify";
import NewLinkModal from "./NewLinkModal";
import miscStore from "../../stores/miscStore";
const LinkDetailedModal = ({ link, terms }) => {
  const editModal = useModal({
    password: "editLink",
    modalContent: <NewLinkModal terms={terms} oldLink={link} />,
  });
  const { closeModal, loggedIn } = miscStore();
  function editLink() {
    editModal.open("editLink");
  }

  function onConfirmed(confirmed) {
    if (confirmed) {
      deleteDocInFirestore("links", newTrim(link.url), () => {
        toast("Link aus Datenbank gelöscht");
      });
    }
  }

  const confModal = useModal({
    password: `deleteLink${link.url}`,
    translate: { x: 100, y: 100 },
    modalContent: (
      <ConfirmationModal
        onConfirmed={onConfirmed}
        text="Link wirklich löschen?"
      />
    ),
  });

  function deleteLink() {
    confModal.open(`deleteLink${link.url}`);
  }

  return (
    <div
      className="divColumn"
      style={{
        minWidth: "300px",
        backgroundColor: "#4f4f4f",
        padding: "5px",
        border: "1px solid white",
        borderRadius: "0.5rem/0.5rem",
      }}
    >
      <div
        className="divRow"
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <div
          className="divRow"
          style={{ flex: 1, justifyContent: "space-around" }}
        >
          {loggedIn && (
            <div style={{ width: "100%" }}>
              <HoverImage
                imgUrl={"/images/icons/icon_trashcan.png"}
                standardGray={true}
                maxHeight={20}
                maxWidth={20}
                description={"Link löschen"}
                onClick={deleteLink}
              />
              <HoverImage
                onClick={editLink}
                imgUrl={"/images/icons/icon_edit.png"}
                standardGray={true}
                maxHeight={20}
                maxWidth={20}
                description={"Link Bearbeiten"}
              />
            </div>
          )}

          {confModal.element}
          {editModal.element}
        </div>
        )
        <div
          className="textBoldWhite"
          onClick={() => {
            console.log("Link - ", link);
          }}
          style={{ marginBottom: "5px", flex: 2, textAlign: "center" }}
        >
          Link Detailiert
        </div>
        <div style={{ flex: 1 }} />
      </div>

      <div className="divColumn" style={{ width: "100%", marginBottom: "5px" }}>
        <div className="textWhiteSmall" style={{ color: "grey" }}>
          Link
        </div>
        <a
          href={link.url}
          target="_blank"
          rel="noreferrer noopener"
          style={{ color: "lightblue" }}
        >
          {link.url}
        </a>
      </div>

      <div className="textWhite" style={{ color: "grey" }}>
        Suchbegriffe
      </div>
      <div
        className="divRow"
        style={{
          width: "100%",
          overflow: "auto",
          justifyContent: "space-around",
        }}
      >
        {link.searchTerms.map((s) => (
          <div
            key={s}
            className="textWhiteSmall"
            style={{
              padding: "2px",
              border: "1px solid green",
              borderRadius: "0.5rem/0.5rem",
            }}
          >
            {s}
          </div>
        ))}
      </div>

      <div className="textWhite" style={{ color: "grey" }}>
        Verbundene Themen
      </div>
      <div
        className="divRow"
        style={{
          width: "100%",
          overflow: "auto",
          justifyContent: "space-around",
        }}
      >
        {link.terms
          .map((id) => getItemById(id, terms))
          .map((t) => (
            <div
              key={t.name}
              className="textWhiteSmall"
              style={{
                padding: "2px",
                border: "1px solid blue",
                borderRadius: "0.5rem/0.5rem",
              }}
            >
              {t.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default LinkDetailedModal;
