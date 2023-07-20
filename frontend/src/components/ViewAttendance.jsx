import React, { useState } from "react";
import axios from "axios";

const ViewAttendance = () => {
  const [selectedViewDate, setSelectedViewDate] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [isloading, setisloading] = useState(false);

  const handleViewDateChange = (event) => {
    setSelectedViewDate(event.target.value);
  };

  const viewAttendance = async () => {
    if (selectedViewDate) {
      setisloading(true);
      await axios
        .get(`/api/attendance/${selectedViewDate}`)
        .then((response) => {
          setAttendance(response.data);
          console.log(attendance);
        })
        .catch((error) => {
          console.error("Error fetching attendance:", error);
        });
    }
    setisloading(false);
  };

  return (
    <>
      {isloading && <div className="spinner mx-auto m-5"></div>}
      {!isloading && (
        <div className="container">
          <div className="mb-3">
            <label htmlFor="viewDate" className="form-label">
              View Date
            </label>
            <input
              type="date"
              id="viewDate"
              className="form-control w-50"
              value={selectedViewDate}
              onChange={handleViewDateChange}
            />
          </div>
          <button className="btn btn-primary" onClick={viewAttendance}>
            View Attendance
          </button>
          {attendance.length > 0 ? (
            <table className="table table-striped table-bordered mt-3">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Status</th>
                  <th>Overtime (Hours)</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record._id}>
                    <td>{record.employeeId}</td>
                    <td>{record.employee ? record.employee.name : ""}</td>
                    <td>{record.status}</td>
                    <td>{record.overTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No attendance records found for the selected date.</p>
          )}
        </div>
      )}{" "}
    </>
  );
};

export default ViewAttendance;
