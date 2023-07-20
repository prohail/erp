const express = require("express");
const router = express.Router();
const customerController = require("../controllers/CustomerController");

// GET all customers
router.get("/", customerController.getAllCustomers);

// GET a single customer by ID
router.get("/:id", customerController.getCustomerById);

// POST create a new customer
router.post("/", customerController.createCustomer);

// PUT update a customer
router.put("/:id", customerController.updateCustomer);

// DELETE delete a customer
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
