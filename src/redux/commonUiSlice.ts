import { createSlice } from "@reduxjs/toolkit";

export type CommonUIState = {
  detailDataLoading: boolean;
  mainPageDataLoading: boolean;
};

const initialState: CommonUIState = {
  detailDataLoading: false,
  mainPageDataLoading: false,
};

const slice = createSlice({
  name: "postTypes",
  initialState,
  reducers: {
    mainPageDataLoading: (state) => {
      state.mainPageDataLoading = true;
    },
    mainPageDataLoaded: (state) => {
      state.mainPageDataLoading = false;
    },
    detailDataLoading: (state) => {
      state.detailDataLoading = true;
    },
    detailDataLoaded: (state) => {
      state.detailDataLoading = false;
    },
  },
});

// Action creators are generted for each case reducer function
export const {
  mainPageDataLoading,
  mainPageDataLoaded,
  detailDataLoading,
  detailDataLoaded,
} = slice.actions;

export default slice.reducer;
