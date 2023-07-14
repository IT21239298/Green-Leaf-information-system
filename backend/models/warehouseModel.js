const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// categories => field => ['type', 'color']
const categories_model = new Schema({
  type: { type: String, default: "Anonymous" },
  color: { type: String, default: "#FCBE44" },
});

// transactions  => field => ['name', 'type', 'amount', 'date']
const transaction_model = new Schema({
  name: { type: String, default: "Anonymous" },
  type: { type: String, default: "Anonymous" },
  amount: { type: Number },
  date: { type: String },
});

const machine_modelp = new Schema({
  name: { type: String, default: "Anonymous" },
  amount: { type: Number },
  date: { type: String },
});
const matirial_model = new Schema({
  type: { type: String, default: "Anonymous" },
  amount: { type: Number },
  date: { type: String },
});
// categories => field => ['type', 'color']
const matirialcategories_model = new Schema({
  type: { type: String, default: "Anonymous" },
  color: { type: String, default: "#FCBE44" },
});
const product_model = new Schema({
  type: { type: String, default: "Anonymous" },
  date: { type: String },
  grade: { type: String },
  amount: { type: Number },
});
const productcategories_model = new Schema({
  type: { type: String, default: "Anonymous" },
  color: { type: String, default: "#FCBE44" },
});

const Categories = mongoose.model("categories", categories_model);
const Transaction = mongoose.model("transaction", transaction_model);
const Machinep = mongoose.model("machinep", machine_modelp);
const Matirial = mongoose.model("matirial", matirial_model);
const MatirialCategories = mongoose.model(
  "matirialcategories",
  matirialcategories_model
);
const Product = mongoose.model("product", product_model);
const ProductCategories = mongoose.model(
  "productcategories",
  productcategories_model
);

exports.default = Transaction;
exports.default = Machinep;
exports.default = Matirial;
exports.default = Product;
module.exports = {
  Categories,
  Transaction,
  Machinep,
  Matirial,
  MatirialCategories,
  Product,
  ProductCategories,
};
