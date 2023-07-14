import React from "react";

import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";

import truck from "../../assets/images/truck.png";

const TruckCapacity = ({ capacity }) => {
  return (
    <div
      id="truckDiv"
      style={{
        backgroundImage: `url(${truck})`,
        width: "500px",
        height: "250px",
        position: "relative",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "end",
      }}
    >
      <ProgressBar
        striped
        now={capacity}
        label={`${capacity}%`}
        style={{
          width: "355px",
          height: "165px",
          marginRight: "6px",
          marginTop: "5px",
          borderRadius: "5px",
          background:
            "linear-gradient(180deg, #E4E6E5 0.38%, #EAEDEC 1.39%, #ECEFEE 2.39%, #E4E5E4 16.51%, #DEDEDD 37.67%, #DCDCDB 91.1%, #DADAD9 95.13%, #D3D4D2 96.14%, #BEC1BD 98.15%, #B7BBB7 99.16%)",
          fontSize: "40px",
          fontWeight: "bold",
        }}
      />
    </div>
  );
};

export default TruckCapacity;
