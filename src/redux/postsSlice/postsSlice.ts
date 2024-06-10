import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../storeUtils";
import { CommonSliceState, DEFAULT_COMMON_STATE } from "../common";
import { Post } from "@/config/erd";
import { PostRequestDTO } from "@/config/dto/request";

const initialState: CommonSliceState<Post, PostRequestDTO> =
  DEFAULT_COMMON_STATE;

const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

// Action creators are generted for each case reducer function
export const {} = slice.actions;

export const postListSelector = (state: RootState) => state.posts.list;

export default slice.reducer;
