const model = require("../models/warehouseModel");

//  post: http://localhost:8080/api/categories
async function create_Categories(req, res) {
  const Create = new model.Categories({
    type,
    color,
  });

  await Create.save(function (err) {
    if (!err) return res.json(Create);
    return res
      .status(400)
      .json({ message: `Error while creating categories ${err}` });
  });
}

//  get: http://localhost:8080/api/categories
async function get_Categories(req, res) {
  let data = await model.Categories.find({});

  let filter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color, name: v.name })
  );
  return res.json(filter);
}

//  post: http://localhost:8080/api/transaction
async function create_Transaction(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { name, type, amount } = req.body;

  const create = await new model.Transaction({
    name,
    type,
    amount,
    date: new Date(),
  });

  create.save(function (err) {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Erro while creating transaction ${err}` });
  });
}

//  get: http://localhost:8080/api/transaction
async function get_Transaction(req, res) {
  let data = await model.Transaction.find({});
  return res.json(data);
}

//  delete: http://localhost:8080/api/transaction
async function delete_Transaction(req, res) {
  if (!req.body) res.status(400).json({ message: "Request body not Found" });
  await model.Transaction.deleteOne(req.body, function (err) {
    if (!err) res.json("Record Deleted...!");
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleting Transaction Record");
    });
}

//  get: http://localhost:8080/api/labels
async function get_Labels(req, res) {
  model.Transaction.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json("Looup Collection Error");
    });
}
//add machine
async function create_Machinep(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { name, amount, date } = req.body;

  const create = await new model.Machinep({
    name,
    amount,
    date,
  });

  create.save(function (err) {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Erro while creating transaction ${err}` });
  });
}
//get machine
async function get_Machinep(req, res) {
  let data = await model.Machinep.find({});
  return res.json(data);
}

//detele machine details
async function delete_Machinep(req, res) {
  if (!req.body) res.status(400).json({ message: "Request body not Found" });
  await model.Machinep.deleteOne(req.body, function (err) {
    if (!err) res.json("Record Deleted...!");
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleting Machine Record");
    });
}

//edit machine
async function edit_Machinep(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");

  const _id = req.params;

  const { name, amount, date } = req.body.recordId.data;

  console.log(_id);
  console.log({ name, amount, date });

  model.Machinep.findByIdAndUpdate(
    _id,
    { name, amount, date },
    { new: true },
    function (err, editMachinep) {
      if (err) {
        return res
          .status(400)
          .json({ message: `Error while updating machine: ${err}` });
      }
      if (!editMachinep) {
        return res.status(404).json({ message: "Machine not found" });
      }
      return res.json(editMachinep);
    }
  );
}
//add matirial
async function create_Matirial(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { type, amount, date } = req.body;

  const create = await new model.Matirial({
    type,
    amount,
    date,
  });

  create.save(function (err) {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Erro while creating transaction ${err}` });
  });
}
//  post: http://localhost:8080/api/matirialcategories
async function create_MatirialCategories(req, res) {
  const Create = new model.MatirialCategories({
    type,
    color,
  });

  await Create.save(function (err) {
    if (!err) return res.json(Create);
    return res
      .status(400)
      .json({ message: `Error while creating categories ${err}` });
  });
}
//get matirial category
async function get_MatirialCategories(req, res) {
  let data = await model.MatirialCategories.find({});

  let filter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color, name: v.name })
  );
  return res.json(filter);
}

//get matirial
async function get_Matirial(req, res) {
  let data = await model.Matirial.find({});
  return res.json(data);
}

//  delete:matirial
async function delete_Matirial(req, res) {
  if (!req.body) res.status(400).json({ message: "Request body not Found" });
  await model.Matirial.deleteOne(req.body, function (err) {
    if (!err) res.json("Record Deleted...!");
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleting Transaction Record");
    });
}
//get labelsPacking
async function get_LabelsPacking(req, res) {
  model.Matirial.aggregate([
    {
      $lookup: {
        from: "matirialcategories",
        localField: "type",
        foreignField: "type",
        as: "matirialcategories_info",
      },
    },
    {
      $unwind: "$matirialcategories_info",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,

            type: v.type,
            amount: v.amount,
            color: v.matirialcategories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json("Looup Collection Error");
    });
}
//_________________________________________________
//add product
async function create_Product(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { type, date, grade, amount } = req.body;

  const create = await new model.Product({
    type,
    date,
    grade,
    amount,
  });

  create.save(function (err) {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Erro while creating product ${err}` });
  });
}
async function create_ProductCategories(req, res) {
  const Create = new model.ProductCategories({
    type,
    color,
  });

  await Create.save(function (err) {
    if (!err) return res.json(Create);
    return res
      .status(400)
      .json({ message: `Error while creating  product categories ${err}` });
  });
}
//get product category
async function get_ProductCategories(req, res) {
  let data = await model.ProductCategories.find({});

  let filter = await data.map((v) =>
    Object.assign(
      {},
      {
        type: v.type,
        date: v.date,
        color: v.color,
        grade: v.grade,
        amount: v.amount,
        name: v.name,
      }
    )
  );
  return res.json(filter);
}

