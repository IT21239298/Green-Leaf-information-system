const customerRoute = require("express").Router();
const customerController = require("../controller/customerCtrl");

customerRoute.get("/customer", customerController.getAllCustomers);
customerRoute.get("/customer/find/:id", customerController.getCustomerById);
customerRoute.post("/customer/create", customerController.createCustomer);
customerRoute.delete("/customer/delete/:id", customerController.deleteCustomer);
customerRoute.put("/customer/update/:id", customerController.updateCustomer);

customerRoute.get("/order", customerController.getAllOrders);
customerRoute.get("/order/find/:id", customerController.getOrderById);
customerRoute.post("/order/create", customerController.createOrder);
customerRoute.delete("/order/delete/:id", customerController.deleteOrder);
customerRoute.put("/order/update/:id", customerController.updateOrder);

module.exports = customerRoute;
