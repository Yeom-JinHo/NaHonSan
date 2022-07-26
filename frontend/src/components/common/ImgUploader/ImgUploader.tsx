import React, { useRef, useState } from "react";
import "./ImgUploader.scss";
import ThumDummy from "@images/ThumnailDummy.jpg";
import ImgResizer from "./ImgResizer";

function ImgUploader() {
  const [imgPreview, setImgPreview] = useState<any>("");
  const imgInput = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<any>(null);
  const reader = new FileReader();
  const fileread = () => {
    if (imgInput.current?.files) {
      const file = imgInput.current.files[0];
      console.log(file);
      const canvas = canvasRef.current;
      const newImg = new Image();
      const imgUrl = URL.createObjectURL(file);
      newImg.src = imgUrl;
      newImg.onload = () => {
        const ctx = canvas?.getContext("2d");
        if (ctx && canvas) {
          canvas.width = 540;
          canvas.height = 360;
          // canvas.backgroundColor = "rgb(255, 255, 255)";
          ctx.drawImage(newImg, 0, 0, 540, 360);
          const dataUrl = canvas.toDataURL("image/png");
          setImgPreview(dataUrl);
          const newfile = new File([dataUrl], "새로만든 내 이미지");
          console.log(newfile);
        }
      };
    }
  };

  return (
    <div>
      <div>이미지 업로더 업니다.</div>
      <input type="file" ref={imgInput} onChange={fileread} />
      <ImgResizer />
      <canvas ref={canvasRef}> </canvas>
      <img src={imgPreview} alt="프리뷰" />
    </div>
  );
}

export default ImgUploader;
