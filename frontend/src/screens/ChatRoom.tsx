import Chat, { ChatProps } from "@components/Letters/Chat";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 } from "uuid";
import "./ChatRoom.scss";
import UserDummyIcon from "@images/UserDummy.svg";
import ImgIcon from "@images/ImgIcon.svg";
import { getDmDetailList } from "@apis/dm";

function ChatRoom() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const withId = searchParams.get("with");
  const [dmList, setDmList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!withId) {
      navigate("/404");
    } else {
      (async () => {
        const res = await getDmDetailList(withId);
        if (res.message === "SUCCESS") {
          setIsLoading(false);
          setDmList(res.data);
        }
      })();
    }
  }, []);
  return (
    <div className="wrapper">
      <div id="chat-room">
        <header className="header flex align-center">
          <img
            className="chat-room__user-img"
            src={UserDummyIcon}
            alt="유저더미"
          />
          <p className="chat-room__user-nick-name notoBold fs-24">{withId}</p>
        </header>
        <div className="chat-list">
          {dmList.length !== 0 ? (
            dmList.map((dm: ChatProps) => (
              <Chat type={dm.type} content={dm.content} key={v4()} />
            ))
          ) : (
            <div className="no-chat flex align-center justify-center fs-24">
              {!isLoading && "주고받은 대화가 없습니다!"}
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder="채팅을 입력해주세요."
          className="chat-input notoReg fs-15"
        />
        <footer className="chat-footer">
          <button type="button" className="chat-btn">
            <img src={ImgIcon} alt="이미지업로드" className="chat__img-icon" />
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ChatRoom;
