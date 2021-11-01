import { createSlice } from "@reduxjs/toolkit";

// state for all users
export const randomOwnerSlice = createSlice({
  name: "owner",
  initialState: { value: {} },
  reducers: {
    randomOwner: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { randomOwner } = randomOwnerSlice.actions;

export default randomOwnerSlice.reducer;
