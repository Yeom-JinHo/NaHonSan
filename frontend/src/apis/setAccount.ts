import API from "./index";

export const setAccount = async (data: any) => {
  const accessToken = sessionStorage.getItem("access-token") as string;
  const res = await API.put("/user", data, {
    headers: {
      Authorization: `${accessToken}`
    }
  });
  return res.data.message;
};

export default { setAccount };
