import axios from "axios";

export default {};
const clientID = process.env.REACT_APP_KAKAO_CLIENT_ID;
const redirectUrl = `http://localhost:3000/oauth/kakao`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectUrl}&response_type=code`;

export const loginKakao = async (code: string) => {
  const res = await axios.post(
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientID}&redirect_uri=${redirectUrl}&code=${code}`,
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    }
  );
  console.log(res);
  // 여기서 백엔드 전달
};
