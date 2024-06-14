import { createSlice } from "@reduxjs/toolkit";

import { RequestRequestDTO } from "@/config/dto/request";
import { Request } from "@/config/erd";
import { CommonSliceState, DEFAULT_COMMON_STATE } from "../common";
import { RootState } from "../storeUtils";
import { fetchRequests } from "./fetchRequests";

const initialState: CommonSliceState<Request, RequestRequestDTO> =
  DEFAULT_COMMON_STATE;

const slice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    requestDetailCleared: (state) => {
      state.detail = null;
      state.detailStatus = "idle";
    },
    requestDetailLoaded: (state, action) => {
      state.detail = action.payload;
      state.detailStatus = "succeeded";
    },
    requestDeleted: (state, action) => {
      state.list = state.list.filter(
        (resource) => resource.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchRequests.pending, (state) => {
        state.status = "loading";
        state.list = [];
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchRequests.rejected, (state) => {
        state.status = "failed";
        state.list = [];
      });

    // // POST
    // .addCase(.pending, (state) => {
    //   state.detailInAction = true;
    // })
    // .addCase(createResource.fulfilled, (state, action) => {
    //   state.detailInAction = false;
    //   if (!action.payload) {
    //     return;
    //   }

    //   state.list.push(action.payload);
    //   state.detail = action.payload;
    // })
    // .addCase(createResource.rejected, (state) => {
    //   state.detailInAction = false;
    // })

    // // PUT
    // .addCase(updateResource.pending, (state) => {
    //   state.detailInAction = true;
    // })
    // .addCase(updateResource.fulfilled, (state, action) => {
    //   state.detailInAction = false;
    //   state.list = state.list.map((resource) => {
    //     if (resource.id === action.payload.id) {
    //       return {
    //         ...resource,
    //         ...action.payload,
    //       };
    //     }
    //     return resource;
    //   });
    // })
    // .addCase(updateResource.rejected, (state) => {
    //   state.detailInAction = false;
    // })

    // // DELETE
    // .addCase(removeResource.pending, (state) => {
    //   state.inAction = true;
    // })
    // .addCase(removeResource.fulfilled, (state, action) => {
    //   state.inAction = false;
    //   state.list = state.list.filter(
    //     (resource) => resource.id !== action.payload
    //   );
    // })
    // .addCase(removeResource.rejected, (state) => {
    //   state.inAction = false;
    // });
  },
});

// Action creators are generted for each case reducer function
export const {
  requestDetailLoaded: resourceLoaded,
  requestDeleted: resourceDeleted,
  requestDetailCleared: resourceDetailCleared,
} = slice.actions;

export const requestsStatusSelector = (state: RootState) =>
  state.requests.status;
export const requestsSelector = (state: RootState) => state.requests.list;
export const requestsetailStatusSelector = (state: RootState) =>
  state.requests.detailStatus;
export const requestsetailSelector = (state: RootState) =>
  state.requests.detail;
export const requestsetailInActionSelector = (state: RootState) =>
  state.requests.detailInAction;

export default slice.reducer;
