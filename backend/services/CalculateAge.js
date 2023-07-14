const ageCalculator = require("age-calculator");

let { AgeFromDateString } = require("age-calculator");

const calculateAge = (dob) => {
  let calculatedAge = new AgeFromDateString(dob).age;
  return calculatedAge;
};

module.exports = {
  calculateAge,
};
