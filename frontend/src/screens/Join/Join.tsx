import React, { useState, useRef } from "react";
import "./Join.scss";
import KakaoIcon from "@images/Kakao.svg";
import GoogleIcon from "@images/Google.svg";
import NaverIcon from "@images/Naver.svg";
import { Link, useNavigate } from "react-router-dom";
import { emailReg } from "@constants/reg";
import { chkEmailExist, sendAuthCode } from "@apis/join";
import { useDispatch } from "react-redux";
import { setUserId } from "@store/ducks/auth/authSlice";

function Join() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const chkValidate = async () => {
    if (errMsg !== "") {
      inputRef.current?.focus();
      return;
    }
    if (inputRef.current) {
      if (inputRef.current?.value === "") {
        inputRef.current?.focus();
        setErrMsg("이메일을 입력해주세요.");
        return;
      }
      const userId = inputRef.current?.value;
      const res = await chkEmailExist(userId);
      if (res === "JOINED") {
        setErrMsg("이미 존재하는 아이디입니다.");
      } else if (res === "SUCCESS") {
        dispatch(setUserId({ userId }));
        sendAuthCode(userId);
        navigate("chkEmail");
      }
    }
  };

  const chkEmailReg = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      chkValidate();
      return;
    }
    if (emailReg.test(e.target.value)) {
      setErrMsg("");
    } else {
      setErrMsg("이메일 형식을 확인해주세요.");
    }
  };
  return (
    <div className="wrapper">
      <div id="join">
        <header className="header">
          <p className="header__title notoBold fs-24">
            환영합니다! <br />
            나혼자 잘살아 봐요!
          </p>
        </header>
        <section className="social">
          <button
            type="button"
            className="social__btn flex align-center justify-center kakao"
          >
            <img className="social__img" src={KakaoIcon} alt="카카오" />
            <p className="social__content notoMid fs-15">카카오로 시작하기</p>
          </button>
          <button
            type="button"
            className="social__btn flex align-center justify-center naver"
          >
            <img className="social__img" src={NaverIcon} alt="네이버" />
            <p className="social__content notoMid fs-15">네이버로 시작하기</p>
          </button>
          <button
            type="button"
            className="social__btn flex align-center justify-center google"
          >
            <img className="social__img" src={GoogleIcon} alt="구글" />
            <p className="social__content notoMid fs-15">구글로 시작하기</p>
          </button>
        </section>
        <div className="or flex align-center justify-center">
          <span className="or__line" />
          <p className="or__title notoBold fs-14">또는</p>
          <span className="or__line" />
        </div>
        <section className="form">
          <p className="form__title notoReg fs-16">이메일로 회원가입하기</p>
          <input
            className="form__input notoReg fs-15"
            type="text"
            placeholder="이메일을 입력해주세요."
            onKeyUp={chkEmailReg}
            ref={inputRef}
          />
          {errMsg === "" ? (
            <p className="dummy" />
          ) : (
            <p className="form__msg notoMid fs-12">{errMsg}</p>
          )}

          <button
            type="button"
            className="form__btn notoMid fs-15 flex align-center justify-center"
            onClick={chkValidate}
          >
            다음
          </button>
        </section>
        <footer className="footer notoMid fs-12 flex align-center justify-center">
          <p className="footer__msg">이미 계정이 있으신가요?</p>
          <Link className="footer__link" to="/login">
            로그인
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Join;
