import React from "react";
import useModal from "../hooks/useModal";
import useOnHover from "../modals/useOnHover";
import ProfileModal from "../profile/ProfileModal";
import miscStore from "../stores/miscStore";
import SignOutButton from "./SignOutButton";

const ProfileButton = () => {
  const modal = useModal({
    password: "openProfile",
    center: true,
    translate: { x: 50, y: 100 },
    darkOverlay: true,
    modalContent: <ProfileModal />,
  });
  const hover = useOnHover({
    item: "",
    normalBgColor: "#588258",
    hoverBgColor: "#367030",
  });
  const { info } = miscStore();

  function openProfile() {
    modal.open("openProfile");
  }
  return (
    <div
      {...hover.divProps}
      className="divColumn"
      style={{
        padding: "6px",
        border: "1px solid turquoise",
        borderRadius: "1rem/1rem",
        backgroundColor: hover.bgColor,
      }}
    >
      <div className="textWhite" onClick={openProfile}>
        Logged in as
      </div>
      <div className="textBoldWhite" onClick={openProfile}>
        {info.username}
      </div>
      {modal.element}
    </div>
  );
};

export default ProfileButton;
