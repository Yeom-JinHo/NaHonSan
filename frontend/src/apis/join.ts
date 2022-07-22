import axios from "axios";
import API from "./index";

export const sendAuthCode = async (id: string, type: number) => {
  const res = await API.post(`/user/auth`, { id, type });
  return res.data.message;
};

export const chkAuthCode = async (number: number) => {
  const res = await API.get(`/email?&number=${number}`);
  return res.data.message;
};

export const chkNickNameExist = async (nickName: string) => {
  return true;
};

export const join = async () => {
  return true;
};
