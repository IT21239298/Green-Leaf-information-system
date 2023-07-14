const timeTargetRoute = require("express").Router();

const controller = require("../controller/timeTargetCtrl");
//Target
timeTargetRoute
  .route("/api/target")
  .post(controller.create_Target)
  .get(controller.get_Target)
  .delete(controller.delete_Target);
  //.edit(controller.edit_Target)
  timeTargetRoute
  .route("/api/target/:_id").put(controller.edit_Target);


  //Time
  timeTargetRoute
  .route("/api/time")
  .post(controller.create_Time)
  .get(controller.get_Time);



  //Inbound amgggount

 
module.exports = timeTargetRoute