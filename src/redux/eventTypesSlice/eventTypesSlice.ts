import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../storeUtils";
import { fetchEventTypes } from "./fetchEventTypes";
import { CommonSliceState } from "../common";
import { EventType } from "@/config/erd";

const initialState: CommonSliceState<EventType> = {
  list: [],
  status: "idle",
};

const slice = createSlice({
  name: "eventTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEventTypes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchEventTypes.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.list = action.payload;
    });
    builder.addCase(fetchEventTypes.rejected, (state) => {
      state.status = "failed";
    });
  },
});

// Action creators are generted for each case reducer function
export const {} = slice.actions;

export const eventTypesStatusSelector = (state: RootState) =>
  state.eventTypes.status;
export const eventTypeListSelector = (state: RootState) =>
  state.eventTypes.list;

export default slice.reducer;
