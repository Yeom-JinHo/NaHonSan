import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  userId: string | null;
}

const initialState: InitialStateType = {
  userId: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload.userId;
    }
  }
});

export const { setUserId } = authSlice.actions;

export default authSlice.reducer;
