import API from "./index";

interface userInfo {
  profileImg: null | string | undefined;
  profileMsg: null | string | undefined;
  nickname: string | undefined;
  likeNotice: boolean | undefined;
  followNotice: boolean | undefined;
  commentNotice: boolean | undefined;
  replyNotice: boolean | undefined;
  followOpen: boolean | undefined;
  followerOpen: boolean | undefined;
}

export const setAccount = async (data: userInfo) => {
  const accessToken = sessionStorage.getItem("access-token") as string;
  const res = await API.put("/user", data, {
    headers: {
      Authorization: accessToken
    }
  });
  return res.data.message;
};

export const withdrawal = async () => {
  const accessToken = sessionStorage.getItem("access-token") as string;
  const res = await API.delete("/user", {
    headers: {
      Authorization: accessToken
    }
  });
  return res.data.message;
};

export const passwordChk = async (password: string) => {
  const accessToken = sessionStorage.getItem("access-token") as string;
  const res = await API.post(
    "/user/password",
    { password },
    {
      headers: {
        Authorization: accessToken
      }
    }
  );
  return res.data.message;
};

export default { setAccount };
