import { createSlice } from "@reduxjs/toolkit";

import { Department } from "@/config/erd";
import { departments } from "@/mock/departments";
import { CommonSliceState } from "../common";
import { RootState } from "../storeUtils";
import { fetchDepartments } from "./fetchDepartments";

const initialState: CommonSliceState<Department> = {
  list: [],
  status: "idle",
};

const slice = createSlice({
  name: "departments",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDepartments.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchDepartments.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.list = action.payload;
    });
    builder.addCase(fetchDepartments.rejected, (state) => {
      state.status = "failed";
    });
  },
});

// Action creators are generted for each case reducer function
export const {} = slice.actions;

export const departmentsSelector = (state: RootState) => state.departments.list;

export default slice.reducer;
