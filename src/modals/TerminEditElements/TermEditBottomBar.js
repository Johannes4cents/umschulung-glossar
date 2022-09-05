import NewLinkModal from "../../bereich_begriffs_liste/nuetzlicheLinks/NewLinkModal";
import ClickedColorImage from "../../components/ClickedColorImage";
import HoverImage from "../../components/HoverImage";
import useModal from "../../hooks/useModal";
import { addRemoveItem } from "../../misc/helperFuncs";
import miscStore from "../../stores/miscStore";
import UploadPdf from "./UploadPdf";
const TermEditBottomBar = ({
  displayedLinks,
  setDisplayedLinks,
  links,
  saveTerm,
  openTerm,
  uploadImageBtn,
  linkToOtherTerms,
  loadingImage,
  setLoadingImage,
  setOpenTerm,
  terms,
  onLinkClicked,
}) => {
  const { closeModal } = miscStore;
  const modal = useModal({
    password: "openNewLink",
    modalContent: (
      <NewLinkModal
        term={openTerm}
        terms={terms}
        fromEditTerm={true}
        displayedLinks={displayedLinks}
        setDisplayedLinks={setDisplayedLinks}
        links={links}
        onLinkClicked={onLinkClicked}
      />
    ),
  });
  return (
    <div
      className="divRow"
      style={{ width: "100%", justifyContent: "space-between" }}
    >
      {linkToOtherTerms}
      <div className="divColumn">
        <HoverImage
          onClick={() => {
            modal.open("openNewLink");
          }}
          imgUrl={"images/icons/icon_link_new.png"}
          description={"Neuen Link hinzufügen"}
        />
        <div className="textWhiteSmall">+ Externen Link</div>
        {modal.element}
      </div>

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
