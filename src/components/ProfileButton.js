import React from "react";
import miscStore from "../stores/miscStore";
import SignOutButton from "./SignOutButton";

const ProfileButton = () => {
  const { info } = miscStore();
  return (
    <div className="divColumn">
      <div className="textWhite">Logged in as</div>
      <div className="textBoldWhite">{info.username}</div>
    </div>
  );
};

export default ProfileButton;
