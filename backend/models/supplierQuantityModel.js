const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Supplier
const supplier_model = new Schema({
  supID: { type: String },
  fname: { type: String },
  lname: { type: String },
  nic: { type: String },
  address: { type: String },
  contactNo: { type: String },
  age: { type: String },
  gender: { type: String },
  bank: { type: String },
  branch: { type: String },
  accNo: { type: String },
  accName: { type: String },
});

//Qunatity

const quantity_model = new Schema({
  vehicle: { type: String },
  quantity: { type: Number },
  moisture: { type: Number },
  totalAmount: { type: Number },
});

//supplierQuantity
const supplierQuantity_model = new Schema({
  supQuantity: { type: Number },
  supplierID: { type: String },
  Date: { type: Date },
  supMoisture: { type: Number },
  supTotalQuantity: { type: Number },
});

const Supplier = mongoose.model("supplier", supplier_model);
const Qunatity = mongoose.model("quantity", quantity_model);
const SupplierQuantity = mongoose.model(
  "supplierQuantity",
  supplierQuantity_model
);

exports.default = Supplier;
exports.default = Qunatity;
exports.default = SupplierQuantity;

module.exports = {
  Supplier,
  Qunatity,
  SupplierQuantity,
};
