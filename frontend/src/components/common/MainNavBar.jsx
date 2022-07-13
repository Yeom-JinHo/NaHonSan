import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import HeaderLogoImg from "@images/HeaderLogo.svg";
import "./MainNavBar.scss";
import AlarmIcon from "@images/Alarm.svg";
import MsgIcon from "@images/Msg.svg";
import UserDummyIcon from "@images/UserDummy.svg";
import MenuIcon from "@images/Menu.svg";

function MainNavBar() {
  const [isLogin, setIsLogin] = useState(true);
  const activeTabClassName = active => {
    const prefix = "left-nav__link fs-20 btn--";
    return active ? `${prefix}active` : `${prefix}unactive`;
  };
  return (
    <nav id="MainNavBar" className="flex align-center">
      <img className="logo" alt="나혼자잘산다로고" src={HeaderLogoImg} />
      <p className="title notoBold fs-32 desktopOnly">나혼자잘산다</p>
      <div className="nav-container flex justify-space-between align-center">
        <nav className="left-nav notoBold">
          <NavLink
            className={({ isActive }) => activeTabClassName(isActive)}
            to="/"
          >
            홈
          </NavLink>
          <NavLink
            className={({ isActive }) => activeTabClassName(isActive)}
            to="/tip"
          >
            꿀팁보기
          </NavLink>
          <NavLink
            className={({ isActive }) => activeTabClassName(isActive)}
            to="/feed"
          >
            피드보기
          </NavLink>
          <NavLink
            className={({ isActive }) => activeTabClassName(isActive)}
            to="/deal"
          >
            꿀딜보기
          </NavLink>
        </nav>
        <nav className="right-nav notoReg flex align-center">
          {isLogin ? (
            <>
              <Link className="right-nav__link fs-16" to="/letters">
                <img className="msg" src={MsgIcon} alt="쪽지함" />
              </Link>
              <Link className="right-nav__link fs-16" to="/">
                <img className="alarm" src={AlarmIcon} alt="알림" />
              </Link>
              <Link className="right-nav__link fs-16" to="/">
                <img className="user" src={UserDummyIcon} alt="더미유저" />
              </Link>
            </>
          ) : (
            <>
              <Link className="right-nav__link fs-16" to="/login">
                로그인
              </Link>
              <Link className="right-nav__link fs-16" to="/join">
                회원가입
              </Link>
            </>
          )}
        </nav>
        <img className="phoneOnly menu-icon" src={MenuIcon} alt="더보기" />
      </div>
    </nav>
  );
}

export default MainNavBar;
