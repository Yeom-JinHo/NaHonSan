import React from "react";
import "./FollowList.scss";
import SearchIcon from "@images/Search.svg";

interface myProps {
  signal: () => void;
}

function FollowList({ signal }: myProps) {
  return (
    <div id="follow-list">
      <div className="list-header flex">
        <p className="list-header__title notoBold flex justify-center">
          Follower<span>(123)</span>
        </p>
        <div className="list-header__input-box">
          <img src={SearchIcon} alt="Search" />
          <input placeholder="검색" type="text" />
        </div>
      </div>
      <div className="list-body"> </div>
      <div className="list-footer notoBold flex">
        <button onClick={signal} type="button">
          닫기
        </button>
      </div>
    </div>
  );
}

export default FollowList;
