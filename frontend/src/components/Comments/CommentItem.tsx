import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CommentItem.scss";
import UserDummyIcon from "@images/UserDummy.svg";
import KaKao from "@images/kakao_map.png";
import X from "@images/X.svg";
import { commentDelete } from "@apis/comment";
import { getTime } from "@utils/getTime";
import { commentType } from "./Comments";
import CommentEdit from "./CommentEdit";

interface CommentProps {
  info: commentType;
  type: string;
  isAuthor: boolean;
  changed: () => void;
  postIdx: string;
}

function CommentItem({ info, type, isAuthor, changed, postIdx }: CommentProps) {
  const [editInput, setEditInput] = useState(false);
  const navigate = useNavigate();

  const goFeed = () => {
    navigate(`/userfeed/${info.userNickname}`);
  };

  const deleteComment = async () => {
    await commentDelete(info.idx);
    changed();
  };

  const editComment = () => {
    setEditInput(true);
  };

  const closeEdit = () => {
    setEditInput(false);
  };

  return (
    <div id="comment-item">
      <div className="wrapper flex column align-center">
        <div className="head flex">
          <div className="head-profile flex align-center">
            <button
              type="button"
              className="head-profile_img flex justify-center"
              onClick={goFeed}
            >
              <img
                src={
                  info.userProfileImg
                    ? `data:image/jpeg;base64,${info.userProfileImg}`
                    : UserDummyIcon
                }
                alt="user"
              />
            </button>
            <div className="head-profile_info">
              <Link to={`/userfeed/${info?.userNickname}`} className="notoReg">
                {info?.userNickname}
              </Link>
              <p className="notoReg">
                {info?.updateTime
                  ? `${getTime(info?.updateTime)} (수정됨)`
                  : getTime(info?.time)}
              </p>
            </div>
          </div>
          {type === "deal" && (
            <button type="button" className="head-map flex justify-end">
              <img src={KaKao} alt="" />
            </button>
          )}
        </div>
        <div className="body flex">
          {info.bannerImg && (
            <div className="img-container flex jusify-center">
              <img
                src={`data:image/jpeg;base64,${info.bannerImg}`}
                alt="user"
                title="user"
              />
            </div>
          )}
          <div className="body-content flex column">
            <p className="body-content_text notoReg">{info?.content}</p>

            {isAuthor ? (
              <div className="body-content_btn flex">
                <button onClick={editComment} type="button" className="notoReg">
                  수정
                </button>
                <button
                  onClick={deleteComment}
                  type="button"
                  className="notoReg"
                >
                  삭제
                </button>
              </div>
            ) : (
              <div className="body-content_btn flex">
                <button onClick={editComment} type="button" className="notoReg">
                  댓글달기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {editInput && (
        <div className="edit-input flex">
          <CommentEdit
            signal={closeEdit}
            commentInfo={info}
            changed={changed}
            postIdx={postIdx}
            isAuthor={isAuthor}
          />
          <button
            onClick={() => {
              setEditInput(false);
            }}
            type="button"
            className="flex align-center"
          >
            <img src={X} alt="close" />
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentItem;
