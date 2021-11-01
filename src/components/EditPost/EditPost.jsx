import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  useGetPostQuery,
  useUpdatePostMutation,
  useAddPostMutation,
} from "../../features/fetchPostApi";
import { useSelector } from "react-redux";

const EditPost = (props) => {
  // from react routem use location for check pathname
  const location = useLocation();

  // EDIT POST

  // get post by id
  const { isSuccess: editSuccess, data: editData } = useGetPostQuery(
    location.pathname !== "/create" && props.match.params.id
  );

  // send update post
  const [updatePost, { status }] = useUpdatePostMutation();

  // state for  a post that will change
  const [editPost, setEditPost] = useState({
    image: "",
    link: "",
    tags: [""],
    text: "",
  });

  // when post find by id success find set data in local state
  useEffect(() => {
    editSuccess &&
      location.pathname === `/${props.match.params.id}/edit` &&
      setEditPost({
        id: editData.id,
        image: editData.image,
        link: editData.link,
        tags: editData.tags,
        text: editData.text,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editSuccess]);

  // edit tags value
  const handleTags = (e, i) => {
    const arrTags = [...editPost.tags];
    arrTags[i] = e.target.value;

    setEditPost({ ...editPost, tags: arrTags });
  };

  // CREATE NEW POST

  // random selected owner
  const randomOwner = useSelector((state) => state.owner.value);

  // initial state for new post
  const newPostInitialValue = {
    text: "",
    image: "",
    likes: Math.round(Math.random() * 100),
    tags: [""],
    owner: randomOwner.id,
  };
  // state for new post
  const [newPost, setNewPost] = useState(newPostInitialValue);
  // adding new input for tag
  const addInput = () => {
    let inputTags = newPost.tags;
    inputTags.push("");
    setNewPost({ ...newPost, tags: [...inputTags] });
  };
  // remove last input for tag
  const removeInput = () => {
    let inputTags = newPost.tags;
    inputTags.pop();
    setNewPost({ ...newPost, tags: [...inputTags] });
  };

  // fill tags input
  const fillTag = (e, i) => {
    const arrTags = newPost.tags;
    arrTags[i] = e.target.value;
    setNewPost({ ...newPost, tags: [...arrTags] });
  };

  // disable button if inputs are empthy
  const disableButton = () => {
    if (newPost.text !== "" && newPost.image !== "" && newPost.tags[0] !== "") {
      return false;
    } else {
      return true;
    }
  };

  // create new post,send data to database
  const [createPost, { isSuccess }] = useAddPostMutation();

  useEffect(() => {
    if (isSuccess) {
      alert("Successfully saved modified data");
      setNewPost(newPostInitialValue);
    }
    // eslint-disable-next-line
  }, [isSuccess]);

  // universal
  const editQueastion = editPost.image ? editPost.image : "/logo192.png";
  const newQuestion = newPost.image ? newPost.image : "/logo192.png";
  const isCreateRoute = location.pathname === `/create`;

  return (
    <div style={{ width: "100%", padding: "0.8rem" }}>
      <Typography variant="h5" align="center" sx={{ margin: "1rem 0" }}>
        {isCreateRoute ? "CREATE POST" : "EDIT POST"}
      </Typography>

      <Card
        sx={{
          maxWidth: 430,
          minWidth: 300,
          margin: "0 auto 2rem",
          boxShadow: "0 0 4px 1px #0000008f",
        }}
      >
        <CardContent>
          <CardMedia
            component="img"
            image={isCreateRoute ? newQuestion : editQueastion}
            alt="post"
          />
          <TextField
            type="text"
            label="Url path"
            variant="standard"
            value={isCreateRoute ? newPost.image : editPost.image}
            fullWidth
            margin="dense"
            onChange={(e) =>
              isCreateRoute
                ? setNewPost({ ...newPost, image: e.target.value })
                : setEditPost({ ...editPost, image: e.target.value })
            }
          />
        </CardContent>
        <CardContent>
          <TextField
            type="text"
            label="Description"
            multiline
            variant="standard"
            value={isCreateRoute ? newPost.text : editPost.text}
            fullWidth
            margin="dense"
            onChange={(e) =>
              isCreateRoute
                ? setNewPost({ ...newPost, text: e.target.value })
                : setEditPost({ ...editPost, text: e.target.value })
            }
          />
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {!isCreateRoute &&
            editPost.tags?.map((text, i) => (
              <TextField
                key={i}
                type="text"
                label="Tag"
                multiline
                variant="outlined"
                value={text}
                margin="dense"
                onChange={(e) => handleTags(e, i)}
              />
            ))}
          {isCreateRoute &&
            newPost.tags.map((tag, i) => (
              <TextField
                key={i}
                type="text"
                label="Tag"
                multiline
                sx={{ width: "55.55%" }}
                variant="outlined"
                value={tag}
                margin="dense"
                onChange={(e) => fillTag(e, i)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      sx={{ position: "relative", left: "40px" }}
                      position="end"
                    >
                      {i === newPost.tags.length - 1 && (
                        <IconButton edge="end" onClick={() => addInput()}>
                          {newPost.tags.length <= 5 && <AddIcon />}
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment
                      sx={{ position: "relative", right: "50px" }}
                      position="start"
                    >
                      {i === newPost.tags.length - 1 && (
                        <IconButton onClick={() => removeInput()} edge="end">
                          {newPost.tags.length > 1 && <RemoveIcon />}
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            ))}
        </CardContent>
        <CardActions sx={{ justifyContent: "space-around" }}>
          <Button
            variant="outlined"
            component={Link}
            to={"/"}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            disabled={isCreateRoute ? disableButton() : false}
            onClick={() =>
              isCreateRoute
                ? createPost(newPost)
                : updatePost(editPost).then(
                    () =>
                      status === "fulfilled" &&
                      alert("The post was successfully saved")
                  )
            }
          >
            {isCreateRoute ? "Create" : "Save"}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default EditPost;
