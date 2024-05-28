import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./storeUtils";
import axios from "axios";
import { SERVER_URL } from "@/config/api";
import { ApiCallStatus } from "./common";
import { User } from "@/config/erd";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const url = `${SERVER_URL}/api/v0/User/getAll`;

  console.log("url", url);

  const body = {
    page: 1,
    limit: 10,
  };

  const response = await axios.post(url, {
    ...body,
  });

  return response.data;
});

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
