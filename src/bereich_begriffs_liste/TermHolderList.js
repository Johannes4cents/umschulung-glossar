import React from "react";
import CheckBox from "../components/CheckBox";

const TermHolderList = ({
  term,
  onTermClicked,
  selectedFilter = false,
  index,
}) => {
  return (
    <div
      className="divRow"
      style={{
        width: "95%",
        backgroundColor: index % 2 == 0 ? "#4f4f4f" : "#5f5f5f",
        padding: "2px",
      }}
      onClick={() => {
        onTermClicked(term);
      }}
    >
      <img className="icon20" src="/images/icons/icon_begriff.png" />
      <CheckBox item={true} otherItem={selectedFilter} />
      <div className="textBoldWhite" style={{ flex: 1, textAlign: "center" }}>
        {term.name}
      </div>
    </div>
  );
};

export default TermHolderList;
