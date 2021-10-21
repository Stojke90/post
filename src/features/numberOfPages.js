import { createSlice } from "@reduxjs/toolkit";

// state for all users
export const numberSlice = createSlice({
  name: "numberOfPages",
  initialState: { value: 0 },
  reducers: {
    numberOfPages: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { numberOfPages } = numberSlice.actions;

export default numberSlice.reducer;
