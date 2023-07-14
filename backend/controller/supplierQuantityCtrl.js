const model = require("../models/supplierQuantityModel");

//add Supplier
async function create_Supplier(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let {
    supID,
    fname,
    lname,
    nic,
    address,
    contactNo,
    age,
    gender,
    bank,
    branch,
    accNo,
    accName,
  } = req.body;

  const create = await new model.Supplier({
    supID,
    fname,
    lname,
    nic,
    address,
    contactNo,
    age,
    gender,
    bank,
    branch,
    accNo,
    accName,
  });

  create.save(function (err) {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Erro while creating supplier ${err}` });
  });
}

//get supplier
async function get_Supplier(req, res) {
  let data = await model.Supplier.find({});
  return res.json(data);
}

//delete supplier
async function delete_Supplier(req, res) {
  if (!req.body) res.status(400).json({ message: "Request body not Found" });
  await model.Supplier.deleteOne(req.body, function (err) {
    if (!err) res.json("Record Deleted...!");
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleting Machine Record");
    });
}
//edit supplier
async function edit_Supplier(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");

  const _id = req.params;

  const {
    supID,
    fname,
    lname,
    nic,
    address,
    contactNo,
    age,
    gender,
    bank,
    branch,
    accNo,
    accName,
  } = req.body.recordId.data; // Assuming _id is the unique identifier for the machine

  console.log(_id);
  console.log({
    supID,
    fname,
    lname,
    nic,
    address,
    contactNo,
    age,
    gender,
    bank,
    branch,
    accNo,
    accName,
  });

  // Assuming `model.Machine` refers to your Mongoose model for the machine
  // Find the machine by its _id and update its properties
  model.Supplier.findByIdAndUpdate(
    _id,
    {
      supID,
      fname,
      lname,
      nic,
      address,
      contactNo,
      age,
      gender,
      bank,
      branch,
      accNo,
      accName,
    },
    { new: true },
    function (err, editSupplier) {
      if (err) {
        return res
          .status(400)
          .json({ message: `Error while updating supplier: ${err}` });
      }
      if (!editSupplier) {
        return res.status(404).json({ message: "supplier not found" });
      }
      return res.json(editSupplier);
    }
  );
}
//Add quantity details
async function create_Quantity(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { vehicle, quantity, moisture } = req.body;

  const totalAmount = quantity - moisture;

  const create = new model.Qunatity({
    vehicle,
    quantity,
    moisture,
    totalAmount,
  });

  try {
    await create.save();
    return res.json(create);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating quantity ${err}` });
  }
}

//get quantity
async function get_Qunatity(req, res) {
  let data = await model.Qunatity.find({});
  return res.json(data);
}

//edit quantity details
async function edit_Quantity(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");

  const _id = req.params;

  const { vehicle, quantity, moisture, totalAmount } = req.body.recordId.data; // Assuming _id is the unique identifier for the machine

  console.log(_id);
  console.log({
    vehicle,
    quantity,
    moisture,
    totalAmount,
  });

  // Assuming `model.Machine` refers to your Mongoose model for the machine
  // Find the machine by its _id and update its properties
  model.Qunatity.findByIdAndUpdate(
    _id,
    {
      vehicle,
      quantity,
      moisture,
      totalAmount,
    },
    { new: true },
    function (err, editQuantity) {
      if (err) {
        return res
          .status(400)
          .json({ message: `Error while updating quantity: ${err}` });
      }
      if (!editQuantity) {
        return res.status(404).json({ message: "quantity not found" });
      }
      return res.json(editQuantity);
    }
  );
}

//delete Quantity
async function delete_Quantity(req, res) {
  if (!req.body) res.status(400).json({ message: "Request body not Found" });
  await model.Qunatity.deleteOne(req.body, function (err) {
    if (!err) res.json("Record Deleted...!");
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleting Machine Record");
    });
}
//Add supplier quantity details
async function create_SupplierQuantity(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { SupplierID, supQuantity, Date, supMoisture, supTotalQuantity } =
    req.body;

  const create = new model.SupplierQuantity({
    supQuantity,
    SupplierID,
    Date,
    supMoisture,
    supTotalQuantity,
  });

  try {
    await create.save();
    return res.json(create);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating quantity ${err}` });
  }
}

//get  supplier quantity
async function get_SupplierQuantity(req, res) {
  let data = await model.SupplierQuantity.find({});
  return res.json(data);
}

module.exports = {
  create_Supplier,
  create_Quantity,
  get_Supplier,
  get_Qunatity,
  delete_Supplier,
  edit_Supplier,
  edit_Quantity,
  delete_Quantity,
  create_SupplierQuantity,
  get_SupplierQuantity,
};
