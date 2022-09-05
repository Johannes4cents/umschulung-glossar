import React from "react";
import miscStore from "../stores/miscStore";

const ConfirmationModal = ({ text, onConfirmed }) => {
  const { closeModal } = miscStore();
  return (
    <div
      className="divColumn"
      style={{
        backgroundColor: "#4f4f4f",
        padding: "4px",
        border: "1px solid lightgrey",
        borderRadius: "1rem/1rem",
      }}
    >
      <div className="textBoldWhite">{text}</div>
      <div
        className="divRow"
        style={{ width: "100%", justifyContent: "space-around" }}
      >
        <img
          src="/images/icons/icon_cancel.png"
          className="icon20"
          onClick={() => {
            onConfirmed(false);
            closeModal();
          }}
        />
        <img
          src="/images/drawable/btn_save.png"
          className="icon20"
          onClick={() => {
            onConfirmed(true);
            closeModal();
          }}
        />
      </div>
    </div>
  );
};

export default ConfirmationModal;
