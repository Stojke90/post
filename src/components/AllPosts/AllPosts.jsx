import { Button, Grid, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useFetchPostsQuery } from "../../features/fetchPostApi";
import { randomOwner } from "../../features/randomOwner";
import Loader from "../Loader/Loader";
import PostCard from "./PostCard/PostCard";
import useStyles from "./style";

const AllPosts = () => {
  // css styles,from material ui
  const classes = useStyles();
  // redux
  const dispatch = useDispatch();
  // state for set number of page view
  const [pageNumber, setPageNumber] = useState(1);
  // redux api for fetch 12 posts from page number 0,initial is  page = 0
  const { data, isError, error, isFetching } = useFetchPostsQuery(
    pageNumber - 1
  );
  // get number of pages of posts
  let numberOfPages = data !== undefined && Math.ceil(data.total / data.limit);
  // change page in pagination,fetch another posts
  const handleChangePage = (e, newPage) => setPageNumber(newPage);
  // set random owner for creating new post
  useEffect(() => {
    data !== undefined &&
      dispatch(
        randomOwner(
          data.data[Math.round(Math.random() * data.data.length)].owner
        )
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Grid container className={classes.con}>
      <Grid item className={classes.nav_bar}>
        <Typography
          color="#fff"
          variant="h2"
          sx={{
            marginBottom: "1rem",
            "@media (max-width: 380px)": { fontSize: "3rem" },
          }}
        >
          User's Posts
        </Typography>

        <Button
          component={Link}
          to={"/create"}
          variant="contained"
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
        {isFetching && <Loader />}

        {data !== undefined &&
          data.data.map((postData) => (
            <PostCard key={uuidv4()} postData={postData} />
          ))}

        {isError && (
          <Typography
            variant="h5"
            color="secondary"
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: "bold",
            }}
          >
            {error.data.error.split("_").join(" ")}
          </Typography>
        )}
      </Grid>
      {data !== undefined && (
        <Pagination
          count={numberOfPages}
          page={pageNumber}
          boundaryCount={1}
          color="primary"
          sx={{ margin: "2.5rem" }}
          size="medium"
          onChange={handleChangePage}
        />
      )}
    </Grid>
  );
};

export default AllPosts;
