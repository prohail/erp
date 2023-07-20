import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeList() {
  const [isloading, setisloading] = useState(false);
  const [emps, setEmps] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editedEmp, setEditedEmp] = useState({
    _id: "",
    name: "",
    father_name: "",
    cnic: "",
    join_date: "",
    phone: "",
    e_mail: "",
    salary: "",
  });
  const [searchCriteria, setSearchCriteria] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEmployees();
    const interval = setInterval(fetchEmployees, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchEmployees = async () => {
    setisloading(true);
    await axios
      .get("/api/employees")
      .then((response) => {
        setEmps(response.data);
        console.log(emps);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
    setisloading(false);
  };

  const deleteEmp = (empId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      setisloading(true);
      axios
        .delete(`/api/employees/${empId}`)
        .then(() => {
          fetchEmployees();
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    }
    setisloading(false);
  };

  const editEmp = (employee) => {
    setEditedEmp({
      _id: employee._id,
      name: employee.name,
      father_name: employee.father_name,
      cnic: employee.cnic,
      join_date: employee.join_date,
      phone: employee.phone,
      e_mail: employee.e_mail,
      salary: employee.salary,
    });
  };

  const cancelEdit = () => {
    setEdit(false);
    setEditedEmp({
      _id: "",
      name: "",
      father_name: "",
      cnic: "",
      join_date: "",
      phone: "",
      e_mail: "",
      salary: "",
    });
  };

  const saveEdit = () => {
    setisloading(true);
    axios
      .put(`/api/employees/${editedEmp._id}`, editedEmp)
      .then(() => {
        fetchEmployees();
        setEdit(false);
        setEditedEmp({
          _id: "",
          name: "",
          father_name: "",
          cnic: "",
          join_date: "",
          phone: "",
          e_mail: "",
          salary: "",
        });
      })
      .catch((error) => {
        console.error("Error saving employee:", error);
      });
    setisloading(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedEmp((prevEmp) => ({
      ...prevEmp,
      [name]: value,
    }));
  };

  const sortByColumn = (column) => {
    const sortedEmps = [...emps];
    sortedEmps.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    setEmps(sortedEmps);
  };

  const handleSearchCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchEmployees = () => {
    let filteredEmps = emps;

    if (searchQuery) {
      const searchKey = searchQuery.toLowerCase();
      filteredEmps = emps.filter((emp) =>
        emp[searchCriteria].toLowerCase().includes(searchKey)
      );
    }

    return filteredEmps;
  };

  const filteredEmps = searchEmployees();

  return (
    <>
      {isloading && <div className="spinner mx-auto m-5"></div>}
      {!isloading && (
        <div className="row">
          <div className="col mb-3">
            <label htmlFor="searchCriteria" className="form-label">
              Search By:
            </label>
            <select
              id="searchCriteria"
              name="searchCriteria"
              value={searchCriteria}
              onChange={handleSearchCriteriaChange}
              className="form-select"
            >
              <option value="name">Name</option>
              <option value="father_name">Father Name</option>
              <option value="cnic">CNIC</option>
              <option value="phone">Phone No.</option>
              <option value="e_mail">Email</option>
              <option value="payable">Salary</option>
            </select>
          </div>
          <div className="col mb-3">
            <label htmlFor="searchQuery" className="form-label">
              Search Query:
            </label>
            <input
              type="text"
              id="searchQuery"
              name="searchQuery"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              className="form-control"
            />
          </div>
          {!edit && (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th onClick={() => sortByColumn("name")}>First Name</th>
                  <th onClick={() => sortByColumn("father_name")}>Last Name</th>
                  <th onClick={() => sortByColumn("cnic")}>CNIC</th>
                  <th onClick={() => sortByColumn("join_date")}>
                    Joining Date
                  </th>
                  <th onClick={() => sortByColumn("phone")}>Phone No.</th>
                  <th onClick={() => sortByColumn("e_mail")}>Email</th>
                  <th onClick={() => sortByColumn("payable")}>
                    Salary + Overtime Bonus
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmps.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.father_name}</td>
                    <td>{employee.cnic}</td>
                    <td>{employee.join_date}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.e_mail}</td>
                    <td>{employee.payable}</td>
                    <td className="p-0">
                      <button
                        className="btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setEdit(true);
                          editEmp(employee);
                        }}
                      >
                        <i className="bi bi-pencil p-0 "></i>
                      </button>
                      <button
                        className="btn"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteEmp(employee._id);
                        }}
                      >
                        <i className="bi bi-trash3 p-0"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {edit && (
            <div>
              <h3>Edit Employee</h3>
              <form className="w-50">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={editedEmp.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="father_name" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="father_name"
                    name="father_name"
                    value={editedEmp.father_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cnic" className="form-label">
                    CNIC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cnic"
                    name="cnic"
                    value={editedEmp.cnic}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="join_date" className="form-label">
                    Joining Date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="join_date"
                    name="join_date"
                    value={editedEmp.join_date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={editedEmp.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="e_mail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="e_mail"
                    name="e_mail"
                    value={editedEmp.e_mail}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="salary" className="form-label">
                    Salary
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="salary"
                    name="salary"
                    value={editedEmp.salary}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  className="btn btn-primary mx-2"
                  onClick={(e) => {
                    e.preventDefault();
                    saveEdit();
                  }}
                >
                  Save
                </button>
                <button className="btn btn-secondary mx-2" onClick={cancelEdit}>
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}
