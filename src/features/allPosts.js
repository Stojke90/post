import { createSlice } from "@reduxjs/toolkit";

// state for all users
export const postsSlice = createSlice({
  name: "allPosts",
  initialState: { value: [] },
  reducers: {
    allPosts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { allPosts } = postsSlice.actions;

export default postsSlice.reducer;
