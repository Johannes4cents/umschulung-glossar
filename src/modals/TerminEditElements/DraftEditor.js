import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const DraftEditor = ({
  openTerm,
  setOpenTerm,
  refEditor,
  editorState,
  setEditorState,
}) => {
  const [oldId, setOld] = useState(null);

  useEffect(() => {
    if (oldId != openTerm.id) {
      setOld(openTerm.id);
      if (openTerm.rawContentState != null) {
        const oldState = convertFromRaw(openTerm.rawContentState);
        const oldContent = EditorState.createWithContent(oldState);
        setEditorState(oldContent);
      } else {
      }
    }
  }, [openTerm]);

  const onEditorStateChange = (editorState) => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    setOpenTerm({ ...openTerm, rawContentState, content: markup });
    setEditorState(editorState);
  };

  return (
    <Editor
      editorStyle={{ maxHeight: "300px" }}
      ref={refEditor}
      editorState={editorState}
      toolbarClassName="draftToolbar"
      wrapperClassName="wrapperClassName"
      editorClassName="draftEditor"
      onEditorStateChange={onEditorStateChange}
    />
  );
};

export default DraftEditor;
