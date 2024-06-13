import { createSlice } from "@reduxjs/toolkit";

import { PostRequestDTO } from "@/config/dto/request";
import { Post } from "@/config/erd";
import { CommonSliceState, DEFAULT_COMMON_STATE } from "../common";
import { RootState } from "../storeUtils";

import { fetchPosts } from "./fetchPosts";

const initialState: CommonSliceState<Post, PostRequestDTO> =
  DEFAULT_COMMON_STATE;

const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.list = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
        state.list = [];
      });
  },
});

// Action creators are generted for each case reducer function
export const {} = slice.actions;

export const postsStatusSelector = (state: RootState) => state.posts.status;
export const postsSelector = (state: RootState) => state.posts.list;

export default slice.reducer;
