import React, { useEffect, useState } from "react";
import axios from "axios";

import DriversSelect from "../components/CreateRoute/DriverSelect";

const Test = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8082/driver")
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDriverChange = (event) => {
    setSelectedDriver(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <DriversSelect
        label="Driver"
        handleChange={handleDriverChange}
        value={selectedDriver}
        items={drivers}
      />
    </div>
  );
};

export default Test;
