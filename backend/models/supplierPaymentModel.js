const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//payment
const payment_model = new Schema({
  supID: { type: String },
  quantity: { type: Number },
  mquantity: { type: Number },
  cost: { type: Number },
  packetcost: { type: Number },
  transecost: { type: Number },
  mPay: { type: Number },
});
//supplierF
const supplierF_model = new Schema({
  supID: { type: Number },
  ahName: { type: String },
  bName: { type: String },
  aNumber: { type: Number },
  branch: { type: String },
  fertilizer: { type: String },
  teapackets: { type: String },
  transport: { type: String },
});

const SupplierF = mongoose.model("supplierF", supplierF_model);
const Payment = mongoose.model("payment", payment_model);

exports.default = SupplierF;
exports.default = Payment;

module.exports = {
  SupplierF,
  Payment,
};
