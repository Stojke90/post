import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "../features/fetchPostApi";
import randomOwnerReducer from "../features/randomOwner";

const store = configureStore({
  reducer: {
    owner: randomOwnerReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

export default store;
