import axios from "axios";
import React, { useState } from "react";

export default function Addemployee() {
  const [isloading, setisloading] = useState(false);
  const [name, setName] = useState();
  const [fathername, setFathername] = useState();
  const [cnic, setCnic] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [joindate, setJoindate] = useState();
  const [salary, setSalary] = useState();
  const [err, setErr] = useState(null);

  const postform = async () => {
    setisloading(true);
    const response = await axios.post("/api/employees", {
      name: name,
      father_name: fathername,
      cnic: cnic,
      e_mail: email,
      phone: phone,
      join_date: joindate,
      salary: salary,
    });
    if (response.data.error) {
      setErr(response.data.error);
    } else {
      window.location.reload();
    }
    setisloading(false);
  };

  return (
    <>
      {isloading && <div className="spinner mx-auto m-5"></div>}
      {err && (
        <div className="alert alert-danger w-50 mx-auto text-center">
          <h4>{err}</h4>
        </div>
      )}
      {!isloading && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postform();
          }}
          className="mx-auto text-center"
        >
          <input
            className="w-50 border-bottom my-2 border-0 border-secondary px-3 pt-3 pb-1"
            required
            placeholder="Full Name"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <input
            className="w-50 border-bottom my-2 border-0 border-secondary px-3 pt-3 pb-1"
            required
            placeholder="Father Name"
            type="text"
            onChange={(e) => {
              setFathername(e.target.value);
            }}
          />
          <br />
          <input
            className="w-50 border-bottom my-2 border-0 border-secondary px-3 pt-3 pb-1"
            required
            placeholder="Email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <input
            className="w-50 border-bottom my-2 border-0 border-secondary px-3 pt-3 pb-1"
            required
            placeholder="Phone No. ( 03xx-xxxxxxx )"
            type="text"
            maxLength="12"
            minLength="12"
            pattern="03[0-9]{2}-[0-9]{7}"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <br />
          <input
            className="w-50 border-bottom my-2 mb-4 border-0 border-secondary px-3 pt-3 pb-1"
            required
            placeholder="CNIC ( xxxxx-xxxxxxx-x )"
            maxLength="15"
            minLength="15"
            type="text"
            pattern="\d{5}-\d{7}-\d"
            onChange={(e) => {
              setCnic(e.target.value);
            }}
          />
          <br />
          <input
            className="w-50 border-bottom my-2 mb-4 border-0 border-secondary px-3 pb-1"
            required
            placeholder="Joining Date"
            type="date"
            onChange={(e) => {
              setJoindate(e.target.value);
            }}
          />
          <br />
          <input
            className="w-50 border-bottom my-2 border-0 border-secondary px-3 pb-1"
            required
            placeholder="Salary"
            type="number"
            onChange={(e) => {
              setSalary(e.target.value);
            }}
          />
          <br /> <br />
          <br />
          <input
            className="btn mb-5 btn-primary w-50 rounded-5 fs-4 pb-1"
            type="submit"
            value="Add Employee"
          />
        </form>
      )}
    </>
  );
}
