import { createSlice } from "@reduxjs/toolkit";

import { User } from "@/config/erd";
import { CommonSliceState } from "../common";
import { RootState } from "../storeUtils";
import { fetchUsers } from "./fetchUsers";

const initialState: CommonSliceState<User> = {
  list: [],
  status: "idle",
  detail: null,
  detailStatus: "idle",
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.list = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = "failed";
    });
  },
});

// Action creators are generted for each case reducer function
export const _ = slice.actions;

export const usesStatusSelector = (state: RootState) => state.users.status;
export const usersSelector = (state: RootState) => state.users.list;

export default slice.reducer;
