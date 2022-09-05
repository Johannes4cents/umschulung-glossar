import React from "react";
import { user } from "../firebase/fireInit";
import useModal from "../hooks/useModal";
import SignUpWithEMailModal from "../modals/SignUpWithEmailModal";
import miscStore from "../stores/miscStore";

const PageTopBar = () => {
  const { loggedIn, info, setInfo } = miscStore();

  function signOut() {
    user.signOut();
    setInfo(null);
  }

  const loginModal = useModal({
    password: "signupModal",
    modalContent: <SignUpWithEMailModal />,
    offsetY: 10,
    translate: { x: 100, y: 0 },
    position: "bottomLeft",
  });
  return (
    <div className="divRow" style={{ width: "100%", justifyContent: "center" }}>
      <div style={{ flex: 1 }}></div>
      <div className="textBoldWhite" style={{ fontSize: "20px" }}>
        Begleitendes Glossar zur Umschulung zum Fachinformatiker im Bereich
        Anwendungsentwicklung
      </div>
      <div
        onClick={() => {
          console.log("info - ", info);
        }}
        className="divRow"
        style={{ flex: 1, justifyContent: "end", marginRight: "5px" }}
      >
        <div style={{ marginRight: "20px" }}>
          {loginModal.element}
          {!loggedIn && (
            <img
              style={{ alignSelf: "end" }}
              className="icon40"
              src="/images/icons/btn_password_sign_in.png"
              onClick={() => loginModal.open("signupModal")}
            />
          )}
          {loggedIn && (
            <div className="divColumn">
              <div className="textWhite">Logged in as</div>
              <div className="textBoldWhite">{info.username}</div>
              <div
                className="textWhiteSmall"
                style={{ color: "turquoise" }}
                onClick={signOut}
              >
                Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageTopBar;
