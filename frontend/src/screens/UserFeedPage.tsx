import React, { useState } from "react";
import "./UserFeedPage.scss";
import ThumDummy from "@images/ThumnailDummy.jpg";
import UserDummyIcon from "@images/UserDummy.svg";
import SetIcon from "@images/SetIcon.svg";
import FeedList from "@components/common/UserFeed/FeedList";
import FollowList from "@components/common/UserFeed/FollowList";

function UserFeedPage() {
  const [tagSwitch, setTagSwitch] = useState(true);
  const [followClick, setFollowClick] = useState(false);
  const tagChange = (str: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (str === "tip") {
      setTagSwitch(false);
    } else {
      setTagSwitch(true);
    }
  };
  const follow = () => {
    setFollowClick(true);
  };
  const signal = () => {
    setFollowClick(false);
  };

  return (
    <div id="userfeed-page">
      <div className="profile">
        <div className="profile-background flex column">
          <img src={ThumDummy} alt="Thum" className="profile-background__img" />
        </div>
        <div className="profile-user">
          <img src={UserDummyIcon} alt="User" className="profile-user__img" />
        </div>
      </div>
      <div className="info">
        <div className="info__nickname">
          <p>UserName</p>
          <img src={SetIcon} alt="set" />
        </div>
        <div className="info__follow flex">
          <button type="button" onClick={follow}>
            팔로워<span>123.K</span>
          </button>
          <button type="button" onClick={follow}>
            팔로잉<span>123.K</span>
          </button>
        </div>
        <div className="info__btn flex">
          <button type="button">팔로우</button>
          <button type="button">DM</button>
        </div>
        <div className="info__state">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
            eos mollitia qui dolores sed facilis quidem voluptate
          </p>
        </div>
      </div>
      <div className="feed">
        <div className="feed-tag flex">
          <button
            onClick={e => {
              tagChange("tip", e);
            }}
            className={`notoBold ${tagSwitch ? null : "active"}`}
            type="button"
          >
            꿀팁보기<span>(123)</span>
          </button>
          <button
            onClick={e => {
              tagChange("deal", e);
            }}
            className={`notoBold ${!tagSwitch ? null : "active"}`}
            type="button"
          >
            꿀딜보기<span>(123)</span>
          </button>
        </div>
        <FeedList />
      </div>
      {followClick ? <FollowList signal={signal} /> : null}
    </div>
  );
}

export default UserFeedPage;
