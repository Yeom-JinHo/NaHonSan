import axios from "axios";
import API from "./index";

export const login = async (id: string, password: string) => {
  const res = await axios.post("/user/login", { id, password });

  return res.data;
};

export const logout = async () => {
  console.log("로그아웃");
};
