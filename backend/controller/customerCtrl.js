const { Customer, Order } = require("../models/customerModel");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const createCustomer = async (req, res) => {
  try {
    const { customerName, customerID, contactNumber, requestedDate, orderID } =
      req.body;
    const customer = await Customer.create({
      customerName,
      customerID,
      contactNumber,
      requestedDate,
      orderID,
    });
    res.status(200).json({ msg: "Successfully created" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({
      _id: req.body.id,
      customerId: req.body.customerId,
    });
    if (customer) {
      res.status(200).json({ msg: "Successfully deleted!" });
    } else {
      res.status(404).json({ msg: "Customer not found!" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const updateCustomer = async (req, res) => {
  const {
    _id,
    customerName,
    customerID,
    contactNumber,
    requestedDate,
    orderID,
  } = req.body;
  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: _id },
      {
        customerName,
        customerID,
        contactNumber,
        requestedDate,
        orderID,
      }
    );
    res
      .status(200)
      .json({ msg: "Customer updated", customer: updatedCustomer });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const createOrder = async (req, res) => {
  try {
    const { orderID, amount, requiredDate, type } = req.body;
    console.log(req.body);
    const order = await Order.create({
      orderID,
      amount,
      requiredDate,
      type,
    });
    res.status(200).json({ msg: "Successfully created" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.body.id,
      orderId: req.body.orderId,
    });
    if (order) {
      res.status(200).json({ msg: "Successfully deleted!" });
    } else {
      res.status(404).json({ msg: "Order not found!" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const updateOrder = async (req, res) => {
  const { _id, orderID, amount, requiredDate, type } = req.body;
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: _id },
      {
        orderID,
        amount,
        requiredDate,
        type,
      }
    );
    res.status(200).json({ msg: "Order updated", order: updatedOrder });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  deleteCustomer,
  updateCustomer,

  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  updateOrder,
};
