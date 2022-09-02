import React from "react";

const FilePreview = ({ file, deleteFile, size = 50 }) => {
  const endingObj = {
    docx: "/images/icons/icon_word.png",
    pdf: "/images/icons/icon_pdf.png",
  };

  return (
    <div className="divRow">
      <div className="divRow" style={{ marginRight: "5px" }}>
        {deleteFile && (
          <img
            src="/images/icons/icon_cancel.png"
            className="icon25"
            onClick={() => {
              if (deleteFile) deleteFile(file);
            }}
          />
        )}
      </div>
      <div
        className="divColumn"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <img
          style={{
            objectFit: "contain",
            width: `${size}px`,
            height: `${size}px`,
          }}
          src={endingObj[file.type]}
          onClick={() => {
            window.open(file.url, "_blank", "noopener,noreferrer");
          }}
        />
        <div className="textWhiteSmall">{file.name}</div>
      </div>
    </div>
  );
};

export default FilePreview;
