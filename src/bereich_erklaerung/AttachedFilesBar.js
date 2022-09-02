import React from "react";
import FilePreview from "../modals/TerminEditElements/FilePreview";

const AttachedFilesBar = ({ selectedTerm }) => {
  return (
    <div
      className="divColumn"
      style={{ width: "50%", justifyContent: "center" }}
    >
      <div className="textBoldWhite" style={{ marginBottom: "5px" }}>
        Attached Files
      </div>
      <div className="divRow" style={{ overflow: "auto" }}>
        {(selectedTerm.files ?? []).map((f) => (
          <FilePreview file={f} key={f.url} size={30} />
        ))}
      </div>
    </div>
  );
};

export default AttachedFilesBar;
