import React from "react";

const SimpleTermHolder = ({ term, onTermClicked, deleteTerm }) => {
  return (
    <div className="divRow" style={{ width: "100%", marginBottom: "5px" }}>
      {deleteTerm && (
        <img
          onClick={() => {
            deleteTerm(term);
          }}
          src="/images/icons/icon_cancel.png"
          className="icon20"
          style={{ marginRight: "5px", marginLeft: "3px" }}
        />
      )}

      <div
        onClick={() => {
          onTermClicked(term);
        }}
        className="textWhite"
        style={{ flex: 1, textAlign: "center", color: "lightblue" }}
      >
        {term.name}
      </div>
      <img
        src="/images/icons/icon_link.png"
        className="icon20"
        onClick={() => {
          onTermClicked(term);
        }}
      />
    </div>
  );
};

export default SimpleTermHolder;
