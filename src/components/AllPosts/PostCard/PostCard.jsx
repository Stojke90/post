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
import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useStyles from "./style";
import { useDeletePostMutation } from "../../../features/fetchPostApi";

const PostCard = ({ postData }) => {
  // css styles,from material ui
  const classes = useStyles();
  // set publish time
  const time = (data) => data.split("T").join(" ").split(".")[0];
  //delete post
  const [deletePost] = useDeletePostMutation();

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
              image={postData.owner.picture}
            />
            <Typography varinat="body1">
              {postData.owner.title}. {postData.owner.firstName}{" "}
              {postData.owner.lastName}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            alt="post"
            height="100"
            image={postData.image}
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
              {postData.text}
            </Typography>
            <Typography
              varinat="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Publish: {time(postData.publishDate)}
            </Typography>
            {postData.tags.map((text) => (
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
              label={postData.likes}
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
            to={`/${postData.id}`}
          >
            DETAILS
          </Button>
          <Button
            style={{ width: "45%" }}
            variant="contained"
            component={Link}
            to={`/${postData.id}/edit`}
          >
            EDIT
          </Button>
          <Button
            style={{ width: "90%", margin: "0.8rem auto" }}
            color="error"
            variant="contained"
            onClick={() =>
              deletePost(postData.id).then((res) => console.log(res.data.id))
            }
          >
            DELETE
          </Button>
        </Grid>
      </Card>
    </Grid>
  );
};

export default PostCard;
