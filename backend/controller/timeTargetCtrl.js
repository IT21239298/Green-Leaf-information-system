const model = require("../models/timeTargetModel");



 
//add Target
async function create_Target(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { 
    targetID,
    targetName,
    description,
    time,
    date,
    quantity,
    value,
    targetType,
    quickTarget,
    orderDate,
    finalDate,
    driverDetails
   } = req.body;

  const create = await new model.Target({
    targetID,
    targetName,
    description,
    time,
    date,
    quantity,
    value,
    targetType,
    quickTarget,
    orderDate,
    finalDate,
    driverDetails
  });

  create.save(function (err) {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Erro while creating Target ${err}` });
  });
}


//get Target
async function get_Target(req, res) {
  let data = await model.Target.find({});
  return res.json(data);
}


//delete Target
async function delete_Target(req, res) {
  if (!req.body) res.status(400).json({ message: "Request body not Found" });
  await model.Target.deleteOne(req.body, function (err) {
    if (!err) res.json("Record Deleted...!");
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleting Machine Record");
    });
}
//edit Target
async function edit_Target(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");

  const _id = req.params;
  
  const { 
    targetID,
    targetName,
    description,
    time,
    date,
    quantity,
    value,
    targetType,
    quickTarget,
    orderDate,
    finalDate,
    driverDetails} = req.body.recordId.data; // Assuming _id is the unique identifier for the machine

  console.log(_id);
  console.log({ 
    targetID,
    targetName,
    description,
    time,
    date,
    quantity,
    value,
    targetType,
    quickTarget,
    orderDate,
    finalDate,
    driverDetails });

  // Assuming `model.Machine` refers to your Mongoose model for the machine
  // Find the machine by its _id and update its properties
  model.Target.findByIdAndUpdate(
    _id,
    { 
      targetID,
      targetName,
      description,
      time,
      date,
      quantity,
      value,
    targetType,
    quickTarget,
    orderDate,
    finalDate,
    driverDetails},
    { new: true },
    function (err, editTarget) {
      if (err) {
        return res
          .status(400)
          .json({ message: `Error while updating Target: ${err}` });
      }
      if (!editTarget) {
        return res.status(404).json({ message: "Target not found" });
      }
      return res.json(editTarget);
    }
  );
}
//Add Time details
async function create_Time(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { 
    targetName,
    timeAvailable,
    timePeriod,
  } = req.body;

  const totalAmount = timeAvailable - timePeriod;

  const create = new model.Time({
    targetName,
    timeAvailable,
    timePeriod,
    totalAmount,
  });

  try {
    await create.save();
    return res.json(create);
  } catch (err) {
    return res.status(400).json({ message: `Error while creating time ${err}` });
  }

}


//get Time
async function get_Time(req, res) {
  let data = await model.Time.find({});
  return res.json(data);
}





 
module.exports = {
 
 
  create_Target,
  create_Time,
  get_Target,
  get_Time,
  delete_Target,
  edit_Target,
 
  
};


