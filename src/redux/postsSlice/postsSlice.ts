import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../storeUtils";
import { CommonSliceState } from "../common";
import { Post } from "@/config/erd";

const initialState: CommonSliceState<Post> = {
  list: [],
  status: "idle",
  detail: null,
  detailStatus: "idle",
};

const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

// Action creators are generted for each case reducer function
export const {} = slice.actions;

export const postListSelector = (state: RootState) => state.posts.list;

export default slice.reducer;
