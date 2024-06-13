import { createSlice } from "@reduxjs/toolkit";

import { Department } from "@/config/erd";
import { DEFAULT_COMMON_STATE, CommonSliceState } from "../common";
import { RootState } from "../storeUtils";
import { DepartmentRequestDTO } from "@/config/dto/request";
import { fetchDepartments } from "./fetchDepartments";

const initialState: CommonSliceState<Department, DepartmentRequestDTO> =
  DEFAULT_COMMON_STATE;

const slice = createSlice({
  name: "departments",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.status = "loading";
        state.list = [];
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state) => {
        state.status = "failed";
        state.list = [];
      });
  },
});

// Action creators are generted for each case reducer function
export const {} = slice.actions;

export const departmentsStatusSelector = (state: RootState) =>
  state.departments.status;
export const departmentsSelector = (state: RootState) => state.departments.list;

export default slice.reducer;
