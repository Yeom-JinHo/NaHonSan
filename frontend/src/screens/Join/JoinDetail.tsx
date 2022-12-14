/* eslint-disable no-nested-ternary */
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinDetail.scss";
import { passwordReg } from "@constants/reg";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { chkNickNameExist, join, login } from "@apis/auth";
import { getUserInfo } from "@store/ducks/auth/authThunk";
import LoadingSpinner from "@images/LoadingSpinner.svg";

type nickNameDupliType = "" | "err" | "success";

function JoinDetail() {
  const userId = useAppSelector(state => state.auth.tmpId);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [validPassword, setValidPassword] = useState(true);
  const [samePassword, setSamePassword] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nickNameDupli, setNickNameDupli] = useState<nickNameDupliType>("");

  const nickNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const chkPasswordRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    nickName: "",
    password: ""
  });

  const submitUserInfo = async () => {
    if (nickNameDupli !== "success" || form.nickName === "") {
      nickNameRef.current?.focus();
      return;
    }
    if (!validPassword || form.password === "") {
      passwordRef.current?.focus();
      return;
    }
    if (!samePassword) {
      chkPasswordRef.current?.focus();
      return;
    }
    if (!isLoading) {
      setIsLoading(true);
      const res = await join(userId, form.password, form.nickName);
      if (res === "SUCCESS") {
        const loginRes = await login(userId, form.password);
        if (loginRes === "SUCCESS") {
          await dispatch(getUserInfo());
          navigate("/join/welcome");
        }
      }
      setIsLoading(false);
    }
  };

  const chkValidPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidPassword(passwordReg.test(e.target.value));
  };

  const chkSamePassword = () => {
    if (chkPasswordRef.current && passwordRef.current)
      setSamePassword(
        chkPasswordRef.current.value === passwordRef.current.value
      );
  };
  const changeForm = (type: string, value: string) => {
    setForm({ ...form, [type]: value });
  };

  const chkNickNameDupli = async () => {
    if (nickNameRef.current?.value === "") {
      nickNameRef.current.focus();
      return;
    }
    const res = await chkNickNameExist(nickNameRef.current?.value as string);

    if (res === "SUCCESS") {
      setNickNameDupli("success");
      changeForm("nickName", nickNameRef.current?.value as string);
    } else {
      setNickNameDupli("err");
    }
  };

  const handlePasswordChkInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submitUserInfo();
  };
  return (
    <div className="wrraper">
      <div id="join-detail">
        <header className="header">
          <p className="header__title notoBold fs-24">
            ??????????????? ??????????????????
          </p>
        </header>
        <form className="form">
          <p className="form__type notoBold fs-16">?????????</p>
          <input
            type="text"
            className="form__input fs-15 notoReg"
            defaultValue={userId}
            disabled
          />
          <p className="form__type notoBold fs-16">?????????</p>
          <input
            type="text"
            className="form__input input-nickName fs-15 notoReg"
            placeholder="???????????? ??????????????????."
            autoComplete="nickname"
            ref={nickNameRef}
            maxLength={10}
          />
          <button
            type="button"
            className="form__btn--dupli notoReg fs-12 inline-block"
            onClick={chkNickNameDupli}
          >
            ????????????
          </button>
          {nickNameDupli === "" ? (
            <div className="dummy" />
          ) : nickNameDupli === "err" ? (
            <p className="password-msg fs-12 notoMid">
              ?????? ???????????? ??????????????????.
            </p>
          ) : (
            <p className="password-msg success fs-12 notoMid">
              ??????????????? ??????????????????.
            </p>
          )}
          <p className="form__type notoBold fs-16">????????????</p>
          <input
            type="password"
            className="form__input fs-15 notoReg password"
            onChange={e => {
              chkValidPassword(e);
              changeForm("password", e.target.value);
            }}
            onBlur={chkSamePassword}
            ref={passwordRef}
            placeholder="??????????????? ??????????????????."
            autoComplete="new-password"
          />
          {validPassword ? (
            <div className="dummy" />
          ) : (
            <p className="password-msg fs-12 notoMid">
              ??????,????????????,??????????????? ???????????? 8~16????????? ??????????????????.
            </p>
          )}

          <p className="form__type notoBold fs-16">??????????????????</p>
          <input
            type="password"
            className="form__input fs-15 notoReg password-chk"
            onChange={chkSamePassword}
            ref={chkPasswordRef}
            placeholder="??????????????? ?????? ?????? ??????????????????."
            autoComplete="new-password"
            onKeyUp={handlePasswordChkInput}
          />
          {samePassword ? (
            <div className="dummy" />
          ) : (
            <p className="password-chk-msg fs-12 notoMid">
              ??????????????? ???????????? ????????????.
            </p>
          )}

          <button
            type="button"
            className="form__btn flex align-center justify-center notoMid fs-16"
            onClick={submitUserInfo}
          >
            {isLoading ? (
              <img
                src={LoadingSpinner}
                className="loading-spinner"
                alt="???????????????"
              />
            ) : (
              "???????????? ??????"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinDetail;
