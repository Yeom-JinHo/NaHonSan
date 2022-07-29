import { UserInfoType } from "@store/ducks/auth/authSlice";
import API from "./index";

export const setAccount = async (data: UserInfoType) => {
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
