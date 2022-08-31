import React, { useState, useEffect } from "react";

const SearchBar = ({
  elRef,
  onSearchFunc,
  showButton,
  onlyTitle,
  setOnlyTitle,
  resetSearchTrigger,
  noSpace,
  maxLength,
  onEnter = () => {},
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (resetSearchTrigger != null) setSearch("");
  }, [resetSearchTrigger]);

  const onInput = (e) => {
    if (
      (noSpace && e.target.value.includes(" ")) ||
      (maxLength && e.target.value.length > maxLength)
    )
      return;
    setSearch(e.target.value);
  };

  useEffect(() => {
    onSearchFunc(search);
  }, [search]);
  return (
    <div className="containerFlexRowDark">
      {showButton && (
        <img
          src={
            onlyTitle
              ? "/images/drawable/icon_title.png"
              : "/images/drawable/icon_title_unselected.png"
          }
          className="icon25"
          style={{ margin: 2 }}
          onClick={() => setOnlyTitle(!onlyTitle)}
        />
      )}
      <input
        ref={elRef}
        onKeyDown={onEnter}
        autoComplete="off"
        className="textBlackCenter"
        value={search}
        placeholder="search"
        onChange={onInput}
      />

      <img src="/images/drawable/icon_search.png" className="icon25" />
    </div>
  );
};

export default SearchBar;
