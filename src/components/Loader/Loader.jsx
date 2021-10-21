import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <img style={{ width: "25%" }} src="loading.gif" alt="loader" />
    </div>
  );
};

export default Loader;
