import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './storeUtils';
import { postTypes } from '@/mock/postTypes';

const slice = createSlice({
  name: 'postTypes',
  initialState: {
    list: postTypes,
  },
  reducers: {},
});

// Action creators are generted for each case reducer function
export const {} = slice.actions;

export const postTypeListSelector = (state: RootState) => state.postTypes.list;

export default slice.reducer;
