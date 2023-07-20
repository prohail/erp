const express = require("express");
const { getEmployeeStats } = require("../controllers/DashboardController");
const router = express.Router();

// Get Dashboard Stats
router.get("/", getEmployeeStats);

module.exports = router;
