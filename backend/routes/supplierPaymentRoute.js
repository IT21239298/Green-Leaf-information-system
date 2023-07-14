const supplierPaymentRoute = require("express").Router();
const controller = require("../controller/supplierPaymentCtrl");

supplierPaymentRoute
  .route("/api/payment")
  .post(controller.create_Payment)
  .get(controller.get_Payment,)
  .delete(controller.delete_Payment);
  
  supplierPaymentRoute.route("/api/payment:_id").put(controller. edit_Payment); 

  supplierPaymentRoute
  .route("/api/supplierF")
  .post(controller.create_supplierF)

module.exports = supplierPaymentRoute