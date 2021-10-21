import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { HEADERS, MAIN_ROUTE } from "../../App";
import Loader from "../Loader/Loader";

const EditPost = (props) => {
  // from react routem use location for check pathname
  const location = useLocation();

  // const for path create new post
  const pathNewPost = location.pathname === "/create";

  // geter for state of all users
  const posts = useSelector((state) => state.allPosts.value);

  // initial value of new post with owner and post data
  const initialValueNewPost = {
    text: "",
    image: "",
    likes: Math.round(Math.random() * 100),
    tags: [],
    owner: posts[0].owner.id,
  };

  // state for post
  const [editPost, setEditPost] = useState({});
  // state for create new post
  const [newPost, setNewPost] = useState(initialValueNewPost);
  // state for number of inputs
  const [inputs, setInputs] = useState([1]);
  // state for new input field
  const [inputValue, setInputValue] = useState("");

  // find post by id,set in session storage soo if page is refresh data is not lost
  useEffect(() => {
    if (!pathNewPost) {
      if (posts.length && props.match.params.id) {
        let forEditPost = posts.find(
          (post) => post.id === props.match.params.id
        );
        sessionStorage.setItem("post", JSON.stringify(forEditPost));
        let data = JSON.parse(sessionStorage.getItem("post"));
        setEditPost(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  // edit tags value
  const handleTags = (e, i) => {
    const arrTags = [...editPost.tags];
    arrTags[i] = e.target.value;

    setEditPost({ ...editPost, tags: arrTags });
  };

  // send edit data
  const saveData = (id) => {
    axios
      .put(`${MAIN_ROUTE}post/${id}`, editPost, HEADERS)
      .then((res) => {
        res.status === 200 && console.log("response: ", res.data);
        alert("Successfully saved modified data");
      })
      .catch((error) => alert("EditPost", error.message));
  };

  // remove last input
  const removeItem = (index) =>
    setInputs(inputs.filter((data, i) => i !== index));

  // new text field(input) and set tag in array
  const set = () => {
    setInputs([...inputs, 1]);
    const array = newPost.tags;

    array.push(inputValue);
    setInputValue("");
  };

  // send post to database
  const sendPost = () => {
    const array = newPost.tags;
    array.push(inputValue);
    axios
      .post(`${MAIN_ROUTE}post/create`, newPost, HEADERS)
      .then((res) => {
        res.status === 200 && console.log(res.data);
        alert("Successfully made post ...");
        setNewPost(initialValueNewPost);
        setInputValue("");
        setInputs([1]);
        window.document.querySelector("#tagInput").value = "";
      })
      .catch((error) => alert(error.message));
  };

  return Object.keys(editPost).length !== 0 || pathNewPost ? (
    <Grid container sx={{ justifyContent: "center", padding: "1rem" }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ width: "100%", padding: "1rem" }}
      >
        {pathNewPost ? "Create New Post" : "EditPost"}
      </Typography>
      <Card
        sx={{
          maxWidth: "80%",
          minWidth: "60%",
          boxShadow: "0 0 8px 2px #000000cf",
          "@media (max-width: 600px)": {
            maxWidth: "90%",
          },
        }}
      >
        <CardContent>
          <CardMedia
            component="img"
            height="300px"
            image={pathNewPost ? newPost.image : editPost.image}
            alt="post"
          />
          <TextField
            label="Post Image"
            variant="standard"
            type="text"
            sx={{
              width: "80%",
              display: "flex",
              margin: "1rem auto 0",
            }}
            required
            value={pathNewPost ? newPost.image : editPost.image}
            onChange={(e) =>
              pathNewPost
                ? setNewPost({ ...newPost, image: e.target.value })
                : setEditPost({ ...editPost, image: e.target.value })
            }
          />
        </CardContent>

        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            label="Text description"
            variant="standard"
            type="text"
            required
            sx={{
              width: "50%",
              "@media (max-width: 600px)": {
                width: "80%",
              },
            }}
            multiline
            value={pathNewPost ? newPost.text : editPost.text}
            onChange={(e) =>
              pathNewPost
                ? setNewPost({ ...newPost, text: e.target.value })
                : setEditPost({ ...editPost, text: e.target.value })
            }
          />
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!pathNewPost
            ? editPost?.tags.map((text, i) => (
                <TextField
                  key={i}
                  label="Tag"
                  required
                  type="text"
                  margin="dense"
                  sx={{
                    width: "50%",
                    "@media (max-width: 600px)": {
                      width: "80%",
                    },
                  }}
                  value={text}
                  onChange={(e) => handleTags(e, i)}
                />
              ))
            : inputs.map((data, i) => (
                <TextField
                  label="Tag"
                  required
                  id="tagInput"
                  margin="dense"
                  type="text"
                  key={i}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        sx={{ position: "relative", left: "40px" }}
                        position="end"
                      >
                        {i === inputs.length - 1 && (
                          <IconButton
                            onClick={() => set()}
                            aria-label="toggle password visibility"
                            edge="end"
                          >
                            {inputs.length <= 5 && <AddIcon />}
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment
                        sx={{ position: "relative", right: "50px" }}
                        position="start"
                      >
                        {i === inputs.length - 1 && (
                          <IconButton
                            onClick={() => removeItem(i)}
                            aria-label="toggle password visibility"
                            edge="end"
                          >
                            {inputs.length > 1 && <RemoveIcon />}
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: "50%",
                    "@media (max-width: 600px)": {
                      width: "80%",
                    },
                  }}
                  value={inputValue.name}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              ))}
        </CardContent>
        <CardActions
          sx={{ justifyContent: "space-evenly", marginBottom: "1rem" }}
        >
          <Button
            variant="contained"
            component={Link}
            to={"/"}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={
              pathNewPost
                ? newPost.image && newPost.text
                  ? false
                  : true
                : false
            }
            onClick={() => (pathNewPost ? sendPost() : saveData(editPost.id))}
          >
            {pathNewPost ? "Create" : "Save"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ) : (
    !pathNewPost && <Loader />
  );
};

export default EditPost;
