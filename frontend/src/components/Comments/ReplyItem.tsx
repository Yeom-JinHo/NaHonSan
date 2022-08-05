import React, { useState } from "react";
import "./ReplyItem.scss";
import ReplyArrow from "@images/ReplyCommentArrow.svg";
import UserDummyIcon from "@images/UserDummy.svg";
import KaKao from "@images/kakao_map.png";
import { commentDelete } from "@apis/comment";
import { getTime } from "@utils/getTime";
import X from "@images/X.svg";
import { commentType } from "./Comments";
import CommentEdit from "./CommentEdit";

interface ReplyProps {
  info: commentType;
  type: string;
  isAuthor: boolean;
  changed: () => void;
  postIdx: string;
}

function ReplyItem({ info, type, isAuthor, changed, postIdx }: ReplyProps) {
  const [replyEdit, setReplyEdit] = useState(false);

  const deleteComment = async () => {
    await commentDelete(info.idx);
    changed();
  };

  const openEdit = () => {
    setReplyEdit(true);
  };

  const closeEdit = () => {
    setReplyEdit(false);
  };

  return (
    <div id="reply-item">
      <div className="reply-item flex column">
        <div className="flex">
          <div className="arrow flex justify-center">
            <img src={ReplyArrow} alt="arrow" />
          </div>
          <div className="wrapper flex column align-center">
            <div className="head flex">
              <div className="head-profile flex align-center">
                <button
                  type="button"
                  className="head-profile_img flex justify-center"
                >
                  <img
                    src={
                      info.userProfileImg
                        ? `data:image/jpeg;base64,${info.userProfileImg}`
                        : UserDummyIcon
                    }
                    alt=""
                  />
                </button>
                <div className="head-profile_info">
                  <p className="notoReg">{info?.userNickname}</p>
                  <p className="notoReg">
                    {info?.updateTime
                      ? `${getTime(info?.updateTime)} (수정됨)`
                      : getTime(info?.time)}
                  </p>
                </div>
              </div>
              {type === "deal" ? (
                <button type="button" className="head-map flex justify-end">
                  <img src={KaKao} alt="" />
                </button>
              ) : null}
            </div>
            <div className="body flex">
              {info.bannerImg ? (
                <div className="img-container flex jusify-center">
                  <img
                    src={`data:image/jpeg;base64,${info.bannerImg}`}
                    alt="user"
                    title="user"
                  />
                </div>
              ) : null}

              <div className="body-content flex column">
                <p className="body-content_text notoReg">{info?.content}</p>
                {isAuthor ? (
                  <div className="body-content_btn flex">
                    <button
                      type="button"
                      className="notoReg"
                      onClick={openEdit}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      className="notoReg"
                      onClick={deleteComment}
                    >
                      삭제
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {replyEdit ? (
          <div className="edit-input flex">
            <div className="empty-space" />
            <CommentEdit
              commentInfo={info}
              signal={closeEdit}
              changed={changed}
              postIdx={postIdx}
              isAuthor={isAuthor}
            />
            <button
              onClick={() => {
                setReplyEdit(false);
              }}
              type="button"
              className="flex justify-end align-center"
            >
              <img src={X} alt="close" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ReplyItem;
