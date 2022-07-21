import axios from "axios";
import API from "./index";

export const sendAuthCode = async (id: string) => {
  const res = await axios.post(`/user/auth`, { id, type: 1 });

  return res.data;
};

export const chkAuthCode = async (
  userId: string,
  authCode: string | undefined
) => {
  const res = await API.get(`/email?userId=${userId}&authKey=${authCode}`);
  return res.data.message;
};

export const chkNickNameExist = async (nickName: string) => {
  return true;
};

export const join = async () => {
  return true;
};
