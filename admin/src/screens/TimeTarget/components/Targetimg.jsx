import React from "react";
import Image from "../assets/img/target.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Supply = () => {
  const handleImageClick = () => {};
  return (
    <Link to="/targettime/supplyAmount">
      <Button>
        <img
          alt="image"
          src={Image}
          width="150px"
          height="250px"
          onClick={handleImageClick}
        />
      </Button>
    </Link>
  );
};

export default Supply;
