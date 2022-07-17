import axios from "axios";

// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export const getDummy = async () => {
  const res = await axios.get(`https://picsum.photos/v2/list?page=1&limit=10`);
  console.log(res.data);
  return res.data;
};

export const getDummyImg = async url => {
  const res = await axios.get(url, {
    responseType: "blob"
  });
  console.log(res);
  // const res2 = await axios.get(url);
  // console.log(res2);
  // const imageBlob = await res.data.blob();
  const blob = new Blob([res.data]);
  // console.log(imageBlob);
  console.log(blob);
  const imgSrc = window.URL.createObjectURL(blob);
  return imgSrc;
  // return res.data;
};
