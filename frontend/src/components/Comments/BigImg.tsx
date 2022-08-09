import React from "react";
import X from "@images/X.svg";
import "./BigImg.scss";

interface BiggerImgProps {
  imgProps: string;
  signal: () => void;
}

function BigImg({ imgProps, signal }: BiggerImgProps) {
  return (
    <div id="big-img">
      <div className="big-img flex column">
        <button type="button" onClick={signal}>
          <img src={X} alt="cansle" />
        </button>
        <img
          src={`data:image/jpeg;base64,${imgProps}`}
          alt="img"
          title="comment-img"
        />
      </div>
    </div>
  );
}

export default BigImg;
