import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './storeUtils';
import { eventTypes } from '@/mock/eventTypes';

const slice = createSlice({
  name: 'eventTypes',
  initialState: {
    list: eventTypes,
  },
  reducers: {},
});

// Action creators are generted for each case reducer function
export const { } = slice.actions;

export const eventTypeListSelector = (state: RootState) => state.eventTypes.list;

export default slice.reducer;
