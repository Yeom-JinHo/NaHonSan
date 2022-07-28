import React, { useState, useRef, useEffect } from "react";
import "./AccountSettingPage.scss";
import { Link, useNavigate } from "react-router-dom";
import UserDummyIcon from "@images/UserDummy.svg";
import { v4 } from "uuid";
import ImgResizer from "@components/common/ImgUploader/ImgResizer";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { chkNickNameExist } from "@apis/auth";
import { setAccount } from "@apis/setAccount";
import { getUserInfo } from "@store/ducks/auth/authThunk";

function AccountSettingPage() {
  // 프로필 설정
  const imgInput = useRef<HTMLInputElement>(null);
  const nickNameInput = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errMsg, setErrMsg] = useState(false);
  const [isChk, setIsChk] = useState(false);
  const userInfo = useAppSelector(state => state.auth.userInfo);
  const [tmpNickName, setTmpNickName] = useState(userInfo?.nickname);
  const [tmpText, setTmpText] = useState(userInfo?.profileMsg);
  const [sendFile, setSendFile] = useState<File | null>(null);
  const [userImg, setUserImg] = useState(UserDummyIcon);
  const payload: any = {
    profileImg: userInfo?.profileImg,
    profileMsg: userInfo?.profileMsg,
    nickname: userInfo?.nickname,
    likeNotice: userInfo?.likeNotice,
    followNotice: userInfo?.followNotice,
    commentNotice: userInfo?.commentNotice,
    replyNotice: userInfo?.replyNotice,
    followOpen: userInfo?.followOpen,
    followerOpen: userInfo?.followerOpen
  };

  useEffect(() => {
    if (userInfo?.profileImg) {
      setUserImg(`data:image/jpeg;base64,${userInfo?.profileImg}`);
    }
  }, []);

  const clickInput = () => {
    if (imgInput.current) {
      imgInput.current.click();
    }
  };

  const fileread = () => {
    if (imgInput.current?.files) {
      const file = imgInput.current.files[0];
      if (file) {
        setSendFile(file);
      }
    }
  };

  // function dataURItoBlob(dataURI: string) {
  //   const byteString = atob(dataURI.split(",")[1]);
  //   const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  //   const ab = new ArrayBuffer(byteString.length);
  //   const ia = new Uint8Array(ab);

  //   for (let i = 0; i < byteString.length; i += 1) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }
  //   const blob = new Blob([ab], { type: mimeString });

  //   return blob;
  // }

  const receiveFile = (data: string) => {
    if (userInfo) {
      setUserImg(data);
      // userInfo.profileImg = data;
      // console.log(data.replace("data:image/;base64,", ""));
      // payload.profileImg = dataURItoBlob(data);
      const incData = data.replace("data:image/jpeg;base64,", "");
      payload.profileImg = incData;
    }
  };

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTmpText(e.target.value);
  };

  // 계정 설정

  const nickNameChk = async () => {
    if (nickNameInput.current?.value === "") {
      nickNameInput.current.focus();
      return;
    }

    const res = await chkNickNameExist(nickNameInput.current?.value as string);
    await setIsChk(true);
    if (res === "SUCCESS") {
      await setErrMsg(true);
    } else {
      setErrMsg(false);
      return;
    }
    setTmpNickName(nickNameInput.current?.value);
  };

  const noti = ["좋아요", "팔로잉", "댓글", "대댓글"];
  const followState = ["팔로우", "팔로잉"];
  const goBack = () => {
    navigate(-1);
  };
  const goWithdrawal = () => {
    navigate("/account/withdrawal", { replace: true });
  };
  const [notiList, setNotiList] = useState([
    userInfo?.likeNotice,
    userInfo?.followNotice,
    userInfo?.commentNotice,
    userInfo?.replyNotice,
    userInfo?.followerOpen,
    userInfo?.followOpen
  ]);

  const changeSet = async () => {
    [
      payload.likeNotice,
      payload.followNotice,
      payload.commentNotice,
      payload.replyNotice,
      payload.followerOpen,
      payload.followOpen
    ] = [
      notiList[0],
      notiList[1],
      notiList[2],
      notiList[3],
      notiList[4],
      notiList[5]
    ];
    payload.nickname = tmpNickName;
    payload.profileMsg = tmpText;
    const res = await setAccount(payload);

    if (res === "SUCCESS") {
      await dispatch(getUserInfo());
      navigate(`/userfeed/${payload.nickname}`);
    }
  };

  return (
    <div id="accountSetting-page">
      <input type="file" ref={imgInput} accept="image/*" onChange={fileread} />
      <div className="setprofile notoMid fs-36">
        <div className="setprofile__title">프로필 설정</div>
        <div className="img-container flex column">
          <button
            type="button"
            className="user-container flex"
            onClick={clickInput}
          >
            <img className="img-container__user" src={userImg} alt="dumm" />
            <p className="img-container__user-add fs-48">+</p>
          </button>
          {sendFile ? (
            <ImgResizer
              imgfile={sendFile}
              newImgfile={receiveFile}
              imgW={300}
              imgH={300}
            />
          ) : null}
        </div>
        <div className="text-wrapper flex column">
          <p>{userInfo?.nickname}</p>
          <textarea
            className="state notoReg"
            value={tmpText as string}
            onChange={e => handleText(e)}
          />
          <p className="text-info fs-12">최대 100자까지 입력 가능합니다.</p>
        </div>
      </div>
      <div className="setaccount">
        <div className="title notoMid fs-36 p-none">계정 설정</div>
        <div className="main">
          <div className="main-account__title flex">
            <p className="fs-24 notoMid">회원정보 수정</p>
            <button onClick={goWithdrawal} type="button" className="fs-12">
              회원탈퇴
            </button>
          </div>
          <div className="main-account flex column">
            <div className="main-account__nickname flex">
              <p className="fs-16 notoReg">닉네임</p>
              <div>
                <input type="text" ref={nickNameInput} />
                {isChk ? (
                  <p className="notoReg">
                    {errMsg ? (
                      <span className="success">사용 가능한 닉네임입니다.</span>
                    ) : (
                      <span className="err">중복 된 닉네임입니다.</span>
                    )}
                  </p>
                ) : null}
              </div>
              <button
                className="notoMid fs-12"
                type="button"
                onClick={nickNameChk}
              >
                중복확인
              </button>
            </div>
            <div className="main-account__addinfo flex">
              <p className="fs-16 notoReg">지역·태그</p>
              <Link to="/join/more" className="notoMid fs-12">
                변경하기
              </Link>
              <div> </div>
            </div>
            <div className="main-account__addinfo flex">
              <p className="fs-16 notoReg">비밀번호</p>
              <Link to="/reset/pw" className="notoMid fs-12">
                변경하기
              </Link>
              <div> </div>
            </div>
          </div>
          <div className="main-noti__title fs-24 notoMid">알림 설정</div>
          <div className="main-noti__toggle flex">
            {noti.map((title, idx) => {
              return (
                <div className="main-noti__toggle-item flex" key={v4()}>
                  <p className="notoReg fs-14">{title}</p>
                  <button
                    onClick={() => {
                      setNotiList(cur => {
                        const newArr = [...cur];
                        newArr[idx] = !newArr[idx];
                        return newArr;
                      });
                    }}
                    type="button"
                    className={`main-noti__toggle-btn flex ${
                      notiList[idx] ? "justify-end" : null
                    }`}
                  >
                    <div
                      className={
                        notiList[idx] ? "active-toggle-bar" : "toggle-bar"
                      }
                    >
                      {null}
                    </div>
                    <div
                      className={
                        notiList[idx] ? "active-toggle-circle" : "toggle-circle"
                      }
                    >
                      {null}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
          <div className="main-noti__title fs-24 notoMid">공개 설정</div>
          <div className="main-noti__toggle flex">
            {followState.map((title, idx) => {
              const idxx = idx + 4;
              return (
                <div className="main-noti__toggle-item flex" key={v4()}>
                  <p className="notoReg fs-14">{title}</p>
                  <button
                    onClick={() => {
                      setNotiList(cur => {
                        const newArr = [...cur];
                        newArr[idxx] = !newArr[idxx];
                        return newArr;
                      });
                    }}
                    type="button"
                    className={`main-noti__toggle-btn flex ${
                      notiList[idxx] ? "justify-end" : null
                    }`}
                  >
                    <div
                      className={
                        notiList[idxx] ? "active-toggle-bar" : "toggle-bar"
                      }
                    >
                      {null}
                    </div>
                    <div
                      className={
                        notiList[idxx]
                          ? "active-toggle-circle"
                          : "toggle-circle"
                      }
                    >
                      {null}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="setaccount-submit flex fs-24 notoMid">
        <button
          className="setaccount-submit__submit"
          type="button"
          onClick={changeSet}
        >
          설정
        </button>
        <button
          onClick={goBack}
          className="setaccount-submit__cancle"
          type="button"
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default AccountSettingPage;
