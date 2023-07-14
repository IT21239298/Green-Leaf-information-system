const model = require("../models/supplierPaymentModel");
//add Payment
async function create_Payment(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { supID, quantity, mquantity, cost, packetcost, transecost, mPay } =
    req.body;

  const create = await new model.Payment({
    supID,
    quantity,
    mquantity,
    cost,
    packetcost,
    transecost,
    mPay,
  });

  create.save(function (err) {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Error while creating payment${err}` });
  });
}
//get payment
async function get_Payment(req, res) {
  let data = await model.Payment.find({});
  return res.json(data);
}
//delete  payment
async function delete_Payment(req, res) {
  if (!req.body) res.status(400).json({ message: "Request body not Found" });
  await model.Payment.deleteOne(req.body, function (err) {
    if (!err) res.json("Record Deleted...!");
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleting payment Record");
    });
}

//edit product
async function edit_Payment(req, res) {
  // console.log(req.body.recordId.data);
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");

  const _id = req.params;
  // console.log(req.params._id);

  const { supID, quantity, mquantity, cost, packetcost, transecost, mPay } =
    req.body.recordId.data;

  // console.log(_id);
  // console.log({ type, date, grade, amount });

  model.Payment.findByIdAndUpdate(
    _id,
    {
      supID,
      quantity,
      mquantity,
      cost,
      packetcost,
      transecost,
      mPay,
    },
    { new: true },
    function (err, editpayment) {
      if (err) {
        return res
          .status(400)
          .json({ message: `Error while updating Product: ${err}` });
      }
      if (!editpayment) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json(editpayment);
    }
  );
}

//add Payment
async function create_supplierF(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let {
    supID,
    ahName,
    bName,
    aNumber,
    branch,
    fertilizer,
    teapackets,
    transport,
  } = req.body;

  const create = await new model.SupplierF({
    supID,
    ahName,
    bName,
    aNumber,
    branch,
    fertilizer,
    teapackets,
    transport,
  });

  create.save(function (err) {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Erro while creating payment${err}` });
  });
}

module.exports = {
  create_Payment,
  create_supplierF,
  get_Payment,
  delete_Payment,
  edit_Payment,
};
