import { createSlice } from "@reduxjs/toolkit";

import { File } from "@/config/erd";
import { CommonSliceState } from "../common";
import { RootState } from "../storeUtils";
import { fetchFiles } from "./fetchFiles";

const initialState: CommonSliceState<File> = {
  list: [],
  status: "idle",
};

const slice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFiles.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchFiles.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.list = action.payload;
    });
    builder.addCase(fetchFiles.rejected, (state) => {
      state.status = "failed";
    });
  },
});

// Action creators are generted for each case reducer function
export const _ = slice.actions;

export const filesStatusSelector = (state: RootState) => state.files.status;
export const filesSelector = (state: RootState) => state.files.list;

export default slice.reducer;
