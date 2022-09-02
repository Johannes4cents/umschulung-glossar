import { getDownloadURL, ref } from "firebase/storage";
import React, { useRef } from "react";
import { storage } from "../../firebase/fireInit";
import {
  setDocInFirestore,
  uploadImageToStorage,
} from "../../misc/handleFirestore";

const UploadPdf = ({
  loadingImage,
  openTerm,
  setLoadingImage,
  setOpenTerm,
}) => {
  const refPdfInput = useRef(null);

  function onFileUploaded(url, name, type) {
    console.log("url-", url);
    const newTerm = {
      ...openTerm,
      files: [...(openTerm.files ?? []), { url, name, type }],
    };
    setOpenTerm((state) => {
      return newTerm;
    });
    setLoadingImage(false);
  }

  function addPdfToTerm(file) {
    console.log("file - ", file);
    setLoadingImage(true);
    const name = file.name;
    const typeArray = file.name.split(".");
    const type = typeArray[typeArray.length - 1];
    uploadImageToStorage("termFiles", file, (path) => {
      getDownloadURL(ref(storage, path)).then((url) => {
        console.log("url - ", url);
        onFileUploaded(url, name, type);
      });
    });
  }

  const onFileChange = (e) => {
    let file = e.target.files[0];
    addPdfToTerm(file);
  };
  return (
    <div>
      {!loadingImage && (
        <div
          className="divColumn"
          style={{ position: "relative" }}
          onClick={() => {
            refPdfInput.current.click();
          }}
        >
          <img src={"/images/icons/icon_pdf_word.png"} className="icon25" />
          <input
            onChange={(e) => onFileChange(e, "pdf")}
            type={"file"}
            ref={refPdfInput}
            style={{ display: "none" }}
            accept=".xlsx,.xls,.doc,.docx,.ppt, .pptx,.txt,.pdf"
          />
          <div className="textWhiteSmall">Click to select File</div>
        </div>
      )}
    </div>
  );
};

export default UploadPdf;
