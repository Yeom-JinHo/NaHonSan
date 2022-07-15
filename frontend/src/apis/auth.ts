import API from "./index";

export const chkEmailExist = async (userId: string) => {
  const res = await API.get(`/emailCheck?userId=${userId}`);
  return res.data.message;
};

export const sendAuthCode = (userId: string) => {
  API.post(`/email`, { userId });
};
