const Employee = require("../models/EmployeeModel");
const Attendance = require("../models/AttendanceModel");
const Voucher = require("../models/VoucherModel");

const getEmployeeStats = async (req, res) => {
  try {
    const paidThisMonth = await Voucher.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            $lt: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              1
            ),
          },
          debitAmount: { $exists: true },
          isApproved: true,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$debitAmount" },
        },
      },
    ]);

    const receivedThisMonth = await Voucher.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            $lt: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              1
            ),
          },
          creditAmount: { $exists: true },
          isApproved: true,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$creditAmount" },
        },
      },
    ]);

    const totalEmployees = await Employee.countDocuments();
    const sumOfSalaries = await Employee.aggregate([
      {
        $group: {
          _id: null,
          totalSalaries: { $sum: "$salary" },
        },
      },
    ]);

    const highestPaidEmployee = await Employee.findOne().sort({ salary: -1 });

    const highestAttendanceEmployee = await Attendance.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            $lt: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              1
            ),
          },
        },
      },
      {
        $group: {
          _id: "$employeeId",
          attendanceCount: { $sum: 1 },
        },
      },
      { $sort: { attendanceCount: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "employees",
          localField: "_id",
          foreignField: "_id",
          as: "employee",
        },
      },
      { $unwind: "$employee" },
      {
        $project: {
          _id: 0,
          employee: { _id: 1, name: 1 },
          attendanceCount: 1,
        },
      },
    ]);

    const stats = {
      totalEmployees,
      sumOfSalaries: sumOfSalaries[0].totalSalaries,
      highestPaidEmployee,
      highestAttendanceEmployee: highestAttendanceEmployee[0],
      paidThisMonth: paidThisMonth[0].total,
      receivedThisMonth: receivedThisMonth[0].total,
    };

    res.json(stats);
  } catch (error) {
    console.error("Error getting employee stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getEmployeeStats,
};
