import { createSlice } from "@reduxjs/toolkit";

import { ResouceTypeRequestDTO } from "@/config/dto/request";
import { ResourceType } from "@/config/erd";
import { CommonSliceState, DEFAULT_COMMON_STATE } from "../common";
import { RootState } from "../storeUtils";
import { fetchResourceTypes } from "./fetchResourceTypes";

const initialState: CommonSliceState<ResourceType, ResouceTypeRequestDTO> =
  DEFAULT_COMMON_STATE;

const slice = createSlice({
  name: "resourceTypes",
  initialState,
  reducers: {
    resourceTypeDetailCleared: (state) => {
      state.detail = null;
      state.detailStatus = "idle";
    },
    resourceTypeLoaded: (state, action) => {
      state.detail = action.payload;
      state.detailStatus = "succeeded";
    },
    resourceTypeDeleted: (state, action) => {
      state.list = state.list.filter(
        (resource) => resource.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResourceTypes.pending, (state) => {
        state.status = "loading";
        state.list = [];
      })
      .addCase(fetchResourceTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchResourceTypes.rejected, (state) => {
        state.status = "failed";
        state.list = [];
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
