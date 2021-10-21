import { createSlice } from "@reduxjs/toolkit";

// state for all users
export const loadPageSlice = createSlice({
  name: "pageNumber",
  initialState: { value: 0 },
  reducers: {
    pageNumber: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { pageNumber } = loadPageSlice.actions;

export default loadPageSlice.reducer;
