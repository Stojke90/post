import { Button, Grid, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { pageNumber } from "../../features/pageNumber";
import Loader from "../Loader/Loader";
import PostCard from "./PostCard/PostCard";
import useStyles from "./style";

const AllPosts = () => {
  // css styles,from material ui
  const classes = useStyles();
  // geter for state of all users
  const allPosts = useSelector((state) => state.allPosts.value);
  // geter for state of all number of pages
  const pages = useSelector((state) => state.numberOfPages.value);
  // geter for state number of page
  const number = useSelector((state) => state.pageNumber.value);
  // redux
  const dispatch = useDispatch();
  // load next page
  const handleChange = (e, value) => dispatch(pageNumber(value));

  return (
    <Grid container className={classes.con}>
      <Grid item className={classes.nav_bar}>
        <Typography color="#fff" variant="h2" sx={{ marginBottom: "1rem" }}>
          App User's
        </Typography>

        <Button
          component={Link}
          to={"/create"}
          variant="outlined"
          color="error"
        >
          Create new post
        </Button>
      </Grid>

      <Grid
        item
        xs={11}
        sm={11}
        md={11}
        lg={11}
        xl={11}
        className={classes.post}
      >
        {allPosts.length ? (
          allPosts.map((data) => <PostCard key={uuidv4()} data={data} />)
        ) : (
          <Loader />
        )}
      </Grid>
      {allPosts.length && (
        <Pagination
          count={pages}
          page={number}
          boundaryCount={1}
          color="primary"
          sx={{ margin: "2.5rem" }}
          size="medium"
          onChange={handleChange}
        />
      )}
    </Grid>
  );
};

export default AllPosts;
