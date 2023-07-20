import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CustomerList() {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [searchCriteria, setSearchCriteria] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCustomers();
    const interval = setInterval(fetchCustomers, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
    setIsLoading(false);
  };

  const deleteCustomer = (customerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (confirmDelete) {
      setIsLoading(true);
      axios
        .delete(`/api/customers/${customerId}`)
        .then(() => {
          setCustomers((prevCustomers) =>
            prevCustomers.filter((customer) => customer._id !== customerId)
          );
        })
        .catch((error) => {
          console.error("Error deleting customer:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const editCustomer = (customer) => {
    setEditedCustomer({
      id: customer._id,
      name: customer.name,
      address: customer.address,
      phone: customer.phone,
      email: customer.e_mail,
    });
    setEdit(true);
  };

  const cancelEdit = () => {
    setEdit(false);
    setEditedCustomer({
      id: "",
      name: "",
      address: "",
      phone: "",
      email: "",
    });
  };

  const saveEdit = () => {
    setIsLoading(true);
    const { id, name, address, phone, email } = editedCustomer;
    axios
      .put(`/api/customers/${id}`, { name, address, phone, e_mail: email })
      .then(() => {
        fetchCustomers();
        setEdit(false);
        setEditedCustomer({
          id: "",
          name: "",
          address: "",
          phone: "",
          email: "",
        });
      })
      .catch((error) => {
        console.error("Error saving customer:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const sortByColumn = (column) => {
    const sortedCustomers = [...customers];
    sortedCustomers.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    setCustomers(sortedCustomers);
  };

  const handleSearchCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchCustomers = () => {
    let filteredCustomers = customers;

    if (searchQuery) {
      const searchKey = searchQuery.toLowerCase();
      filteredCustomers = customers.filter((customer) =>
        customer[searchCriteria].toLowerCase().includes(searchKey)
      );
    }

    return filteredCustomers;
  };

  const filteredCustomers = searchCustomers();

  return (
    <>
      {isLoading && <div className="spinner mx-auto m-5"></div>}
      {!isLoading && (
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
              <option value="address">address</option>
              <option value="phone">Phone No.</option>
              <option value="email">Email</option>
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
                  <th onClick={() => sortByColumn("name")}>Name</th>
                  <th onClick={() => sortByColumn("address")}>address</th>
                  <th onClick={() => sortByColumn("phone")}>Phone No.</th>
                  <th onClick={() => sortByColumn("email")}>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer._id}>
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.e_mail}</td>
                    <td className="p-0">
                      <button
                        className="btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setEdit(true);
                          editCustomer(customer);
                        }}
                      >
                        <i className="bi bi-pencil p-0"></i>
                      </button>
                      <button
                        className="btn"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteCustomer(customer._id);
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
              <h3>Edit Customer</h3>
              <form className="w-50">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={editedCustomer.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={editedCustomer.address}
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
                    value={editedCustomer.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={editedCustomer.email}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="btn btn-primary mx-2" onClick={saveEdit}>
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
