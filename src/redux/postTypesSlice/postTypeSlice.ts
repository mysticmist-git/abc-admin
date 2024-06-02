import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../storeUtils";
import { PostType } from "@/config/erd";
import { CommonSliceState } from "../common";
import { fetchPostTypes } from "./fetchPostTypes";

const initialState: CommonSliceState<PostType> = {
  list: [],
  status: "idle",
};

const slice = createSlice({
  name: "postTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostTypes.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchPostTypes.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Action creators are generted for each case reducer function
export const {} = slice.actions;

export const postTypesStatusSelector = (state: RootState) =>
  state.postTypes.status;
export const postTypesSelector = (state: RootState) => state.postTypes.list;

export default slice.reducer;
