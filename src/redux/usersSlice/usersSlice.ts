import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../storeUtils";
import { ApiCallStatus } from "../common";
import { User } from "@/config/erd";
import { fetchUsers } from "./fetchUsers";

type UserSliceState = {
  list: User[];
  status: ApiCallStatus;
};

const initialState: UserSliceState = {
  list: [],
  status: "idle",
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

export const userListSelector = (state: RootState) => state.users.list;

export default slice.reducer;
