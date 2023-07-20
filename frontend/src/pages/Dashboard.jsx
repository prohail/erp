import React, { useEffect, useState } from "react";
import axios from "axios";

const fetchEmployeeStats = async () => {
  try {
    const response = await axios.get("/api/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching employee stats:", error.response);
    throw error;
  }
};

export default function Dashboard() {
  const [isloading, setisloading] = useState(false);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  const [topsal, setTopsal] = useState(0);
  const [topsalcount, setTopsalcount] = useState(0);
  const [topatt, setTopatt] = useState(null);
  const [topattcount, setTopattcount] = useState(0);
  const [spent, setSpent] = useState(0);
  const [rcvd, setRcvd] = useState(0);

  useEffect(() => {
    const getEmployeeStats = async () => {
      setisloading(true);
      try {
        const stats = await fetchEmployeeStats();
        setEmployeeCount(stats.totalEmployees);
        setTotalSalary(stats.sumOfSalaries);
        setTopsal(stats.highestPaidEmployee.name);
        setTopsalcount(stats.highestPaidEmployee.salary);
        setTopatt(stats.highestAttendanceEmployee.employee.name);
        setTopattcount(stats.highestAttendanceEmployee.attendanceCount);
        setSpent(stats.paidThisMonth);
        setRcvd(stats.receivedThisMonth);
      } catch (error) {
        // Handle error if needed
      }
      setisloading(false);
    };

    getEmployeeStats();
  }, []);

  return (
    <>
      {isloading && <div className="spinner mx-auto m-5"></div>}
      {!isloading && (
        <div className="container my-5">
          <div className="row">
            <div className="col bg-light m-3 text-center py-3 rounded-5 align-items-center d-flex flex-column justify-content-center">
              <h5 className="text-dark">You have a total of</h5>
              <h3 className="text-success fw-semibold">{employeeCount}</h3>
              <h5 className="text-dark">Employees</h5>
            </div>
            <div className="col bg-light m-3 text-center py-3 rounded-5 align-items-center d-flex flex-column justify-content-center">
              <h5 className="text-dark">This Month</h5>
              <h3 className="text-success fw-semibold">{topatt}</h3>
              <h5 className="text-dark">Had The Highest Attendance of </h5>
              <h3 className="text-success fw-semibold">{topattcount}</h3>
            </div>
            <div className="col bg-light m-3 text-center py-3 rounded-5 align-items-center d-flex flex-column justify-content-center">
              <h5 className="text-dark">Your Employee</h5>
              <h3 className="text-success fw-semibold">{topsal}</h3>
              <h5 className="text-dark">Has Highest Salary of</h5>
              <h3 className="text-success fw-semibold">{topsalcount}</h3>
            </div>
          </div>

          <div className="row">
            <div className="col bg-light m-3 text-center py-3 rounded-5 align-items-center d-flex flex-column justify-content-center">
              <h5 className="text-dark">You Pay Your Employees</h5>
              <h3 className="text-success fw-semibold">{totalSalary}</h3>
              <h5 className="text-dark">Rupees Every Month</h5>
            </div>
            <div className="col bg-light m-3 text-center py-3 rounded-5 align-items-center d-flex flex-column justify-content-center">
              <h5 className="text-dark">Your Spent</h5>
              <h3 className="text-success fw-semibold">{spent}</h3>
              <h5 className="text-dark">Rupees this Month</h5>
            </div>
            <div className="col bg-light m-3 text-center py-3 rounded-5 align-items-center d-flex flex-column justify-content-center">
              <h5 className="text-dark">You Recieved</h5>
              <h3 className="text-success fw-semibold">{rcvd}</h3>
              <h5 className="text-dark">Rupees this Month</h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
