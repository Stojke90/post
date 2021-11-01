import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAddCommentMutation } from "../../../features/fetchPostApi";

const Comment = ({ date, commentsData, data, refetch }) => {
  // initial state
  const initialValue = data !== undefined && {
    message: "",
    owner: data.owner.id,
    post: data.id,
  };
  // state for send comment
  const [comment, setComment] = useState(initialValue);
  // add comment
  const [sendComment] = useAddCommentMutation();
  // fun for adding comment and refetch comments and clear input field
  const handleComment = () => {
    sendComment(comment)
      .unwrap()
      .then(() => {
        setComment(initialValue);
        alert("Successfully added a comment");
        refetch();
      })
      .catch((error) => console.log("greska", error));
  };

  return (
    <Grid item sm={8} md={8} xl={8}>
      <Card
        raised
        sx={{
          marginBottom: "0.5rem",
          textAlign: "center",
          padding: "0.5rem",
        }}
      >
        <TextField
          multiline
          label="Put your comments"
          variant="standard"
          type="text"
          value={comment.message}
          fullWidth
          onChange={(e) => {
            setComment({ ...comment, message: e.target.value });
          }}
        />
        <Button
          variant="contained"
          disabled={comment.message ? false : true}
          sx={{ margin: "0.5rem" }}
          onClick={() => handleComment()}
        >
          Send commentar
        </Button>
      </Card>

      {commentsData !== undefined &&
        commentsData.data.map((data) => (
          <Card
            raised
            sx={{ minWidth: 275, border: "solid thin", marginBottom: "0.5rem" }}
            key={uuidv4()}
          >
            <CardContent style={{ padding: 0 }}>
              <CardHeader
                avatar={<Avatar src={data.owner.picture} alt="image" />}
                title={`${data.owner.title}. ${data.owner.firstName} ${data.owner.lastName}`}
                subheader={date(data.publishDate)}
              />
              <Typography
                paragraph
                style={{ textIndent: "5rem", fontStyle: "italic" }}
              >
                {data.message}
              </Typography>
            </CardContent>
          </Card>
        ))}
      <Button
        variant="contained"
        component={Link}
        to={"/"}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
    </Grid>
  );
};

export default Comment;
