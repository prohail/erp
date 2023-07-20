import React from "react";
import RecordAttendance from "../components/RecordAttendance";
import ViewAttendance from "../components/ViewAttendance";
import { useState } from "react";

export default function AttendancePage() {
  const [view, setView] = useState(true);
  return (
    <div className="container my-5">
      {view && (
        <div className="container row w-25 me-auto">
          <button
            onClick={() => {
              setView(false);
            }}
            className="btn btn-outline-primary mb-3"
          >
            Add Attendance Record
          </button>
        </div>
      )}
      {!view && (
        <div className="container w-75">
          <button
            onClick={() => {
              setView(true);
            }}
            className="btn btn-primary mb-3"
          >
            View Attendance
          </button>
        </div>
      )}
      {view && <ViewAttendance />}
      {!view && <RecordAttendance />}
    </div>
  );
}
