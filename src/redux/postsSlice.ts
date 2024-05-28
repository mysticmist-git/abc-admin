import { createSlice } from '@reduxjs/toolkit';
import { posts } from '@/mock/posts';
import { RootState } from './storeUtils';

const slice = createSlice({
  name: 'posts',
  initialState: {
    list: posts,
  },
  reducers: {},
});

// Action creators are generted for each case reducer function
export const {} = slice.actions;

export const postListSelector = (state: RootState) => state.posts.list;

export default slice.reducer;
