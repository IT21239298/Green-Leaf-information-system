const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  machineName: { type: String, required: true },
  machineID: { type: String, required: true },
  serialNumber: { type: String, required: true },
  lastMaintenanceDate: { type: String, required: true },
  value: { type: String, required: true },
});

const machinePartsSchema = new mongoose.Schema({
  partName: { type: String, required: true },
  machineID: { type: String, required: true },
  statues: { type: String, required: true },
  purchaseDate: { type: String, required: true },
  value: { type: String, required: true },
});

const maintenanceSchema = new mongoose.Schema({
  partName: { type: String, required: true },
  machineID: { type: String, required: true },
  statues: { type: String, required: true },
  lastMaintenanceDate: { type: String, required: true },
  value: { type: String, required: true },
});

const Machine = mongoose.model("Machine", machineSchema);
const MachineParts = mongoose.model("MachineParts", machinePartsSchema);
const Maintenance = mongoose.model("Maintenance", maintenanceSchema);

module.exports = { Machine, MachineParts, Maintenance };
