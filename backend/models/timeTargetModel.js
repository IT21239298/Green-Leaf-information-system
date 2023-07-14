const mongoose = require("mongoose");
const Schema = mongoose.Schema;



//target
const target_model = new Schema({
    targetID:{type:String},
    targetName: { type: String },
    description: { type: String },
    time: { type: String },
    date: { type: String },
    quantity: { type: String },
    value: { type: String },
    targetType: { type: String },
    quickTarget: { type: String },
    orderDate: { type: String },
    finalDate: { type: String },
    driverDetails: { type: String },
    
});

//time

const time_model = new Schema({
  
    targetName: { type: String },
    timeAvailable: { type: Number },
    timePeriod: { type: Number },
    totalAmount:{type :Number},
    
   
});


const Target = mongoose.model("target",target_model);
const Time = mongoose.model("time",time_model);


exports.default = Target;
exports.default = Time;


module.exports = {
 Target,
 Time,


};