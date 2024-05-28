
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './storeUtils';
import { departments } from '@/mock/departments';

const slice = createSlice({
  name: 'departments',
  initialState: {
    list: departments,
  },
  reducers: {},
});

// Action creators are generted for each case reducer function
export const { } = slice.actions;

export const departmentsSelector = (state: RootState) => state.departments.list;

export default slice.reducer;
