import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import allPostsReducer from "./features/allPosts";
import numberOfPagesReducer from "./features/numberOfPages";
import pageLoadReducer from "./features/pageNumber";

const store = configureStore({
  reducer: {
    allPosts: allPostsReducer,
    numberOfPages: numberOfPagesReducer,
    pageNumber: pageLoadReducer,
  },
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
