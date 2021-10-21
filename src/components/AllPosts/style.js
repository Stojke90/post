import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  nav_bar: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
    alignItems: "center",
    marginBottom: "1rem",
    padding: "1rem",
    borderBottom: "groove 3px #000",
    boxShadow: "inset 0px -6px 14px 0px #000",
    background: "linear-gradient(45deg, #008080, transparent)",
    "@media (max-width: 600px)": {
      flexDirection: "column !important",
    },
  },
  post: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "auto",
  },
  con: {
    background: "#f0f8ff",
    justifyContent: "center",
  },
});

export default useStyles;
