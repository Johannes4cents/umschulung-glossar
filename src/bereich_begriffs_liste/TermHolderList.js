import React, { useEffect } from "react";
import CheckBox from "../components/CheckBox";
import { getItemById } from "../misc/helperFuncs";
import { catList } from "../misc/lists";
import useOnHover from "../modals/useOnHover";

const TermHolderList = ({
  inclusionList,
  selectedTerm,
  term,
  onTermClicked,
  index,
}) => {
  const hover = useOnHover({
    item: term.id,
    active: selectedTerm ? selectedTerm.id : null,
    inclusionList: inclusionList ?? null,
  });

  return (
    <div
      {...hover.divProps}
      className="divRow"
      style={{
        width: "95%",
        backgroundColor: index % 2 == 0 ? "#374d37" : "#496349",
        padding: "2px",
      }}
      onClick={() => {
        onTermClicked(term);
      }}
    >
      <img
        className="icon20"
        src={
          inclusionList
            ? "/images/icons/icon_link.png"
            : "/images/icons/icon_begriff.png"
        }
        style={{ marginRight: "5px" }}
      />
      <CheckBox
        item={term.id}
        otherItem={selectedTerm ? selectedTerm.id : null}
        includeList={inclusionList ?? null}
      />
      <div
        className="textBoldWhite"
        style={{ flex: 1, textAlign: "center", color: hover.textColor }}
      >
        {term.name}
      </div>
      {(term.questions ?? []).length > 0 && (
        <div
          className="divRow"
          style={{ marginLeft: "2px", marginRight: "10px" }}
        >
          <div className="textSmallWhite" style={{ color: "turquoise" }}>
            {term.questions.length}
          </div>
          <img src="/images/icons/icon_question.png" className="icon15" />
        </div>
      )}
      <div className="divColumn">
        <div className="textWhiteSmall" style={{ color: "gray" }}>
          Kategorien
        </div>
        <div className="divRow">
          {term.cats
            .map((cId) => getItemById(cId, catList))
            .map((cat) => (
              <img
                key={cat.imgUrl}
                className="icon20"
                src={cat.imgUrl}
                style={{ marginRight: "4px" }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TermHolderList;
