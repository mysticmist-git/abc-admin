import { PostTypeRequestDTO } from "@/config/dto/request";
import { PostType } from "@/config/erd";
import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_COMMON_STATE, CommonSliceState } from "../common";
import { RootState } from "../storeUtils";
import { fetchPostTypes } from "./fetchPostTypes";

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

export default slice.reducer;
