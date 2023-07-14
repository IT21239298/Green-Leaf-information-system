import axios from "axios";
import React, { useEffect, useState } from "react";
import DriverSelect from "./DriverSelect";
import VehicleSelect from "./VehicleSelect";
import SupplierSelect from "./SupplierSelect";

const CreateRouteLeftSide = ({
  selectedSuppliersDetails,
  setSelectedSuppliersDetails,
}) => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);

  // const [selectedSuppliersDetails, setSelectedSuppliersDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/driver")
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:8082/vehicle")
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://6444192390738aa7c07f095c.mockapi.io/api/suppliers")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDriverChange = (event) => {
    setSelectedDriver(event.target.value);
    console.log(event.target.value);
  };

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
    console.log(event.target.value);
  };

  const handleSupplierChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSuppliers(typeof value === "string" ? value.split(",") : value);

    setSelectedSuppliersDetails(
      // Filter the object array based on the supIDs
      suppliers.filter((obj) => value.includes(obj.supID))
    );
  };

  return (
    <div>
      <DriverSelect
        label="Driver"
        handleChange={handleDriverChange}
        value={selectedDriver}
        items={drivers}
      />
      <VehicleSelect
        label="Vehicle"
        handleChange={handleVehicleChange}
        value={selectedVehicle}
        items={vehicles}
      />
      <SupplierSelect
        label="Suppliers"
        value={selectedSuppliers}
        handleChange={handleSupplierChange}
        items={suppliers}
      />
    </div>
  );
};

export default CreateRouteLeftSide;
