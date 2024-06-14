import { createSlice } from "@reduxjs/toolkit";
import uploadFiles from "./uploadFiles";
import { RootState } from "../storeUtils";

export type CommonUIState = {
  inAction: boolean;
};

const initialState: CommonUIState = {
  inAction: false,
};

const slice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFiles.pending, (state) => {
        state.inAction = true;
      })
      .addCase(uploadFiles.fulfilled, (state) => {
        state.inAction = false;
      })
      .addCase(uploadFiles.rejected, (state) => {
        state.inAction = false;
      });

    // Fetch details
  },
});

// Action creators are generted for each case reducer function
export const _ = slice.actions;

export const commonInActionSelector = (state: RootState) =>
  state.common.inAction;

export default slice.reducer;
