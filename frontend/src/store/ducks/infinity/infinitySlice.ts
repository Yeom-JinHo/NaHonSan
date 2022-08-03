import { getTipList } from "@store/ducks/infinity/infinityThunk";
import { createSlice } from "@reduxjs/toolkit";
import { TipCondition, DealCondition } from "./infinity.type";

interface IntialStateType {
  conditionList: Array<TipCondition & DealCondition>;
  page: number;
  isEnd: boolean;
  isLoading: boolean;
  lastIdx: number | null;
  lastView: number | null;
  lastLikes: number | null;
}

const initialState: IntialStateType = {
  conditionList: [],
  page: 0,
  isEnd: false,
  isLoading: false,
  lastIdx: null,
  lastView: null,
  lastLikes: null
};

export const infinitySlice = createSlice({
  name: "infinity",
  initialState,
  reducers: {
    setPage: (state, { payload }) => {
      state.page = payload.nextPage;
    },
    setIsEnd: (state, { payload }) => {
      state.isEnd = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setConditionList: (state, { payload }) => {
      state.conditionList = [
        ...state.conditionList,
        {
          ...payload,
          lastIdx: state.lastIdx,
          lastView: state.lastView,
          lastLikes: state.lastLikes,
          pageSize: 6
        }
      ];
    },
    resetInfinity: () => initialState
  },
  extraReducers: builder => {
    builder.addCase(getTipList.fulfilled, (state, { payload }) => {
      state.isEnd = !payload.hasNext;
      const lastCard = payload.data[payload.data.length - 1];

      state.lastIdx = lastCard.idx;
      state.lastLikes = lastCard.likes;
      state.lastView = lastCard.view;

      state.isLoading = false;
    });
  }
});

export const {
  setPage,
  setIsEnd,
  setIsLoading,
  setConditionList,
  resetInfinity
} = infinitySlice.actions;

export default infinitySlice.reducer;
