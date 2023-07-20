const Customer = require("../models/CustomerModel");

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const { name, address, phone, e_mail } = req.body;
    const customer = new Customer({ name, address, phone, e_mail });
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a customer
const updateCustomer = async (req, res) => {
  try {
    const { name, address, phone, e_mail } = req.body;
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    customer.name = name;
    customer.address = address;
    customer.phone = phone;
    customer.e_mail = e_mail;
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
