import ClickedColorImage from "../../components/ClickedColorImage";
import UploadPdf from "./UploadPdf";
const TermEditBottomBar = ({
  saveTerm,
  openTerm,
  uploadImageBtn,
  linkToOtherTerms,
  loadingImage,
  setLoadingImage,
  setOpenTerm,
}) => {
  return (
    <div
      className="divRow"
      style={{ width: "100%", justifyContent: "space-between" }}
    >
      {linkToOtherTerms}
      {uploadImageBtn}
      <UploadPdf
        loadingImage={loadingImage}
        setLoadingImage={setLoadingImage}
        openTerm={openTerm}
        setOpenTerm={setOpenTerm}
      />
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
