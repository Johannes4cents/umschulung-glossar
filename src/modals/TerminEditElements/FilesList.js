import React from "react";
import FilePreview from "./FilePreview";

const FilesList = ({ openTerm, setOpenTerm }) => {
  const deleteFile = (file) => {
    setOpenTerm({
      ...openTerm,
      files: openTerm.files.filter((f) => f != file),
    });
  };

  return (
    <div className="divColumn" style={{ height: "35%", overflow: "auto" }}>
      <div className="textBoldWhite">Files</div>
      <div className="divColumn" style={{ overflow: "auto" }}>
        {(openTerm.files ?? []).map((file) => (
          <FilePreview key={file.url} file={file} deleteFile={deleteFile} />
        ))}
      </div>
    </div>
  );
};

export default FilesList;
