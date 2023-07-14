import React from "react";
import timee from "../assets/img/timee.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const InboundTime = () => {
  const handleImageClick = () => {};

  return (
    <Link to="/targettime/inboundAmount">
      <Button sx={{ color: "white" }}>
        <img
          alt="image"
          src={timee}
          width="170px"
          height="250px"
          onClick={handleImageClick}
        />
      </Button>
    </Link>
  );
};

export default InboundTime;
