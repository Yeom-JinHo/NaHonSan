import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  userEmail: string | null;
}

const initialState: InitialStateType = {
  userEmail: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}
});

export default authSlice.reducer;
