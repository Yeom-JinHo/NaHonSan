import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  tmpId: string;
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

const initialState: InitialStateType = {
  tmpId: "",
  id: "",
  nickname: "",
  area: null,
  followOpen: false,
  followerOpen: false,
  likeNotice: false,
  followNotice: false,
  commentNotice: false,
  replyNotice: false,
  profileMsg: null,
  profileImg: null,
  backgroundImg: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.tmpId = action.payload.tmpId;
    }
  }
});

export const { setUserId } = authSlice.actions;

export default authSlice.reducer;
