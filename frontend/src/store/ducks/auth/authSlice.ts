import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "./authThunk";

export interface UserInfoType {
  id: string;
  nickname: string;
  area: string | null;
  followOpen: boolean;
  followerOpen: boolean;
  likeNotice: boolean;
  followNotice: boolean;
  commentNotice: boolean;
  replyNotice: boolean;
  profileMsg: string | null;
  profileImg: string | null;
  backgroundImg: string | null;
}
interface InitialStateType {
  tmpId: string;
  userInfo: UserInfoType | null;
}

const initialState: InitialStateType = {
  tmpId: "",
  userInfo: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.tmpId = action.payload.tmpId;
    }
  },
  extraReducers: builder => {
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
    });
  }
});

export const { setUserId } = authSlice.actions;

export default authSlice.reducer;
