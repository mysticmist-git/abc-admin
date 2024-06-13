import { createSlice } from "@reduxjs/toolkit";

import { File } from "@/config/erd";
import { CommonSliceState, DEFAULT_COMMON_STATE } from "../common";
import { RootState } from "../storeUtils";
import { FileRequestDTO } from "@/config/dto/request";

const initialState: CommonSliceState<File, FileRequestDTO> =
  DEFAULT_COMMON_STATE;

const slice = createSlice({
  name: "files",
  initialState,
  reducers: {},
});

// Action creators are generted for each case reducer function
export const _ = slice.actions;

export const filesStatusSelector = (state: RootState) => state.files.status;
export const filesSelector = (state: RootState) => state.files.list;

export default slice.reducer;
