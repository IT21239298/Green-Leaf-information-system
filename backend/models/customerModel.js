const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerID: { type: String, required: true },
  contactNumber: { type: String, required: true },
  requestedDate: { type: String, required: true },
  orderID: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  orderID: { type: String, required: true },
  amount: { type: String, required: true },
  requiredDate: { type: String, required: true },
  type: { type: String, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = { Customer, Order };
