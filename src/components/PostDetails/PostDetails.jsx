import Grid from "@mui/material/Grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HEADERS, MAIN_ROUTE } from "../../App";
import Loader from "../Loader/Loader";
import Comment from "./Comment/Comment";
import PostUserDetails from "./PostUserDetails/PostUserDetails";

const PostDetails = (props) => {
  // state for post details and comments
  const [details, setDetails] = useState({});
  //state for comment
  const [comment, setComments] = useState({});

  //state for comment
  useEffect(() => {
    if (props.match.params.id) {
      axios
        .all([
          axios.get(
            `${MAIN_ROUTE}post/${props.match.params.id}/comment`,
            HEADERS
          ),
          axios.get(`${MAIN_ROUTE}post/${props.match.params.id}`, HEADERS),
        ])
        .then(
          axios.spread((comm, post) => {
            if (comm.status === 200 && post.status === 200)
              setDetails({
                comments: comm.data.data,
                post: post.data,
              });
          })
        )
        .catch((error) => alert(error.message));
    }
  }, [props]);

  // convert date
  const date = (data) => {
    const time = data.split("T")[0].split("-");
    const publishDate = new Date(time[0], time[1] - 1, time[2]).toDateString();
    return publishDate;
  };
  // get message for post comment
  const setPostComment = (e) => {
    setComments({
      message: e.target.value,
      post: details.post.id,
      owner: details.post.owner.id,
    });
  };
  // send comment on database
  const sendComment = () => {
    axios
      .post(`${MAIN_ROUTE}comment/create`, comment, HEADERS)
      .then(
        (res) =>
          res.status === 200 &&
          alert("Comment successfully sent: ", res.data.message)
      )
      .catch((error) => alert(error.message));
  };

  return Object.keys(details).length > 0 ? (
    <Grid
      container
      spacing={2}
      style={{
        justifyContent: "center",
        padding: "1rem",
        background: "repeating-radial-gradient(#00000005, #0000ff1a 100px)",
      }}
    >
      <PostUserDetails details={details} date={date} />

      <Comment
        setPostComment={setPostComment}
        details={details}
        date={date}
        sendComment={sendComment}
      />
    </Grid>
  ) : (
    <Loader />
  );
};

export default PostDetails;
