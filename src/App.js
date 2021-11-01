import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import {
  AllPosts,
  CreatePost,
  EditPost,
  PostDetails,
} from "./importComponents";

export const HEADERS = { headers: { "app-id": process.env.REACT_APP_API_KEY } };
export const MAIN_ROUTE = process.env.REACT_APP_MAIN_ROUTE;
const App = () => {
  return (
    <>
      <Switch>
        <Route exact path={"/"} component={AllPosts} />
        <Route exact path={"/create"} component={CreatePost} />
        <Route exact path={"/:id"} component={PostDetails} />
        <Route exact path={"/:id/edit"} component={EditPost} />
      </Switch>
    </>
  );
};

export default App;
