import { reqTipList } from "@apis/tip";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TipCondition } from "./infinity.type";

export const getTipList = createAsyncThunk(
  "infinity/getTipList",
  async (condition: TipCondition, { dispatch }) => {
    const res = await reqTipList(condition);
    return res;
  }
);

export const test = {};
