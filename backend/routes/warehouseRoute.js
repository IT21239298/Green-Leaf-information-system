const warehouseRoute = require("express").Router();

const controller = require("../controller/warehouseCtrl");

warehouseRoute
  .route("/api/categories")
  .post(controller.create_Categories)
  .get(controller.get_Categories);

warehouseRoute
  .route("/api/transaction")
  .post(controller.create_Transaction)
  .get(controller.get_Transaction)
  .delete(controller.delete_Transaction);

warehouseRoute.route("/api/labels").get(controller.get_Labels);

warehouseRoute
  .route("/api/machinep")
  .post(controller.create_Machinep)
  .get(controller.get_Machinep)
  .delete(controller.delete_Machinep);

warehouseRoute.route("/api/machinep/:_id").put(controller.edit_Machinep);

warehouseRoute
  .route("/api/matirial")
  .post(controller.create_Matirial)
  .get(controller.get_Matirial)
  .delete(controller.delete_Matirial);

warehouseRoute.route("/api/matirial/:_id").put(controller.edit_Matirial);
warehouseRoute.route("/api/matirial/:_id").put(controller.release_Matirial);

warehouseRoute
  .route("/api/ matirialcategories")
  .post(controller.create_MatirialCategories)
  .get(controller.get_MatirialCategories);

warehouseRoute
  .route("/api/product")
  .post(controller.create_Product)
  .get(controller.get_Product)
  .delete(controller.delete_Product);

warehouseRoute.route("/api/product/:_id").put(controller.edit_Product);

warehouseRoute
  .route("/api/ productcategories")
  .post(controller.create_ProductCategories)
  .get(controller.get_ProductCategories);

module.exports = warehouseRoute;
