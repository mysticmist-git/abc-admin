import { createSlice } from "@reduxjs/toolkit";

import { ResourceUsingRequestDTO } from "@/config/dto/request";
import { ResourceUsing } from "@/config/erd";
import { CommonSliceState, DEFAULT_COMMON_STATE } from "../common";
import { RootState } from "../storeUtils";
import { fetchResourceUsings } from "./fetchResourceUsings";
import createResourceUsing from "./createResourceUsing";
import updateResourceUsing from "./updateResourceUsing";
import removeResourceUsing from "./removeResourceUsing";

const initialState: CommonSliceState<ResourceUsing, ResourceUsingRequestDTO> =
  DEFAULT_COMMON_STATE;

const slice = createSlice({
  name: "resourceUsings",
  initialState,
  reducers: {
    resourceUsingDetailCleared: (state) => {
      state.detail = null;
      state.detailStatus = "idle";
    },
    resourceUsingLoaded: (state, action) => {
      state.detail = action.payload;
      state.detailStatus = "succeeded";
    },
    resourceUsingDeleted: (state, action) => {
      state.list = state.list.filter(
        (resource) => resource.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
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
      })

      // PUT
      .addCase(updateResourceUsing.pending, (state) => {
        state.detailInAction = true;
      })
      .addCase(updateResourceUsing.fulfilled, (state, action) => {
        state.detailInAction = false;
        state.list = state.list.map((resource) => {
          if (resource.id === action.payload.id) {
            return {
              ...resource,
              ...action.payload,
            };
          }
          return resource;
        });
      })
      .addCase(updateResourceUsing.rejected, (state) => {
        state.detailInAction = false;
      })

      // DELETE
      .addCase(removeResourceUsing.pending, (state) => {
        state.inAction = true;
      })
      .addCase(removeResourceUsing.fulfilled, (state, action) => {
        state.inAction = false;
        state.list = state.list.filter(
          (resource) => resource.id !== action.payload
        );
      })
      .addCase(removeResourceUsing.rejected, (state) => {
        state.inAction = false;
      })

      // POST
      .addCase(createResourceUsing.pending, (state) => {
        state.detailInAction = true;
      })
      .addCase(createResourceUsing.fulfilled, (state, action) => {
        state.detailInAction = false;
        if (!action.payload) {
          return;
        }

        state.list.push(action.payload);
        state.detail = action.payload;
      })
      .addCase(createResourceUsing.rejected, (state) => {
        state.detailInAction = false;
      });
  },
});

// Action creators are generted for each case reducer function
export const {
  resourceUsingDetailCleared,
  resourceUsingDeleted,
  resourceUsingLoaded,
} = slice.actions;

export const resourceUsingsStatusSelector = (state: RootState) =>
  state.resourceUsings.status;
export const resourceUsingsSelector = (state: RootState) =>
  state.resourceUsings.list;

export const detailResourceUsingStatusSelector = (state: RootState) =>
  state.resourceUsings.detailStatus;
export const detailResourceUsingSelector = (state: RootState) =>
  state.resourceUsings.detail;

export default slice.reducer;
