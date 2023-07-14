import React from "react";
import Image from "../assets/img/newtea.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Supply = () => {
  const handleImageClick = () => {};
  return (
    <Link to="/supplierquantity/supplyAmount">
      <Button sx={{ mb: "30px" }}>
        <img
          alt="image"
          src={Image}
          width="650px"
          height="350px"
          onClick={handleImageClick}
        />
      </Button>
    </Link>
  );
};

export default Supply;
