import React, { useState, useEffect, useRef } from "react";
import Editor from "@components/common/s3Uploader/Editor";
import "./TipEdit.scss";
import noimg from "@images/noimg.svg";
import HoneyRecipe from "@images/HoneyRecipe.svg";
import HoneyTem from "@images/HoneyTem.svg";
import HoneyTip from "@images/HoneyTip.svg";
import ImgResizer from "@components/common/ImgUploader/ImgResizer";

function TipEdit() {
  const [sendFile, setSendFile] = useState<File | null>(null);
  const [thumnail, setThumnail] = useState("");
  const [category, setCategory] = useState("recipe");
  const [payload, setPayload] = useState({
    category: "",
    title: "",
    content: "",
    bannerImg: ""
  });
  const imgInput = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const receiveFile = (data: string) => {
    setThumnail(data);
    const incData = data.replace("data:image/jpeg;base64,", "");
    setPayload(cur => {
      const newObj = { ...cur };
      newObj.bannerImg = incData;
      return newObj;
    });
  };
  const clickInput = () => {
    imgInput.current?.click();
  };

  const fileread = () => {
    if (imgInput.current?.files) {
      const file = imgInput.current.files[0];
      if (file) {
        setSendFile(file);
      }
    }
  };

  const receiveValue = (data: string) => {
    setPayload(cur => {
      const newObj = { ...cur };
      newObj.content = data;
      newObj.category = category;
      if (titleRef.current) {
        newObj.title = titleRef.current.value;
      }
      return newObj;
    });
  };

  const changeCategory = (cate: string) => {
    setCategory(cate);
  };

  return (
    <div id="tip-edit">
      <input type="file" accept="image/*" ref={imgInput} onChange={fileread} />
      {sendFile ? (
        <ImgResizer
          imgfile={sendFile}
          newImgfile={receiveFile}
          imgW={300}
          imgH={300}
        />
      ) : null}
      <div className="header ">
        <div className="header-title notoMid flex">
          <p>
            <span>꿀</span>팁<span>쓰</span>기
          </p>
        </div>
        <div className="header-category flex">
          <button
            type="button"
            onClick={() => changeCategory("recipe")}
            className={`notoReg ${category === "recipe" ? "active" : null}`}
          >
            <img src={HoneyRecipe} alt="꿀시피" title="꿀시피" />
            <p className="notoReg">꿀시피</p>
          </button>
          <button
            type="button"
            onClick={() => changeCategory("tip")}
            className={`notoReg ${category === "tip" ? "active" : null}`}
          >
            <img src={HoneyTip} alt="꿀생" title="꿀생" />
            <p className="notoReg">꿀생</p>
          </button>
          <button
            type="button"
            onClick={() => changeCategory("item")}
            className={`notoReg ${category === "item" ? "active" : null}`}
          >
            <img src={HoneyTem} alt="꿀템" title="꿀템" />
            <p className="notoReg">꿀템</p>
          </button>
        </div>
        <div className="header-preview flex justify-center">
          <button
            onClick={clickInput}
            type="button"
            className="header-preview_container flex justify-center align-center"
          >
            <p className="header-preview_container-title notoMid">Thumnail</p>
            {thumnail ? (
              <img src={thumnail} alt="preview" />
            ) : (
              <div className="header-preview_img flex justify-center align-center">
                <img src={noimg} alt="no-img" title="preview" />
              </div>
            )}
          </button>
        </div>
      </div>
      <input
        ref={titleRef}
        className="title"
        type="text"
        placeholder="제목을 입력해 주세요..."
      />
      <Editor editorValue={receiveValue} />
    </div>
  );
}

export default TipEdit;
