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

const Comment = ({ details, date, setPostComment, sendComment }) => {
  //state for reset input value
  const [value, setValue] = useState("");
  // send comment and reset input
  const sendPost = () => {
    sendComment();
    setValue("");
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
          value={value}
          fullWidth
          onChange={(e) => {
            setPostComment(e);
            setValue(e.target.value);
          }}
        />
        <Button
          variant="contained"
          sx={{ margin: "0.5rem" }}
          onClick={() => sendPost()}
        >
          Send commentar
        </Button>
      </Card>

      {details.comments?.map((data) => (
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
