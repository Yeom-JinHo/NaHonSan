import API from "./index";

interface createForm {
  category: string;
  title: string;
  content: string;
  bannerImg: string;
}

export const tipCreate = async (data: createForm) => {
  const accessToken = sessionStorage.getItem("access-token") as string;
  const res = await API.post("/honeyTip", data, {
    headers: {
      Authorization: accessToken
    }
  });
  return res.data.message;
};

export default {};
