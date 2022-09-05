import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useModal from "../../hooks/useModal";
import { getItemById } from "../../misc/helperFuncs";
import { catList } from "../../misc/lists";
import useOnHover from "../../modals/useOnHover";
import LinkDetailedModal from "./LinkDetailedModal";

const LinksHolder = ({ link }) => {
  const hover = useOnHover({ item: link });
  const [fullCats, setFullCats] = useState([]);
  const modal = useModal({
    translate: { x: 0, y: 0 },
    password: `open${link.url}`,
    modalContent: <LinkDetailedModal link={link} />,
  });

  useEffect(() => {
    setFullCats(link.cats.map((id) => getItemById(id, catList)));
  }, [link]);
  return (
    <div
      {...hover.divProps}
      className="divRow"
      style={{
        width: "100%",
        marginBottom: "3px",
        paddingBottoM: "3px",
        borderBottom: "1px dotted grey",
      }}
    >
      <img src="Images/icons/icon_web_link.png" className="icon20" />
      <div
        className="textWhite"
        onClick={() => {
          modal.open(`open${link.url}`);
        }}
        style={{ flex: 1, textAlign: "center", color: hover.textColor }}
      >
        {link.searchTerms[0]}
      </div>
      <div className="divRow">
        {fullCats.map((c) => (
          <img
            key={c.imgUrl}
            className="icon20"
            src={c.imgUrl}
            style={{ marginRight: "2px" }}
          />
        ))}
      </div>
      {modal.element}
    </div>
  );
};

export default LinksHolder;
