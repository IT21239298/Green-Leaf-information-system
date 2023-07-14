const machineRoute = require("express").Router();
const machineController = require("../controller/machineCtrl");

machineRoute.get("/machine", machineController.getAllMachines);
machineRoute.get("/machine/find/:id", machineController.getMachineById);
machineRoute.post("/machine/create", machineController.createMachine);
machineRoute.delete("/machine/delete", machineController.deleteMachine);
machineRoute.put("/machine/update", machineController.updateMachine);

machineRoute.get("/machineParts", machineController.getAllMachinesParts);
machineRoute.get(
  "/machineParts/find/:id",
  machineController.getMachinePartsById
);
machineRoute.post("/machineParts/create", machineController.createMachineParts);
machineRoute.delete(
  "/machineParts/delete",
  machineController.deleteMachineParts
);
machineRoute.put("/machineParts/update", machineController.updateMachineParts);

machineRoute.get("/maintenance", machineController.getAllMaintenance);
machineRoute.get("/maintenance/find/:id", machineController.getMaintenanceById);
machineRoute.post("/maintenance/create", machineController.createMaintenance);
machineRoute.delete("/maintenance/delete", machineController.deleteMaintenance);
machineRoute.put("/maintenance/update", machineController.updateMaintenance);

module.exports = machineRoute;
