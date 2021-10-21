import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  post_card: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    boxShadow: "0 0 5px 1px #00000094 !important",
    transform: "scale(1.0)",
    transition: "all 1.5s !important",
    "&:hover": {
      transform: "scale(1.085)",
      boxShadow: "0 0 14px 4px #000000b8 !important",
    },
  },
  owner_data_con: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  owner_img: {
    borderRadius: "50%",
    width: "3rem !important",
  },
  post_text: {
    fontWeight: "bold !important",
    marginTop: "0.5rem !important",
    width: "80%",
  },
  tags_hash: {
    display: "inline-block",
    backgroundColor: "red",
    padding: "3px 6px",
    marginRight: "3px !important",
    borderRadius: "0.4rem",
    color: "#fff",
  },
  btn_con: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
});

export default useStyles;
