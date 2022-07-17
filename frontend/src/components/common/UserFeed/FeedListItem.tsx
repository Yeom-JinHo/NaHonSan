import React, { useState } from "react";
import "./FeedListItem.scss";
import ThumDummy from "@images/ThumnailDummy.jpg";
import HeartIcon from "@images/HeartSkelton.svg";
import ViewIcon from "@images/ViewSkelton.svg";
import CommentIcon from "@images/CommentSkelton.svg";

function FeedListItem() {
  const [hideInfo, setHideInfo] = useState(true);
  const hide = () => {
    if (hideInfo) {
      setHideInfo(false);
    } else {
      setHideInfo(true);
    }
  };
  return (
    <div id="feed-item" className="item flex column">
      <div className="img-container" onMouseEnter={hide} onMouseLeave={hide}>
        {hideInfo ? null : (
          <div className="feed-info">
            <p className="flex align-center notoReg fs-16">
              <img src={HeartIcon} alt="heart" />
              123.4K
            </p>
            <p className="flex align-center notoReg fs-16">
              <img src={CommentIcon} alt="heart" />
              1232
            </p>
            <p className="flex align-center notoReg fs-16">
              <img src={ViewIcon} alt="heart" />
              123.4K
            </p>
          </div>
        )}
        <img className="item__img" src={ThumDummy} alt="Dum" />
        <p className="item__title notoBold fs-14 ellipsis">
          이건 게시글의 제목입니돱
        </p>
      </div>
    </div>
  );
}

export default FeedListItem;
