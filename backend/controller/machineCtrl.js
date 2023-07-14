const {
  Machine,
  MachineParts,
  Maintenance,
} = require("../models/machineModel");

const getAllMachines = async (req, res) => {
  try {
    const machines = await Machine.find();
    res.status(200).json(machines);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getMachineById = async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (machine) {
      res.status(200).json(machine);
    } else {
      res.status(404).json({ error: "Machine not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const createMachine = async (req, res) => {
  try {
    const { machineName, machineID, serialNumber, lastMaintenanceDate, value } =
      req.body;
    const machine = await Machine.create({
      machineName,
      machineID,
      serialNumber,
      lastMaintenanceDate,
      value,
    });
    res.status(200).json({ msg: "Successfully created" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
};

const deleteMachine = async (req, res) => {
  try {
    const machine = await Machine.findOneAndDelete({
      _id: req.body.id,
      machineId: req.body.machineId,
    });
    if (machine) {
      res.status(200).json({ msg: "Successfully deleted!" });
    } else {
      res.status(404).json({ msg: "Machine not found!" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const updateMachine = async (req, res) => {
  const {
    _id,
    machineName,
    machineID,
    serialNumber,
    lastMaintenanceDate,
    value,
  } = req.body;
  try {
    const updatedMachine = await Machine.findOneAndUpdate(
      { _id: _id },
      {
        machineName,
        machineID,
        serialNumber,
        lastMaintenanceDate,
        value,
      }
    );
    res.status(200).json({ msg: "Machine updated", machine: updatedMachine });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//machineParts
const getAllMachinesParts = async (req, res) => {
  try {
    const machinesParts = await MachineParts.find();
    res.status(200).json(machinesParts);
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};

const getMachinePartsById = async (req, res) => {
  try {
    const machineParts = await MachineParts.findById(req.params.id);
    if (machineParts) {
      res.status(200).json(machineParts);
    } else {
      res.status(404).json({ error: "MachineParts not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const createMachineParts = async (req, res) => {
  try {
    const { partName, machineID, statues, purchaseDate, value } = req.body;
    const machineParts = await MachineParts.create({
      partName,
      machineID,
      statues,
      purchaseDate,
      value,
    });
    res.status(200).json({ msg: "Successfully created" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
};

const deleteMachineParts = async (req, res) => {
  try {
    const machineParts = await MachineParts.findOneAndDelete({
      _id: req.body.id,
      machineId: req.body.machineId,
    });
    if (machineParts) {
      res.status(200).json({ msg: "Successfully deleted!" });
    } else {
      res.status(404).json({ msg: "MachineParts not found!" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const updateMachineParts = async (req, res) => {
  const { _id, partName, machineID, statues, purchaseDate, value } = req.body;
  try {
    const updatedMachineParts = await MachineParts.findOneAndUpdate(
      { _id: _id },
      {
        partName,
        machineID,
        statues,
        purchaseDate,
        value,
      }
    );
    res.status(200).json({
      msg: "Machine Parts updated",
      machineParts: updatedMachineParts,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//Maintenance

const getAllMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.find();
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getMaintenanceById = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);
    if (maintenance) {
      res.status(200).json(maintenance);
    } else {
      res.status(404).json({ error: "Maintenance not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const createMaintenance = async (req, res) => {
  try {
    const { partName, machineID, statues, lastMaintenanceDate, value } =
      req.body;
    const maintenance = await Maintenance.create({
      partName,
      machineID,
      statues,
      lastMaintenanceDate,
      value,
    });
    res.status(200).json({ msg: "Successfully created" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
};

const deleteMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findOneAndDelete({
      _id: req.body.id,
      machineId: req.body.machineId,
    });
    if (maintenance) {
      res.status(200).json({ msg: "Successfully deleted!" });
    } else {
      res.status(404).json({ msg: "Maintenance not found!" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const updateMaintenance = async (req, res) => {
  const { _id, partName, machineID, statues, lastMaintenanceDate, value } =
    req.body;
  try {
    const updatedMaintenance = await Maintenance.findOneAndUpdate(
      { _id: _id },
      {
        partName,
        machineID,
        statues,
        lastMaintenanceDate,
        value,
      }
    );
    res
      .status(200)
      .json({ msg: "Maintenance updated", maintenance: updatedMaintenance });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = {
  getAllMachines,
  getMachineById,
  createMachine,
  deleteMachine,
  updateMachine,

  getAllMachinesParts,
  getMachinePartsById,
  createMachineParts,
  deleteMachineParts,
  updateMachineParts,

  getAllMaintenance,
  getMaintenanceById, //MachineMaintenance
  createMaintenance,
  deleteMaintenance,
  updateMaintenance,
};
