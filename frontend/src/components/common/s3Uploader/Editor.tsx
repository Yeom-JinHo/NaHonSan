import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { deleteFile, uploadFile } from "./awsS3";
import "./Editor.scss";

interface Editor {
  editorValue: any;
}

function Editor({ editorValue }: Editor) {
  const [value, setValue] = useState("");
  const [tmpImg, setTmpImg] = useState([""]);
  const [preview, setPreview] = useState({
    __html: ""
  });
  const quillRef = useRef<any>(null);
  const toolbarOptions = [
    ["image"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }]
  ];
  const modules = {
    toolbar: {
      container: toolbarOptions
    }
  };

  useEffect(() => {
    const handleImage = () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.onchange = async () => {
        if (input.files) {
          const quill = quillRef.current;
          const range = quill.getEditor().getSelection(true);
          const file = input.files[0];
          const url = await uploadFile(file);
          setTmpImg(cur => [...cur, url]);
          quill.getEditor().insertEmbed(range.index, "image", url);
          quill.getEditor().setSelection(range.index + 1);
        }
      };
    };

    if (quillRef.current) {
      const toolbar = quillRef.current.getEditor().getModule("toolbar");
      toolbar.addHandler("image", handleImage);
    }
  }, []);

  const formats = [
    "header",
    "align",
    "list",
    "bullet",
    "indent",
    "background",
    "color",
    "image",
    "width"
  ];

  const send = () => {
    tmpImg.shift();
    tmpImg.forEach(async item => {
      if (!value.includes(item)) {
        await deleteFile(item);
      }
    });
    editorValue(value);
    setPreview({
      __html: value
    });
  };

  return (
    <div id="editor">
      <div className="editor">
        <ReactQuill
          theme="snow"
          value={value}
          modules={modules}
          formats={formats}
          ref={quillRef}
          onChange={setValue}
        />
      </div>
      <button type="button" onClick={send} className="send">
        Send
      </button>
      {preview ? <div dangerouslySetInnerHTML={preview} /> : null}
    </div>
  );
}

export default Editor;
