import { createSlice } from "@reduxjs/toolkit";

import { ResourceType } from "@/config/erd";
import { CommonSliceState } from "../common";
import { RootState } from "../storeUtils";
import { fetchResourceTypes } from "./fetchResourceTypes";

const initialState: CommonSliceState<ResourceType> = {
  list: [],
  status: "idle",
};

const slice = createSlice({
  name: "resourceTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResourceTypes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchResourceTypes.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.list = action.payload;
    });
    builder.addCase(fetchResourceTypes.rejected, (state) => {
      state.status = "failed";
    });
  },
});

// Action creators are generted for each case reducer function
export const _ = slice.actions;

export const resourceTypesStatusSelector = (state: RootState) =>
  state.resourceTypes.status;
export const resourceTypesSelector = (state: RootState) =>
  state.resourceTypes.list;

export default slice.reducer;
