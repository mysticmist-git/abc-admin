import { createSlice } from "@reduxjs/toolkit";

import { PostTypeRequestDTO } from "@/config/dto/request";
import { PostType } from "@/config/erd";
import { CommonSliceState, DEFAULT_COMMON_STATE } from "../common";
import { RootState } from "../storeUtils";
import createPostType from "./createPostType";
import fetchPostTypeById from "./fetchPostTypeById";
import fetchPostTypes from "./fetchPostTypes";
import updatePostType from "./updatePostType";

const initialState: CommonSliceState<PostType, PostTypeRequestDTO> =
  DEFAULT_COMMON_STATE;

const slice = createSlice({
  name: "postTypes",
  initialState,
  reducers: {
    postTypeDetailCleared: (state) => {
      state.detail = null;
    },
    postTypeDetailLoaded: (state, action) => {
      const requestDTO: PostTypeRequestDTO = {
        id: action.payload.id,
        description: action.payload.description,
        name: action.payload.name,
        permissionIdToCRUD: action.payload.permissionIdToCRUD,
        permissionIdToCRUDPost: action.payload.permissionIdToCRUDPost,
        status: action.payload.status,
      };
      state.detail = requestDTO;
      state.detailStatus = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchPostTypes.pending, (state) => {
        state.status = "loading";
        state.list = [];
      })
      .addCase(fetchPostTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchPostTypes.rejected, (state) => {
        state.status = "failed";
        state.list = [];
      })
      // GET by ID
      .addCase(fetchPostTypeById.pending, (state) => {
        state.detailStatus = "loading";
        state.detail = null;
      })
      .addCase(fetchPostTypeById.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.detail = action.payload;
      })
      .addCase(fetchPostTypeById.rejected, (state) => {
        state.detailStatus = "failed";
        state.detail = null;
      })
      // POST
      .addCase(createPostType.pending, (state) => {
        state.detailInAction = true;
      })
      .addCase(createPostType.fulfilled, (state) => {
        state.detailInAction = false;
      })
      .addCase(createPostType.rejected, (state) => {
        state.detailInAction = false;
      })
      // PUT
      .addCase(updatePostType.pending, (state) => {
        state.detailInAction = true;
      })
      .addCase(updatePostType.fulfilled, (state) => {
        state.detailInAction = false;
      })
      .addCase(updatePostType.rejected, (state) => {
        state.detailInAction = false;
      });
  },
});

// Action creators are generted for each case reducer function
export const { postTypeDetailCleared, postTypeDetailLoaded } = slice.actions;

export const postTypesStatusSelector = (state: RootState) =>
  state.postTypes.status;
export const postTypesSelector = (state: RootState) => state.postTypes.list;
export const postTypeDetailStatusSelector = (state: RootState) =>
  state.postTypes.detailStatus;
export const postTypeDetailSelector = (state: RootState) =>
  state.postTypes.detail;
export const postTypeDetailInActionSelector = (state: RootState) =>
  state.postTypes.detailInAction;

export default slice.reducer;
