import { createSlice } from "@reduxjs/toolkit";

import { ResourceUsingRequestDTO } from "@/config/dto/request";
import { ResourceUsing } from "@/config/erd";
import { CommonSliceState, DEFAULT_COMMON_STATE } from "../common";
import { RootState } from "../storeUtils";
import { fetchResourceUsings } from "./fetchResourceUsings";

const initialState: CommonSliceState<ResourceUsing, ResourceUsingRequestDTO> =
  DEFAULT_COMMON_STATE;

const slice = createSlice({
  name: "resourceUsings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResourceUsings.pending, (state) => {
        state.status = "loading";
        state.list = [];
      })
      .addCase(fetchResourceUsings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchResourceUsings.rejected, (state) => {
        state.status = "failed";
        state.list = [];
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
