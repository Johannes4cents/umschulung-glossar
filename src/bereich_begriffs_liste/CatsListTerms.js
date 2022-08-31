import React from "react";
import CheckBox from "../components/CheckBox";
import ClickedColorImage from "../components/ClickedColorImage";
import { addRemoveItem } from "../misc/helperFuncs";
import { catList } from "../misc/lists";

const CatsListTerms = ({ selectedCats, setSelectedCats }) => {
  function onCatClicked(cat) {
    console.log("selectedCats - ", selectedCats);
    addRemoveItem(cat.id, selectedCats, setSelectedCats);
  }

  return (
    <div className="divRow" style={{ marginBottom: "5px" }}>
      <SelectAllBox
        selectedCats={selectedCats}
        setSelectedCats={setSelectedCats}
      />
      <div className="divRow" style={{ flexWrap: "wrap" }}>
        {catList.map((c) => (
          <CatBox
            cat={c}
            key={c.id}
            selectedCats={selectedCats}
            onClicked={onCatClicked}
          />
        ))}
      </div>
    </div>
  );
};

const CatBox = ({ cat, onClicked, selectedCats }) => {
  return (
    <div
      onClick={() => {
        onClicked(cat);
      }}
      className="divRow"
      style={{ marginRight: "2px" }}
    >
      <CheckBox item={cat.id} includeList={selectedCats} />{" "}
      <div className="textWhite">{cat.name}</div>
      <ClickedColorImage
        imgUrl={cat.imgUrl}
        size="20"
        itemSelected={selectedCats.includes(cat.id)}
      />
    </div>
  );
};

const SelectAllBox = ({ selectedCats, setSelectedCats }) => {
  function clickAll() {
    if (selectedCats.length == catList.length) setSelectedCats([]);
    else setSelectedCats(catList.map((c) => c.id));
  }
  return (
    <div
      onClick={clickAll}
      className="divRow"
      style={{
        marginRight: "5px",
        border: "1px solid gray",
        padding: "2px",
        borderRadius: "0.5rem/0.2rem",
      }}
    >
      <img
        src={
          selectedCats.length == catList.length
            ? "/images/drawable/checked_box.png"
            : "/images/drawable/checkbox_unchecked.png"
        }
        className={"icon20"}
      />
      <div
        className="textWhite"
        style={{
          color: selectedCats.length == catList.length ? "gray" : "green",
          fontWeight: "bold",
        }}
      >
        All
      </div>
    </div>
  );
};

export default CatsListTerms;
