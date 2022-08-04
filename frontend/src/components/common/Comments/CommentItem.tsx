import React from "react";
import "./CommentItem.scss";
import UserDummyIcon from "@images/UserDummy.svg";

function CommentItem() {
  const flag = true;

  return (
    <div id="comment-item">
      <div className="wrapper flex column align-center">
        <div className="head flex">
          <div className="head-profile flex jusify-start align-center">
            <button type="button" className="head-profile_img">
              <img src={UserDummyIcon} alt="" />
            </button>
            <div className="head-profile_info">
              <p className="notoReg">username</p>
              <p className="notoReg">52년 전</p>
            </div>
          </div>
        </div>
        <div className="body">
          <div className="content flex">
            <div className="content_img">
              {flag ? (
                <img src={UserDummyIcon} alt="user" title="user" />
              ) : null}
            </div>
            <div className="content_text"> 안녕하쉰가</div>
          </div>
        </div>
        <div className="footer flex justify-start">
          <button type="button" className="notoReg">
            댓글 달기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
