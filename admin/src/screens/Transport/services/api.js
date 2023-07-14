import axios from "axios";

const BASE_API_URL = "http://localhost:8082";

//? Retrieve all driver details
const getAllDrivers = () => {
  axios
    .get(`${BASE_API_URL}/driver`)
    .then((response) => {
      return {
        drivers: response.data,
        driverCount: response.data.length,
        driverWorkCount: response.data.filter(
          (driver) => driver.status.toLowerCase() === "working"
        ).length,
        driverOutWorkCount: response.data.filter(
          (driver) => driver.status.toLowerCase() === "out of work"
        ).length,
      };
    })
    .catch((error) => {
      return error;
    });
};

//? Register a driver
const registerDriver = (data) => {
  axios
    .post(`${BASE_API_URL}/driver/create`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

//? upload driver image
const uploadDriverImage = (imageData) => {
  axios
    .post("http://localhost:8082/driver/image-upload", imageData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { registerDriver, getAllDrivers, uploadDriverImage };
