import { createSlice } from "@reduxjs/toolkit";

import { UserForm, UserRequestDTO } from "@/config/dto/request";
import { User } from "@/config/erd";
import { DEFAULT_COMMON_STATE, CommonSliceState } from "../common";
import { RootState } from "../storeUtils";
import { fetchUsers } from "./fetchUsers";
import createUser from "./createUser";
import updateUser from "./updateUser";

const initialState: CommonSliceState<User, UserForm> = DEFAULT_COMMON_STATE;

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userDetailCleared: (state) => {
      state.detail = null;
      state.detailStatus = "idle";
    },
    userDetailLoaded: (state, action) => {
      state.detail = action.payload;
      state.detailStatus = "succeeded";
    },
    userDeleted: (state, action) => {
      state.list = state.list.filter(
        (resource) => resource.uid !== action.payload
      );
    },
  },
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
      })

      // POST
      .addCase(createUser.pending, (state) => {
        state.detailInAction = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.detailInAction = false;
        if (!action.payload) {
          return;
        }

        state.list.push(action.payload);
        state.detail = action.payload;
      })
      .addCase(createUser.rejected, (state) => {
        state.detailInAction = false;
      })

      // PUT
      .addCase(updateUser.pending, (state) => {
        state.detailInAction = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.detailInAction = false;
        state.list = state.list.map((resource) => {
          if (resource.uid === action.payload.uid) {
            return {
              ...resource,
              ...action.payload,
            };
          }
          return resource;
        });
      })
      .addCase(updateUser.rejected, (state) => {
        state.detailInAction = false;
      });

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
export const { userDeleted, userDetailCleared, userDetailLoaded } =
  slice.actions;

export const usersStatusSelector = (state: RootState) => state.users.status;
export const usersSelector = (state: RootState) => state.users.list;

export const detailUserStatusSelector = (state: RootState) =>
  state.users.detailStatus;
export const detailUserSelector = (state: RootState) => state.users.detail;
export const detailUserInActionSelector = (state: RootState) =>
  state.resources.detailInAction;

export default slice.reducer;
