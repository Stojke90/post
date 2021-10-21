import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { allPosts } from "../../../features/allPosts";
import useStyles from "./style";
import { MAIN_ROUTE, HEADERS } from "../../../App";

const PostCard = ({ data }) => {
  // css styles,from material ui
  const classes = useStyles();
  // redux
  const dispatch = useDispatch();
  // set publish time
  const time = (data) => data.split("T").join(" ").split(".")[0];
  // geter for state of all users
  const posts = useSelector((state) => state.allPosts.value);
  // delete post
  const deletePost = (id) => {
    axios
      .delete(`${MAIN_ROUTE}post/${id}`, HEADERS)
      .then((res) => {
        res.status === 200 && console.log(res.data.id);
        dispatch(allPosts(posts.filter((data) => data.id !== res.data.id)));
      })
      .catch((error) => alert(error.message));
  };
  return (
    <Grid
      item
      xs={10}
      sm={6}
      md={4}
      lg={3}
      xl={3}
      style={{ padding: "0.8rem", maxWidth: "300px" }}
    >
      <Card className={classes.post_card}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CardContent className={classes.owner_data_con}>
            <CardMedia
              className={classes.owner_img}
              component="img"
              alt="user"
              image={data.owner.picture}
            />
            <Typography varinat="body1">
              {data.owner.title}. {data.owner.firstName} {data.owner.lastName}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            alt="post"
            height="100"
            image={data.image}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CardContent style={{ position: "relative" }}>
            <Typography
              varinat="h6"
              gutterBottom
              noWrap
              className={classes.post_text}
            >
              {data.text}
            </Typography>
            <Typography
              varinat="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Publish: {time(data.publishDate)}
            </Typography>
            {data.tags.map((text) => (
              <Typography
                key={uuidv4()}
                gutterBottom
                className={classes.tags_hash}
                varinat="h6"
              >
                {text}
              </Typography>
            ))}

            <Chip
              style={{
                position: "absolute",
                right: "5px",
                top: "5px",
              }}
              icon={<FavoriteIcon style={{ color: "red" }} />}
              label={data.likes}
            />
          </CardContent>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className={classes.btn_con}
        >
          <Button
            style={{ width: "45%" }}
            variant="contained"
            component={Link}
            to={`/${data.id}`}
          >
            DETAILS
          </Button>
          <Button
            style={{ width: "45%" }}
            variant="contained"
            component={Link}
            to={`/${data.id}/edit`}
          >
            EDIT
          </Button>
          <Button
            style={{ width: "90%", margin: "0.8rem auto" }}
            color="error"
            variant="contained"
            onClick={() => deletePost(data.id)}
          >
            DELETE
          </Button>
        </Grid>
      </Card>
    </Grid>
  );
};

export default PostCard;
