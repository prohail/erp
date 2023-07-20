const express = require("express");
const {
  AttendanceByDate,
  AddAttendance,
} = require("../controllers/AttendanceController");
const router = express.Router();

// Get Attendance by Date
router.get("/:date", AttendanceByDate);

// Add Attendance
router.post("/", AddAttendance);

module.exports = router;
