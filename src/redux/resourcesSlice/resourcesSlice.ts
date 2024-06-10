import { createSlice } from "@reduxjs/toolkit";

import { ResourceRequestDTO } from "@/config/dto/request";
import { Resource } from "@/config/erd";
import { CommonSliceState, DEFAULT_COMMON_STATE } from "../common";
import { RootState } from "../storeUtils";

import { fetchResources } from "./fetchResources";

const initialState: CommonSliceState<Resource, ResourceRequestDTO> =
  DEFAULT_COMMON_STATE;

const slice = createSlice({
  name: "resources",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResources.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchResources.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.list = action.payload;
    });
    builder.addCase(fetchResources.rejected, (state) => {
      state.status = "failed";
    });
  },
});

// Action creators are generted for each case reducer function
export const _ = slice.actions;

export const resourcesStatusSelector = (state: RootState) =>
  state.resources.status;
export const resourcesSelector = (state: RootState) => state.resources.list;

export default slice.reducer;
