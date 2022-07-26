import API from "./index";

export const reqDmNoticeCount = async () => {
  const accessToken = sessionStorage.getItem("access-token");
  const res = await API.get("/user/notice/count", {
    headers: { Authorization: `${accessToken}` }
  });
  console.log(res.data);
  return res.data;
};

export const test = {};
