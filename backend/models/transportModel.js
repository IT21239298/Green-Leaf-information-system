const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  driverId: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  employmentDate: { type: String, required: true },
  homeTown: { type: String, required: true },
  dob: { type: String, required: true },
  status: { type: String, required: true },
});

const vehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true },
  makeModel: { type: String, required: true },
  manufacturerYear: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  color: { type: String, required: true },
  ownerName: { type: String, required: true },
  maxCapacity: { type: String, required: true },
  status: { type: String, required: true },
});

const routeSchema = new mongoose.Schema({
  routeId: { type: String, required: true },
  driverId: { type: String, required: true },
  vehicleId: { type: String, required: true },
  supplierIds: { type: String, required: true },
  createdDate: { type: String, required: true },
  status: { type: String, required: true },
  totalWeight: { type: Number, required: true },
  coordinates: { type: String, required: true },
});

const coordinatesSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  count: { type: Number, required: true },
});

const Driver = mongoose.model("Driver", driverSchema);
const Vehicle = mongoose.model("Vehicles", vehicleSchema);
const Route = mongoose.model("Routes", routeSchema);
const Coordinates = mongoose.model("Coordinate", coordinatesSchema);

module.exports = { Driver, Vehicle, Route, Coordinates };
