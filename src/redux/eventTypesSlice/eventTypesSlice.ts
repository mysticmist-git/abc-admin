import { createSlice } from "@reduxjs/toolkit";

import { EventTypeRequestDTO } from "@/config/dto/request";
import { EventType } from "@/config/erd";
import { CommonSliceState, DEFAULT_COMMON_STATE } from "../common";
import { RootState } from "../storeUtils";
import { fetchEventTypes } from "./fetchEventTypes";

const initialState: CommonSliceState<EventType, EventTypeRequestDTO> =
  DEFAULT_COMMON_STATE;

const slice = createSlice({
  name: "eventTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventTypes.pending, (state) => {
        state.status = "loading";
        state.list = [];
      })
      .addCase(fetchEventTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchEventTypes.rejected, (state) => {
        state.status = "failed";
        state.list = [];
      });
  },
});

// Action creators are generted for each case reducer function
export const {} = slice.actions;

export const eventTypesStatusSelector = (state: RootState) =>
  state.eventTypes.status;
export const eventTypesSelector = (state: RootState) => state.eventTypes.list;

export default slice.reducer;
