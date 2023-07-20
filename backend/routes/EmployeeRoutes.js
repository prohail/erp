const express = require("express");
const {
  CreateEmployee,
  GetAllEmployees,
  GetSingleEmployee,
  DeleteEmployee,
  UpdateEmployee,
} = require("../controllers/EmployeeController");
const router = express.Router();

//Get all employees
router.get("/", GetAllEmployees);

//Get single employee
router.get("/:id", GetSingleEmployee);

//Create new employee
router.post("/", CreateEmployee);

//Delete employee
router.delete("/:id", DeleteEmployee);

//Update employee
router.put("/:id", UpdateEmployee);

module.exports = router;
