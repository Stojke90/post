import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const PostUserDetails = ({ details, date }) => {
  return (
    <Grid
      item
      sm={8}
      md={8}
      xl={8}
      style={{
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Card sx={{ maxWidth: "450px", border: "solid thin", padding: "0.3rem" }}>
        <CardHeader
          avatar={<Avatar src={details.post.owner.picture} alt="image" />}
          title={`${details.post.owner.title}. ${details.post.owner.firstName} ${details.post.owner.lastName}`}
          subheader={date(details.post.publishDate)}
          action={
            <Chip
              icon={<FavoriteIcon style={{ color: "red" }} />}
              label={details.post.likes}
            />
          }
        />

        <CardMedia
          component="img"
          sx={{
            objectFit: "cover",
            padding: "0.8rem",
            border: "groove #808080",
          }}
          image={details.post.image}
          alt="post"
        />
        <CardContent>
          <Typography
            variant="body2"
            style={{ marginBottom: "0.5rem" }}
            color="text.secondary"
          >
            {details.post.text}
          </Typography>
          <Link
            href={details.post.link}
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Visit the user's page
          </Link>
          {details.post.tags.map((text) => (
            <Typography
              key={uuidv4()}
              style={{
                display: "inline-block",
                backgroundColor: "red",
                padding: "3px 6px",
                marginRight: "3px",
                borderRadius: "0.4rem",
                color: "#fff",
                marginBottom: "0.5rem",
              }}
            >
              {text}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PostUserDetails;
