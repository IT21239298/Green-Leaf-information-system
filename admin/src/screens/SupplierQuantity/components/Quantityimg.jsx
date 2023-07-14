import React from "react";
import Image from "../assets/img/inboundTea.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const InboundQuantity = () => {
  const handleImageClick = () => {};

  return (
    <Link to="/supplierquantity/inboundAmount">
      <Button sx={{ color: "white", mt: "10px" }}>
        <img
          alt="image"
          src={Image}
          width="750px"
          height="250px"
          onClick={handleImageClick}
        />
      </Button>
    </Link>
  );
};

export default InboundQuantity;
