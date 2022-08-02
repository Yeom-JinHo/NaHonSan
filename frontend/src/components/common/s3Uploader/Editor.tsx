import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { dataurlToBlob } from "@utils/resizer";
import { v1 } from "uuid";
import { deleteFile, uploadFile } from "./awsS3";
import "./Editor.scss";

interface Editor {
  editorValue: (value: string) => void;
  getValue: boolean;
}

function Editor({ editorValue, getValue }: Editor) {
  const [value, setValue] = useState("");
  const [tmpImg, setTmpImg] = useState([""]);

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
    // 에디터 이미지 첨부 시 커스텀 이미지핸들러 실행
    const handleImage = () => {
      // 인풋 만들어서 업로드
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.onchange = async () => {
        if (input.files) {
          const quill = quillRef.current;
          const range = quill.getEditor().getSelection(true);
          const file = input.files[0];
          const newImg = new Image();
          const imgUrl = URL.createObjectURL(file);
          newImg.src = imgUrl;

          // 캔버스에 그리면서 리사이징, 컴포넌트로 사용하던거랑 조금 달라서 따로 구현
          const canvas = document.createElement("canvas");
          newImg.onload = async () => {
            const ctx = canvas.getContext("2d");
            canvas.width = 300;
            canvas.height = 300;
            ctx?.drawImage(newImg, 0, 0, 300, 300);
            const dataUrl = canvas.toDataURL("image/jpeg");

            // 캔버스로 그리면 dataurl 생성, 생성 된 dataurl > Blob > File 순으로 변경
            const newFile = new File([dataurlToBlob(dataUrl)], v1());
            console.log(newFile);
            const url = await uploadFile(newFile);
            setTmpImg(cur => [...cur, url]);
            quill.getEditor().insertEmbed(range.index, "image", url);
            quill.getEditor().setSelection(range.index + 1);
          };
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

  if (getValue) {
    tmpImg.shift();
    tmpImg.forEach(async item => {
      if (!value.includes(item)) {
        await deleteFile(item);
      }
    });
    editorValue(value);
  }

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
    </div>
  );
}

export default Editor;
