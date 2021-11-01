import Grid from "@mui/material/Grid";
import React from "react";
import Loader from "../Loader/Loader";
import {
  useGetPostQuery,
  useGetCommentsQuery,
} from "../../features/fetchPostApi";
import Comment from "./Comment/Comment";
import PostUserDetails from "./PostUserDetails/PostUserDetails";
import { Typography } from "@mui/material";

const PostDetails = (props) => {
  // get post by id
  const { isFetching, data, error } = useGetPostQuery(props.match.params.id);
  // get comments for post
  const { data: commentsData, refetch } = useGetCommentsQuery(
    props.match.params.id
  );

  // convert date
  const date = (data) => {
    const time = data.split("T")[0].split("-");
    const publishDate = new Date(time[0], time[1] - 1, time[2]).toDateString();
    return publishDate;
  };

  return (
    <>
      {isFetching && <Loader />}
      {error && (
        <Typography
          variant="h3"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "red",
            fontWeight: "bolder",
          }}
        >
          {error.data.error.split("_").join(" ")}
        </Typography>
      )}
      {data !== undefined && (
        <Grid
          container
          spacing={2}
          style={{
            justifyContent: "center",
            padding: "1rem",
            background: "repeating-radial-gradient(#00000005, #0000ff1a 100px)",
          }}
        >
          <PostUserDetails data={data} date={date} />
          <Comment
            date={date}
            refetch={refetch}
            data={data}
            commentsData={commentsData}
          />
        </Grid>
      )}
    </>
  );
};

export default PostDetails;
