// const Driver = require("../model/DriverSchema");
// const Vehicle = require("../model/VehicleSchema");

const {
  Driver,
  Vehicle,
  Route,
  Coordinates,
} = require("../models/transportModel");

const { calculateAge } = require("../services/CalculateAge");
const { locations } = require("../data/LocationsData");

//////////////////////////////////! Drivers

// Get all drivers
//? http://localhost:8082/driver
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    const driversWithAge = drivers.map((driver) => ({
      ...driver._doc,
      age: calculateAge(driver.dob),
    }));
    res.status(200).json(driversWithAge);
  } catch (error) {
    res.status(400).json({ error: error });
    console.log(error);
  }
};

// Get driver by ID
//? http://localhost:8082/driver/find/<collection_id>
//? http://localhost:8082/driver/find/6443a82dcace62bf6d038836
const getDriverById = async (req, res) => {
  const id = req.params.id;
  // const driverId = req.params.driverId;

  console.log(req.params);

  if (!id) {
    return res.status(400).json({ error: "Collection ID is required" });
  }

  // if (!driverId) {
  //   return res.status(400).json({ error: "Driver ID is required" });
  // }

  try {
    const driver = await Driver.findById(id);
    if (driver) {
      const driverWithAge = {
        ...driver._doc,
        age: calculateAge(driver.dob),
      };
      res.status(200).json(driverWithAge);
    } else {
      res.status(404).json({ error: "Driver not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

const getDriverByIdValidate = async (req, res) => {
  const id = req.params.id;
  const driverId = req.params.driverId;

  console.log(req.params);

  if (!id) {
    return res.status(400).json({ error: "Collection ID is required" });
  }

  if (driverId) {
    return res.status(400).json({ error: "Driver ID is required" });
  }

  try {
    const driver = await Driver.findById(id);
    if (driver) {
      const driverWithAge = {
        ...driver._doc,
        age: calculateAge(driver.dob),
      };
      res.status(200).json(driverWithAge);
    } else {
      res.status(404).json({ error: "Driver not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

// Create a new driver
//? http://localhost:8082/driver/create
const createDriver = async (req, res) => {
  try {
    const {
      fullName,
      driverId,
      licenseNumber,
      phoneNumber,
      employmentDate,
      homeTown,
      dob,
      status,
    } = req.body;

    const driver = await Driver.create({
      fullName,
      driverId,
      licenseNumber,
      phoneNumber,
      employmentDate,
      homeTown,
      dob,
      status,
    });
    res.status(200).json({ msg: "Successfully created" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
};

// Delete a driver
//? http://localhost:8082/driver/delete
//* with ->
//*   {
//*     "id": "64476884a4d13e559bdad656",
//*     "driverId": "DRV1A9B8"
//*   }
const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findOneAndDelete({
      _id: req.body.id,
      driverId: req.body.driverId,
    });
    if (driver) {
      res.status(200).json({ msg: "Successfully deleted!" });
    } else {
      res.status(404).json({ msg: "Driver not found!" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// Update a driver
//? http://localhost:8082/driver/update
//*   {
//*     "_id": "6443a82dcace62bf6d038836",
//*     "fullName": "Mayura Sellapperuma",
//*     "driverId": "DRV1A9B8",
//*     "licenseNumber": "PB432A5",
//*     "phoneNumber": "0766665142",
//*     "employmentDate": "2023-02-08",
//*     "homeTown": "Kuliyapitiya",
//*     "dob": "2001-06-11",
//*     "status": "Working",
//*     "age": 21
//*   }
const updateDriver = async (req, res) => {
  const {
    _id,
    fullName,
    driverId,
    licenseNumber,
    phoneNumber,
    employmentDate,
    homeTown,
    dob,
    status,
  } = req.body;

  try {
    const result = await Driver.findOneAndUpdate(
      { _id: _id },
      {
        fullName,
        driverId,
        licenseNumber,
        phoneNumber,
        employmentDate,
        homeTown,
        dob,
        status,
      }
    );
    res.status(200).json({ msg: "Driver updated", driver: result });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const uploadDriverImage = (req, res) => {
  res.send("Driver image upload success");
};

//////////////////////////////////! Vehicles

const getAllVehicles = async (req, res) => {
  await Vehicle.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
      console.log(err);
    });
};

const getVehicleById = async (req, res) => {
  const vehicleId = req.params.id;
  await Vehicle.findById(vehicleId)
    .then((vehicle) => {
      if (vehicle) {
        res.status(200).json(vehicle);
      } else {
        res.status(404).json({ error: "Vehicle not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      console.log(err);
    });
};

const createVehicle = async (req, res) => {
  try {
    const {
      vehicleId,
      makeModel,
      manufacturerYear,
      registrationNumber,
      color,
      ownerName,
      maxCapacity,
      status,
    } = req.body;

    const vehicle = await Vehicle.create({
      vehicleId,
      makeModel,
      manufacturerYear,
      registrationNumber,
      color,
      ownerName,
      maxCapacity,
      status,
    });
    res.status(200).json({ msg: "Successfully created" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndDelete({
      _id: req.body.id,
      vehicleId: req.body.vehicleId,
    });
    if (vehicle) {
      res.status(200).json({ msg: "Successfully deleted!" });
    } else {
      res.status(404).json({ msg: "Vehicle not found!" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const updateVehicle = async (req, res) => {
  const {
    _id,
    vehicleId,
    makeModel,
    manufacturerYear,
    registrationNumber,
    color,
    ownerName,
    maxCapacity,
    status,
  } = req.body;

  await Vehicle.findOneAndUpdate(
    { _id: _id },
    {
      vehicleId,
      makeModel,
      manufacturerYear,
      registrationNumber,
      color,
      ownerName,
      maxCapacity,
      status,
    }
  )
    .then((result) =>
      res.status(200).json({ msg: "Vehicle updated", vehicle: result })
    )
    .catch((err) => res.status(400).json({ error: err }));
};

//////////////////////////////////! Routes

const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(400).json({ error: error });
    console.log(error);
  }
};

const createRoute = async (req, res) => {
  try {
    const {
      routeId,
      driverId,
      vehicleId,
      supplierIds,
      createdDate,
      status,
      totalWeight,
      coordinates,
    } = req.body;

    const route = await Route.create({
      routeId,
      driverId,
      vehicleId,
      supplierIds,
      createdDate,
      status,
      totalWeight,
      coordinates,
    });
    res.status(200).json({ msg: "Successfully created" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
};

const updateRoute = async (req, res) => {
  const {
    _id,
    fullName,
    driverId,
    licenseNumber,
    phoneNumber,
    employmentDate,
    homeTown,
    dob,
    status,
    coordinates,
  } = req.body;

  try {
    const result = await Route.findOneAndUpdate(
      { _id: _id },
      {
        fullName,
        driverId,
        licenseNumber,
        phoneNumber,
        employmentDate,
        homeTown,
        dob,
        status,
        coordinates,
      }
    );
    res.status(200).json({ msg: "Route updated", route: result });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//////////////////////////////////! Coordintes
const simulateCoordinate = async (req, res) => {
  try {
    for (const location of locations) {
      const { lat, lng, count } = location;

      await new Promise((resolve) => setTimeout(resolve, 500));

      const coordinate = await Coordinates.create({
        lat,
        lng,
        count,
      });
    }
    res.status(200).json({ msg: "New coordinates added" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
};

module.exports = {
  getAllDrivers,
  getDriverById,
  createDriver,
  deleteDriver,
  updateDriver,
  uploadDriverImage,

  getAllVehicles,
  getVehicleById,
  createVehicle,
  deleteVehicle,
  updateVehicle,

  getAllRoutes,
  createRoute,
  updateRoute,

  simulateCoordinate,
};
