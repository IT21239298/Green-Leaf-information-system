import React from "react";
import Image from "../assets/img/supplier.png";

const Test = () => {
  const handleImageClick = () => {
    alert("Hello");
  };

  return (
    <div>
      <img alt="image" src={Image} onClick={handleImageClick} />
    </div>
  );
};

export default Test;
