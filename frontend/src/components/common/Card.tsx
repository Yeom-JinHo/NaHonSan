import React, { useEffect, useState } from "react";
import "./Card.scss";
import UserDummyIcon from "@images/UserDummy.svg";
import ThumDummy from "@images/ThumnailDummy.jpg";
import HeartIcon from "@images/HeartSkelton.svg";
import ViewIcon from "@images/ViewSkelton.svg";
import CommentIcon from "@images/CommentSkelton.svg";
import getCounts from "@utils/getCounts";
import TipIcon from "@images/Tip.svg";
import DealIcon from "@images/Deal.svg";
import { getDummyImg } from "@apis/dummy";

export type CardProps = {
  type: "tip" | "deal";
  idx: number;
  userNickname: string;
  userProfileImg: string | null;
  title: string;
  bannerImg: string | null;
  like: number;
  comment: number;
  view: number;
};

function Card({
  type,
  idx,
  userNickname,
  userProfileImg,
  title,
  bannerImg,
  like,
  comment,
  view
}: CardProps) {
  return (
    <div id="card">
      <header className="card-header flex align-center">
        <img
          className="card-header__user-img"
          src={
            userProfileImg
              ? `data:image/jpeg;base64,${userProfileImg}`
              : UserDummyIcon
          }
          alt="유저더미"
        />
        <p className="card-header__user-name notoBold fs-14">{userNickname}</p>
      </header>
      <main className="card-main flex column">
        <div className="img-container">
          <img
            className="card-main__thumnail"
            src={bannerImg ? `data:image/jpeg;base64,${bannerImg}` : ThumDummy}
            alt="썸네일더미"
          />
        </div>

        <div className="card-label">
          <div
            className={
              type === "tip"
                ? "card-label__top--tip  flex align-center justify-center"
                : "card-label__top--deal flex align-center justify-center"
            }
          >
            <img
              className="card-label__img"
              src={type === "tip" ? TipIcon : DealIcon}
              alt="꿀팁"
            />
            <p className="card-label__title notoMid fs-12">
              {type === "tip" ? "꿀팁" : "꿀딜"}
            </p>
          </div>
          <div className="card-label__bottom" />
        </div>

        <p className="card-main__title notoBold fs-14 ellipsis">{title}</p>
      </main>
      <footer className="card-footer flex align-center justify-center">
        <div className="icon-container flex align-center">
          <img
            className="icon-container__icon"
            src={HeartIcon}
            alt="좋아요수"
          />
          <p className="icon-container__cnt notoReg fs-15">{getCounts(like)}</p>
        </div>
        <div className="icon-container flex align-center">
          <img
            className="icon-container__icon"
            src={CommentIcon}
            alt="댓글수"
          />
          <p className="icon-container__cnt notoReg fs-15">
            {getCounts(comment)}
          </p>
        </div>
        <div className="icon-container flex align-center">
          <img className="icon-container__icon" src={ViewIcon} alt="조회수" />
          <p className="icon-container__cnt notoReg fs-15">{getCounts(view)}</p>
        </div>
      </footer>
    </div>
  );
}

export default Card;
