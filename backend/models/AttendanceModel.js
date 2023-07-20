const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  employee: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    default: "absent",
  },
  overTime: {
    type: Number,
    default: 0,
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
