import ClickedColorImage from "../../components/ClickedColorImage";
const TermEditBottomBar = ({
  saveTerm,
  openTerm,
  uploadImageBtn,
  linkToOtherTerms,
}) => {
  return (
    <div
      className="divRow"
      style={{ width: "100%", justifyContent: "space-between" }}
    >
      {linkToOtherTerms}
      {uploadImageBtn}
      <ClickedColorImage
        imgUrl={"/images/icons/icon_create.png"}
        size={30}
        itemSelected={
          openTerm.name.length > 1 &&
          openTerm.cats.length > 0 &&
          (openTerm.content ?? "").length > 2
        }
        onClick={saveTerm}
      />
    </div>
  );
};

export default TermEditBottomBar;
