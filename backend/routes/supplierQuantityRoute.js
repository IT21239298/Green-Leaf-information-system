const supplierQuantityRoute = require("express").Router();

const controller = require("../controller/supplierQuantityCtrl");
//supplier
supplierQuantityRoute
  .route("/api/supplier")
  .post(controller.create_Supplier)
  .get(controller.get_Supplier)
  .delete(controller.delete_Supplier);

//edit supplier details
supplierQuantityRoute.route("/api/supplier/:_id").put(controller.edit_Supplier);

// quantity
supplierQuantityRoute
  .route("/api/quantity")
  .post(controller.create_Quantity)
  .get(controller.get_Qunatity)
  .delete(controller.delete_Quantity);

//edit inbound amount
supplierQuantityRoute.route("/api/quantity/:_id").put(controller.edit_Quantity);

//supplier quantity
supplierQuantityRoute
  .route("/api/supplierquantity")
  .post(controller.create_SupplierQuantity)
  .get(controller.get_SupplierQuantity);

module.exports = supplierQuantityRoute;
