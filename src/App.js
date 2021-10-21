import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { allPosts } from "./features/allPosts";
import { numberOfPages } from "./features/numberOfPages";
import {
  AllPosts,
  CreatePost,
  EditPost,
  PostDetails,
} from "./importComponents";

export const HEADERS = { headers: { "app-id": process.env.REACT_APP_API_KEY } };
export const MAIN_ROUTE = process.env.REACT_APP_MAIN_ROUTE;
const App = () => {
  // redux
  const dispatch = useDispatch();
  // geter for state number of page
  const pageNumber = useSelector((state) =>
    state.pageNumber.value === 0
      ? state.pageNumber.value
      : state.pageNumber.value - 1
  );

  // initial fetch all posts from database
  useEffect(() => {
    axios
      .get(`${MAIN_ROUTE}post?page=${pageNumber}&limit=12`, HEADERS)
      .then((res) => {
        res.status === 200 && dispatch(allPosts(res.data.data));
        dispatch(numberOfPages(Math.ceil(res.data.total / res.data.limit)));
      })
      .catch((error) => alert(error.message));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

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
