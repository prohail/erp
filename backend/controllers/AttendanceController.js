const Attendance = require("../models/AttendanceModel");
const Employee = require("../models/EmployeeModel");

const AttendanceByDate = async (req, res) => {
  const { date } = req.params;
  try {
    const attendance = await Attendance.find({ date });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const AddAttendance = async (req, res) => {
  const { employeeId, date, status, overTime } = req.body;
  try {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const existingAttendance = await Attendance.findOne({
      employeeId,
      date,
    });

    if (existingAttendance) {
      return res.status(400).json({
        error: "Attendance of this employee is already recorded on this date",
      });
    }

    const attendance = new Attendance({
      employeeId,
      employee: employee, // Store the employee data
      date,
      status,
      overTime,
    });

    await attendance.save();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  AttendanceByDate,
  AddAttendance,
};
