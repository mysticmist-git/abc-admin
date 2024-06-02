import { createSlice } from "@reduxjs/toolkit";

import { ResourceUsing } from "@/config/erd";
import { CommonSliceState } from "../common";
import { RootState } from "../storeUtils";
import { fetchResourceUsings } from "./fetchResourceUsings";

const initialState: CommonSliceState<ResourceUsing> = {
  list: [],
  status: "idle",
};

const slice = createSlice({
  name: "resourceUsings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResourceUsings.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchResourceUsings.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.list = action.payload;
    });
    builder.addCase(fetchResourceUsings.rejected, (state) => {
      state.status = "failed";
    });
  },
});

// Action creators are generted for each case reducer function
export const _ = slice.actions;

export const resourceUsingsStatusSelector = (state: RootState) =>
  state.resourceUsings.status;
export const resourceUsingsSelector = (state: RootState) =>
  state.resourceUsings.list;

export default slice.reducer;
