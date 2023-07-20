const Employee = require("../models/EmployeeModel");
const Attendance = require("../models/AttendanceModel");
const mongoose = require("mongoose");

//Get all Employees
const GetAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}).sort({ createdAt: -1 });
    const employeesWithPayable = await Promise.all(
      employees.map(async (employee) => {
        const attendance = await Attendance.aggregate([
          {
            $match: {
              employeeId: employee._id,
              date: {
                $gte: new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  1
                ),
                $lte: new Date(
                  new Date().getFullYear(),
                  new Date().getMonth() + 1,
                  0
                ),
              },
            },
          },
          {
            $group: {
              _id: "$employeeId",
              totalOvertime: { $sum: "$overTime" },
            },
          },
        ]);

        const totalOvertime =
          attendance.length > 0 ? attendance[0].totalOvertime : 0;
        const payable = employee.salary + totalOvertime * 200;

        return { ...employee.toObject(), payable };
      })
    );
    res.status(200).json(employeesWithPayable);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get single employee
const GetSingleEmployee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  const employee = await Employee.findById(id);
  if (!employee) {
    return res.status(404).json({ error: "Employee Not Found" });
  }
  res.status(200).json(employee);
};

//Create new Employee
const CreateEmployee = async (req, res) => {
  const { name, father_name, cnic, join_date, e_mail, phone, salary } =
    req.body;

  const employee = await Employee.findOne({ cnic: cnic }).exec();
  if (employee) {
    res.json({ error: "This Employee Already Exists!" });
  } else {
    try {
      const employee = await Employee.create({
        name,
        father_name,
        cnic,
        join_date,
        phone,
        e_mail,
        salary,
      });
      res.status(200).json(employee);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

//Delete employee
const DeleteEmployee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  const employee = await Employee.findOneAndDelete({ _id: id });
  if (!employee) {
    return res.status(404).json({ error: "Employee Not Found" });
  }
  res.status(200).json(employee);
};

//Update employee
const UpdateEmployee = async (req, res) => {
  console.log("UpdateEmployee called with ID:", req.params.id);
  console.log("Data received:", req.body);

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  const employee = await Employee.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  console.log("Updated employee:", employee);
  if (!employee) {
    return res.status(404).json({ error: "Employee Not Found" });
  }
  res.status(200).json(employee);
};

module.exports = {
  CreateEmployee,
  GetAllEmployees,
  GetSingleEmployee,
  DeleteEmployee,
  UpdateEmployee,
};
