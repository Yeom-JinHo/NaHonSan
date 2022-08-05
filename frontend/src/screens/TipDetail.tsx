import React, { useState, useEffect } from "react";
import "./TipDetail.scss";
import { useParams, useNavigate } from "react-router-dom";
import { tipRead, Article, tipDelete } from "@apis/honeyTip";
import UserDummyIcon from "@images/UserDummy.svg";
import EmptyHeart from "@images/ArticleEmptyHeart.svg";
import EditIcon from "@images/EditIcon.svg";
import DeleteIcon from "@images/DeleteIcon.svg";
import { useAppSelector } from "@store/hooks";
import { getTime } from "@utils/getTime";
import Comments from "@components/Comments/Comments";
import CommentInput from "@components/Comments/CommentInput";

function TipDetail() {
  const [newComment, setNewComment] = useState(false);
  const [article, setArticle] = useState<Article>();
  const [comment, setComment] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const UserInfo = useAppSelector(state => state.auth.userInfo);

  const changed = () => {
    setNewComment(cur => !cur);
  };

  useEffect(() => {
    tipRead(id as string)
      .then(res => {
        setArticle(res.tip);
        setComment(res.tipComments);
      })
      .catch(() => navigate("NotFound"));
  }, [newComment]);

  if (!article) {
    return <div />;
  }
  const content = {
    __html: article.content
  };

  const goEdit = () => {
    navigate(`/tip/edit/${id}`, { state: article });
  };

  const deleteArticle = async () => {
    const res = await tipDelete(id as string);
    if (res === "SUCCESS") {
      navigate("/");
    }
    return res;
  };

  const isAuthor = UserInfo?.nickname === article.userNickname;
  return (
    <div id="tip-detail-page">
      <div className="article flex column">
        <p className="title notoMid">{article.title}</p>
        <div className="header flex">
          <div className="header-info flex">
            <div className="header-info__img-container flex">
              <button
                type="button"
                onClick={() => {
                  navigate(`/userfeed/${article.userNickname}`);
                }}
              >
                <img
                  src={
                    article.userProfileImg
                      ? `data:image/jpeg;base64,${article.userProfileImg}`
                      : UserDummyIcon
                  }
                  alt="User"
                  className="profile-user__img"
                  title="User"
                />
              </button>
            </div>
            <div className="header-info__text flex column justify-center">
              <p className="user-name notoMid">{article.userNickname}</p>
              <div className="created flex column align-center">
                <p className=" notoReg">
                  {article.updateTime
                    ? `${getTime(article.updateTime)} (수정됨)`
                    : getTime(article.time)}
                </p>
              </div>
            </div>
            <button
              className={`header-info__btn notoReg ${isAuthor ? "hide" : null}`}
              type="button"
            >
              팔로우
            </button>
          </div>
          <div className="header-func flex">
            {isAuthor ? (
              <div className="header-func-btn flex">
                <button onClick={goEdit} type="button">
                  <img src={EditIcon} alt="edit" title="edit" />
                </button>
                <button onClick={deleteArticle} type="button">
                  <img src={DeleteIcon} alt="del" title="delete" />
                </button>
              </div>
            ) : (
              <button type="button" className="header-func-btn flex">
                <img src={EmptyHeart} alt="like" title="like" />
              </button>
            )}
          </div>
        </div>
        <div className="body flex">
          <div className="body-content " dangerouslySetInnerHTML={content} />
        </div>
        <div className="comment flex column">
          <div className="comment-head">
            <p className="notoMid">
              댓글<span className="">{article.comment}</span>
            </p>
          </div>
          <div className="comment-input flex">
            <div className="input-img-container flex">
              <img
                src={
                  UserInfo?.profileImg
                    ? `data:image/jpeg;base64,${UserInfo.profileImg}`
                    : UserDummyIcon
                }
                alt="dum"
                title="user-icon"
              />
            </div>
            <CommentInput changed={changed} articleIdx={id as string} />
          </div>
          {comment ? (
            <Comments
              postIdx={id as string}
              changed={changed}
              type="tip"
              comments={comment}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TipDetail;
