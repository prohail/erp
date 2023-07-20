import React, { useState } from "react";
import Employeelist from "../components/Employeelist";
import Addemployee from "../components/Addemployee";

export default function Employees() {
  const [current, setcurrent] = useState(true);
  return (
    <div className="container my-5">
      <div className="container row w-25 me-auto">
        {!current && (
          <button
            onClick={() => {
              setcurrent(true);
            }}
            className="btn btn-outline-primary mb-3"
          >
            All Employees
          </button>
        )}
        {current && (
          <button
            onClick={() => {
              setcurrent(false);
            }}
            className="btn btn-primary mb-3"
          >
            Add Employee
          </button>
        )}
      </div>

      {current && <Employeelist />}
      {!current && <Addemployee />}
    </div>
  );
}
