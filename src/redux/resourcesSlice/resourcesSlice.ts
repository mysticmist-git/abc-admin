import { createSlice } from "@reduxjs/toolkit";

import { ResourceRequestWithFileImagesDTO } from "@/config/dto/request";
import { Resource } from "@/config/erd";
import { CommonSliceState, DEFAULT_COMMON_STATE } from "../common";
import { RootState } from "../storeUtils";
import { fetchResources } from "./fetchResources";
import createResource from "./createResource";
import updateResource from "./updateResource";
import removeResource from "./removeResource";

const initialState: CommonSliceState<
  Resource,
  ResourceRequestWithFileImagesDTO
> = DEFAULT_COMMON_STATE;

const slice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    resourceLoaded: (state, action) => {
      state.detail = action.payload;
      state.detailStatus = "succeeded";
    },
    resourceDeleted: (state, action) => {
      state.list = state.list.filter(
        (resource) => resource.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchResources.pending, (state) => {
        state.status = "loading";
        state.list = [];
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchResources.rejected, (state) => {
        state.status = "failed";
        state.list = [];
      })
      // POST
      .addCase(createResource.pending, (state) => {
        state.detailInAction = true;
      })
      .addCase(createResource.fulfilled, (state) => {
        state.detailInAction = false;
      })
      .addCase(createResource.rejected, (state) => {
        state.detailInAction = false;
      })
      // PUT
      .addCase(updateResource.pending, (state) => {
        state.detailInAction = true;
      })
      .addCase(updateResource.fulfilled, (state) => {
        state.detailInAction = false;
      })
      .addCase(updateResource.rejected, (state) => {
        state.detailInAction = false;
      })

      // DELETE
      .addCase(removeResource.pending, (state) => {
        state.inAction = true;
      })
      .addCase(removeResource.fulfilled, (state, action) => {
        state.inAction = false;
        state.list = state.list.filter(
          (resource) => resource.id !== action.payload
        );
      })
      .addCase(removeResource.rejected, (state) => {
        state.inAction = false;
      });
  },
});

// Action creators are generted for each case reducer function
export const { resourceLoaded, resourceDeleted } = slice.actions;

export const resourcesStatusSelector = (state: RootState) =>
  state.resources.status;
export const resourcesSelector = (state: RootState) => state.resources.list;
export const resourceDetailStatusSelector = (state: RootState) =>
  state.resources.detailStatus;
export const resourceDetailSelector = (state: RootState) =>
  state.resources.detail;
export const resourceDetailInActionSelector = (state: RootState) =>
  state.resources.detailInAction;

export default slice.reducer;
