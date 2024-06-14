import { createSlice } from "@reduxjs/toolkit";

import { UserRequestDTO } from "@/config/dto/request";
import { User } from "@/config/erd";
import { DEFAULT_COMMON_STATE, CommonSliceState } from "../common";
import { RootState } from "../storeUtils";
import { fetchUsers } from "./fetchUsers";

const initialState: CommonSliceState<User, UserRequestDTO> =
  DEFAULT_COMMON_STATE;

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.list = [];
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
        state.list = [];
      });
  },
});

// Action creators are generted for each case reducer function
export const _ = slice.actions;

export const usersStatusSelector = (state: RootState) => state.users.status;
export const usersSelector = (state: RootState) => state.users.list;

export default slice.reducer;
