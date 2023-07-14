const multer = require("multer");
const fs = require("fs");
const transportRoute = require("express").Router();

const TransportController = require("../controller/transportCtrl");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const driverId = req.body.driverId;
    const extension = file.originalname.split(".")[1];
    const fileName = `${driverId}.${extension}`;

    fs.access(`./images/${fileName}`, (err) => {
      if (!err) {
        // File exists, send error response
        return cb({
          msg: `File ${fileName} already exists!`,
        });
      }
      // File doesn't exist, proceed with upload
      cb(null, fileName);
    });
  },
});

const upload = multer({ storage: fileStorageEngine });

transportRoute.get("/driver", TransportController.getAllDrivers);
transportRoute.get("/driver/find/:id", TransportController.getDriverById);
transportRoute.post("/driver/create", TransportController.createDriver);
transportRoute.delete("/driver/delete", TransportController.deleteDriver);
transportRoute.put("/driver/update", TransportController.updateDriver);
transportRoute.post(
  "/driver/image-upload",
  upload.single("image"),
  TransportController.uploadDriverImage
);

transportRoute.get("/vehicle", TransportController.getAllVehicles);
transportRoute.get("/vehicle/find/:id", TransportController.getVehicleById);
transportRoute.post("/vehicle/create", TransportController.createVehicle);
transportRoute.delete("/vehicle/delete", TransportController.deleteVehicle);
transportRoute.put("/vehicle/update", TransportController.updateVehicle);

transportRoute.get("/route", TransportController.getAllRoutes);
transportRoute.post("/route/create", TransportController.createRoute);
transportRoute.put("/route/update", TransportController.updateRoute);
transportRoute.post("/coord/simulate", TransportController.simulateCoordinate);

module.exports = transportRoute;
