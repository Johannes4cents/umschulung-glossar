import React from "react";
import useOnHover from "../modals/useOnHover";

const SignOutButton = ({ signOut }) => {
  const hover = useOnHover({ item: "", unselectedTextColor: "turquoise" });
  return (
    <div
      {...hover.divProps}
      className="textWhiteSmall"
      style={{ color: hover.textColor }}
      onClick={signOut}
    >
      Sign Out
    </div>
  );
};

export default SignOutButton;
