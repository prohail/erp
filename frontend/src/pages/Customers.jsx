import React, { useState } from "react";
import Customerlist from "../components/Customerlist";
import AddCustomer from "../components/AddCustomer";

export default function Customers() {
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
            All Customers
          </button>
        )}
        {current && (
          <button
            onClick={() => {
              setcurrent(false);
            }}
            className="btn btn-primary mb-3"
          >
            Add Customer
          </button>
        )}
      </div>

      {current && <Customerlist />}
      {!current && <AddCustomer />}
    </div>
  );
}
