import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
import Editor from "@components/common/s3Uploader/Editor";
import "./DealUpdate.scss";
import noimg from "@images/noimg.svg";
import ImgResizer from "@components/common/ImgUploader/ImgResizer";
import isImage from "@utils/isImage";
import { dealArticle, dealUpdate } from "@apis/honeyDeal";
import { v4 } from "uuid";
import dealCategory from "@constants/dealCategory";
import LoadingSpinner from "@images/LoadingSpinner.svg";
import X from "@images/X.svg";

function DealUpdate() {
  const [dealState, setDealState] = useState("");
  const [sendFile, setSendFile] = useState<File | null>(null);
  const [thumnail, setThumnail] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [chk, setChk] = useState(false);
  const [updateData, setUpdateData] = useState("");
  const [spinner, setSpinner] = useState(false);
  const imgInput = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 수정 전 데이터 불러오기
  // useEffect(() => {
  //   const articleInfo = location.state as dealArticle;
  //   if (articleInfo.bannerImg) {
  //     setThumnail(`data:image/jpeg;base64,${articleInfo.bannerImg}`);
  //   }
  //   setCategory(articleInfo.category);
  //   setTitle(articleInfo.title);
  //   setUpdateData(articleInfo.content);
  //   setdealState(articleInfo.state);
  // }, []);

  const { id } = useParams();

  const back = () => {
    navigate(`/deal/detail/${id}`);
  };

  const changeDealState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDealState(e.target.value);
  };

  const changeColor = (state: string) => {
    if (state === "거래 대기") {
      return "green";
    }
    if (state === "거래 진행") {
      return "yellow";
    }
    return "brown";
  };

  // 썸네일 인풋태그열기 > 파일내리기 > 파일 받기
  const clickInput = () => {
    imgInput.current?.click();
  };

  const fileread = () => {
    if (imgInput.current?.files) {
      const file = imgInput.current.files[0];

      if (file && isImage(file)) {
        setSendFile(file);
      }
    }
  };

  const receiveFile = useCallback((data: string) => {
    setThumnail(data);
  }, []);

  // 카테고리 변경
  const changeCategory = (cate: string) => {
    setCategory(cate);
  };

  // 유효성 검사
  const chkForm = () => {
    if (!titleRef.current?.value) {
      setErrMsg("제목을 입력해주세요.");
      titleRef.current?.focus();
      return;
    }
    if (titleRef.current.value.length > 30) {
      setErrMsg("제목은 30자까지에요.");
      titleRef.current?.focus();
      return;
    }
    setSpinner(true);
    setChk(true);
  };

  // 검사 > 에디터에서 밸류 받기 > DB 전송
  const receiveValue = async (data: string) => {
    const payload = {
      area: useAppSelector(state => state.auth.userInfo?.area) as string,
      state: dealState,
      category,
      title: titleRef.current?.value as string,
      content: data,
      bannerImg: thumnail.replace("data:image/jpeg;base64,", "")
    };
    const res = await dealUpdate(payload, id as string);
    if (res.status === 500) {
      alert("글이 너무 길어요 ㅠㅠ");
      setSpinner(false);
    }
    navigate(`/deal/detail/${id}`);
  };

  return (
    <div id="deal-edit">
      <input type="file" accept="image/*" ref={imgInput} onChange={fileread} />
      {sendFile ? (
        <ImgResizer
          imgfile={sendFile}
          newImgfile={receiveFile}
          imgW={200}
          imgH={200}
        />
      ) : null}
      <div className="deal-header ">
        <div className="deal-header-title notoBold flex">
          <p>
            <span>꿀</span>딜<span> 쓰</span>기
          </p>
          <div className="deal-header-select">
            <select
              className={`deal-header-select__select notoReg ${changeColor(
                dealState
              )}`}
              onChange={e => {
                changeDealState(e);
              }}
              value={dealState}
            >
              <option value="거래 대기">거래 대기</option>
              <option value="거래 진행">거래 진행</option>
              <option value="거래 완료">거래 완료</option>
            </select>
          </div>
        </div>
        <div className="deal-header-category flex">
          <p className="category-label notoMid">Category</p>
          <div className="deal-header-category-box flex">
            {dealCategory.map(item => {
              return (
                <button
                  onClick={() => {
                    setCategory(item);
                  }}
                  type="button"
                  key={v4()}
                  className={`notoReg ${category === item && "button-active"}`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
        <div className="deal-header-preview flex justify-center">
          <button
            onClick={() => {
              setThumnail("");
            }}
            type="button"
            className={`deal-close ${!thumnail && "hide"}`}
          >
            <img src={X} alt="close" />
          </button>
          <button
            onClick={clickInput}
            type="button"
            className="deal-header-preview_container flex column justify-center align-center"
          >
            <p className="deal-header-preview_container-title notoMid">
              Thumnail
            </p>
            <div className="deal-header-preview_img flex justify-center align-center">
              {thumnail ? (
                <img
                  src={thumnail}
                  alt="preview"
                  className="deal-header-preview_img-img"
                />
              ) : (
                <img
                  src={noimg}
                  alt="no-img"
                  title="preview"
                  className="deal-header-preview_img-img"
                />
              )}
            </div>
            <span className="notoReg">
              jpg, png, gif, jpeg 파일만 지원해요.
            </span>
          </button>
        </div>
      </div>
      <div className="deal-content flex column align-center">
        <p className="notoMid">Content</p>
        <input
          ref={titleRef}
          className="deal-title"
          type="text"
          placeholder="제목은 30자까지 입력할 수 있어요."
          defaultValue={title}
        />
        {errMsg ? <span className="notoReg fs-16">{errMsg}</span> : null}

        <Editor editorValue={receiveValue} getValue={chk} update={updateData} />
      </div>
      {spinner ? (
        <div className="send flex">
          <img
            src={LoadingSpinner}
            className="loading-spinner"
            alt="로딩스피너"
          />
        </div>
      ) : (
        <div className="send flex notoReg">
          <button type="button" onClick={chkForm}>
            작성
          </button>
          <button className="cancle" type="button" onClick={back}>
            취소
          </button>
        </div>
      )}
    </div>
  );
}

export default DealUpdate;
