import React, { useState, useEffect } from "react";
import axios from "axios";

const RecordAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedRecordDate, setSelectedRecordDate] = useState("");
  const [error, setError] = useState(null); // New state for error message

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("/api/employees")
      .then((response) => {
        setEmployees(response.data);
        initializeAttendanceRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  const initializeAttendanceRecords = (employees) => {
    const initialRecords = employees.map((employee) => ({
      employeeId: employee._id,
      status: "",
      overTime: "",
    }));

    setAttendanceRecords(initialRecords);
  };

  const handleStatusChange = (event, employeeId) => {
    const updatedRecords = attendanceRecords.map((record) => {
      if (record.employeeId === employeeId) {
        return {
          ...record,
          status: event.target.value,
        };
      }
      return record;
    });

    setAttendanceRecords(updatedRecords);
  };

  const handleWorkingHoursChange = (event, employeeId) => {
    const updatedRecords = attendanceRecords.map((record) => {
      if (record.employeeId === employeeId) {
        return {
          ...record,
          overTime: parseInt(event.target.value),
        };
      }
      return record;
    });

    setAttendanceRecords(updatedRecords);
  };

  const handleRecordDateChange = (event) => {
    setSelectedRecordDate(event.target.value);
  };

  const recordAttendance = () => {
    if (attendanceRecords.length > 0 && selectedRecordDate) {
      attendanceRecords.forEach((record) => {
        const attendanceData = {
          employeeId: record.employeeId,
          date: selectedRecordDate,
          status: record.status,
          overTime: record.overTime,
        };

        axios
          .post(`/api/attendance/`, attendanceData)
          .then(() => {
            // Success message or further actions
          })
          .catch((error) => {
            setError(error.response.data.error); // Set the error message state
            console.error("Error recording attendance:", error);
          });
      });

      // Clear the attendance records and selected date
      setAttendanceRecords([]);
      setSelectedRecordDate("");
    }
  };

  return (
    <div className="container w-75">
      <div className="mb-3">
        <label htmlFor="recordDate" className="form-label">
          Record Date
        </label>
        <input
          type="date"
          id="recordDate"
          className="form-control w-25"
          value={selectedRecordDate}
          onChange={handleRecordDateChange}
        />
      </div>

      {error && ( // Conditionally render the error message div
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Status</th>
            <th>Overtime (Hours)</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee._id}</td>
              <td>
                <select
                  className="form-select"
                  value={
                    attendanceRecords.find(
                      (record) => record.employeeId === employee._id
                    )?.status || ""
                  }
                  onChange={(event) => handleStatusChange(event, employee._id)}
                >
                  <option value="">Select Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={
                    attendanceRecords.find(
                      (record) => record.employeeId === employee._id
                    )?.overTime || ""
                  }
                  onChange={(event) =>
                    handleWorkingHoursChange(event, employee._id)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-primary" onClick={recordAttendance}>
        Record Attendance
      </button>
    </div>
  );
};

export default RecordAttendance;
