import React from "react";
import miscStore from "../stores/miscStore";
import ProfileField from "./ProfileField";

const ProfileModal = () => {
  const { info } = miscStore();

  function changeNickname() {}

  return (
    <div
      className="divColumn"
      style={{
        width: "400px",
        padding: "5px",
        border: "1px solid white",
        backgroundColor: "#4f4f4f",
        borderRadius: "1rem/1rem",
      }}
    >
      <div
        className="textBoldWhite"
        style={{ fontSize: "20px", marginBottom: "10px" }}
      >
        Profile
      </div>
      <div
        className="divRow"
        style={{
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <ProfileField
          description={"username"}
          value={info.username}
          onClick={changeNickname}
        />
        <ProfileField
          description={"Total score"}
          value={info.score}
          textColor={"lightgreen"}
        />
      </div>
      <div style={{ width: "90%", borderBottom: "1px solid grey" }} />
      <div
        className="divRow"
        style={{
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <ProfileField
          description={"Einträge verfasst"}
          value={info.createdEntries.length}
        />
        <ProfileField
          description={"Einträge bearbeitet"}
          value={info.editedEntries.length}
        />
      </div>
      <div
        className="divRow"
        style={{
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <ProfileField
          description={"Fragen gestellt"}
          value={info.askedQuestions.length}
        />
        <ProfileField
          description={"Frage beantwortet"}
          value={info.answeredQuestions.length}
        />
        <ProfileField
          description={"Top antwort"}
          value={info.topAnswerQuestions.length}
        />
      </div>
    </div>
  );
};

export default ProfileModal;