//get product
async function get_Product(req, res) {
  let data = await model.Product.find({});
  return res.json(data);
}

//  delete:product
async function delete_Product(req, res) {
  if (!req.body) res.status(400).json({ message: "Request body not Found" });
  await model.Product.deleteOne(req.body, function (err) {
    if (!err) res.json("Record Deleted...!");
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleting Transaction Record");
    });
}
//get labelsPacking
async function get_LabelsProduct(req, res) {
  model.Product.aggregate([
    {
      $lookup: {
        from: "productcategories",
        localField: "type",
        foreignField: "type",
        as: "productcategories_info",
      },
    },
    {
      $unwind: "$productcategories_info",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,

            type: v.type,
            date: v.date,
            grade: v.grade,
            amount: v.amount,
            color: v.productcategories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json("Looup Collection Error");
    });
}
//edit product
async function edit_Product(req, res) {
  // console.log(req.body.recordId.data);
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");

  const _id = req.params._id;
  // console.log(req.params._id);

  const { type, date, grade, amount } = req.body.recordId.data;

  // console.log(_id);
  // console.log({ type, date, grade, amount });

  model.Product.findByIdAndUpdate(
    _id,
    { type, date, grade, amount },
    { new: true },
    function (err, editProduct) {
      if (err) {
        return res
          .status(400)
          .json({ message: `Error while updating Product: ${err}` });
      }
      if (!editProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json(editProduct);
    }
  );
}
//edit matirial
async function edit_Matirial(req, res) {
  // console.log(req.body.recordId.data);
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");

  const _id = req.params._id;
  // console.log(req.params._id);

  const { type, amount, date } = req.body.recordId.data;

  model.Matirial.findByIdAndUpdate(
    _id,
    { type, amount, date },
    { new: true },
    function (err, editMatirial) {
      if (err) {
        return res
          .status(400)
          .json({ message: `Error while updating Product: ${err}` });
      }
      if (!editMatirial) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json(editMatirial);
    }
  );
}
//rease
async function release_Matirial(req, res) {
  // console.log(req.body.recordId.data);
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");

  const _id = req.params._id;
  // console.log(req.params._id);

  const { type, amount, date } = req.body.recordId.data;

  model.Matirial.findByIdAndUpdate(
    _id,
    { type, amount, date },
    { new: true },
    function (err, realeseMatirial) {
      if (err) {
        return res
          .status(400)
          .json({ message: `Error while updating Product: ${err}` });
      }
      if (!realeseMatirial) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json(realeseMatirial);
    }
  );
}
module.exports = {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels,
  //machine
  create_Machinep,
  get_Machinep,
  delete_Machinep,
  edit_Machinep,
  //packing
  create_MatirialCategories,
  get_MatirialCategories,
  create_Matirial,
  get_Matirial,
  delete_Matirial,
  get_LabelsPacking,
  edit_Matirial,
  release_Matirial,
  //product
  create_Product,
  create_ProductCategories,
  get_ProductCategories,
  get_Product,
  delete_Product,
  get_LabelsProduct,
  edit_Product,
};
