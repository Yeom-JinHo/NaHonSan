import React from "react";
import "./News.scss";
import ImgIcon from "@images/ImgIcon.svg";

function News() {
  return (
    <div id="news">
      <div className="item flex">
        <div className="item__img">
          <img src={ImgIcon} alt="thumnail" />
        </div>
        <div className="item__content">
          <div className="item__content__head flex justify-space-between">
            <div className="item__content__head__title fs-24">title</div>
            <div className="item__content__head__date fs-24">date</div>
          </div>
          <div className="item__content__description column fs-20">
            content description
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default News;
