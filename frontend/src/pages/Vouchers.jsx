import React, { useState, useEffect } from "react";
import axios from "axios";
import AddVoucher from "../components/AddVoucher";

export default function VoucherList() {
  const [vouchers, setVouchers] = useState([]);
  const [view, setView] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState("voucherNumber");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await axios.get("/api/vouchers");
      setVouchers(response.data.vouchers);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  const handleSearchCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchVouchers = () => {
    if (!searchQuery) {
      return vouchers;
    }

    const filteredVouchers = vouchers.filter((voucher) => {
      const fieldValue = voucher[searchCriteria].toLowerCase();
      const searchValue = searchQuery.toLowerCase();
      return fieldValue.includes(searchValue);
    });

    return filteredVouchers;
  };

  const filteredVouchers = searchVouchers();

  return (
    <>
      {!view && <AddVoucher />}
      {view && (
        <div className="container my-5">
          <button
            onClick={(e) => {
              e.preventDefault();
              setView(false);
            }}
            className="btn btn-outline-primary my-3"
          >
            Add Voucher
          </button>
          <div className="mb-3 w-25">
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
              <option value="voucherNumber">Voucher Number</option>
              <option value="description">Description</option>
              <option value="account">Account</option>
            </select>
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
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {filteredVouchers.map((voucher) => (
              <div className="col" key={voucher._id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      Voucher Number: {voucher.voucherNumber}
                    </h5>
                    <p className="card-text">
                      Description: {voucher.description}
                    </p>
                    <p className="card-text">Account: {voucher.account}</p>
                    <p className="card-text">
                      Debit Amount: {voucher.debitAmount}
                    </p>
                    <p className="card-text">
                      Credit Amount: {voucher.creditAmount}
                    </p>
                    <p className="card-text">Balance: {voucher.balance}</p>
                    <p className="card-text">Date: {voucher.date}</p>
                    {voucher.isApproved ? (
                      <span className="badge bg-success">Approved</span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        Pending Approval
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
