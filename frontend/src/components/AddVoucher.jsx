import React, { useState } from "react";
import axios from "axios";

export default function AddVoucher() {
  const [isLoading, setIsLoading] = useState(false);
  const [voucherNumber, setVoucherNumber] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState("");
  const [debitAmount, setDebitAmount] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [err, setErr] = useState(null);

  const postForm = async () => {
    setIsLoading(true);
    const response = await axios.post("/api/vouchers", {
      voucherNumber: voucherNumber,
      date: date,
      description: description,
      account: account,
      debitAmount: debitAmount,
      creditAmount: creditAmount,
    });
    if (response.data.error) {
      setErr(response.data.error);
    } else {
      window.location.reload();
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <div className="spinner mx-auto m-5"></div>}
      {err && (
        <div className="alert alert-danger w-50 mx-auto text-center">
          <h4>{err}</h4>
        </div>
      )}
      {!isLoading && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postForm();
          }}
          className="mx-auto text-center"
        >
          <input
            className="w-50 border-bottom my-2 border-0 border-secondary px-3 pt-3 pb-1"
            required
            placeholder="Voucher Number"
            type="text"
            onChange={(e) => {
              setVoucherNumber(e.target.value);
            }}
          />
          <br />
          <input
            className="w-50 border-bottom my-2 border-0 border-secondary px-3 pt-3 pb-1"
            required
            placeholder="Date"
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <br />
          <input
            className="w-50 border-bottom my-2 border-0 border-secondary px-3 pt-3 pb-1"
            required
            placeholder="Description"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <br />
          <input
            className="w-50 border-bottom my-2 border-0 border-secondary px-3 pt-3 pb-1"
            required
            placeholder="Account"
            type="text"
            onChange={(e) => {
              setAccount(e.target.value);
            }}
          />
          <br />
          <input
            className="w-50 border-bottom my-2 border-0 border-secondary px-3 pt-3 pb-1"
            required
            placeholder="Debit Amount"
            type="number"
            onChange={(e) => {
              setDebitAmount(e.target.value);
            }}
          />
          <br />
          <input
            className="w-50 border-bottom my-2 border-0 border-secondary px-3 pt-3 pb-1"
            required
            placeholder="Credit Amount"
            type="number"
            onChange={(e) => {
              setCreditAmount(e.target.value);
            }}
          />
          <br />
          <br />
          <br />
          <input
            className="btn mb-5 btn-primary w-50 rounded-5 fs-4 pb-1"
            type="submit"
            value="Add Voucher"
          />
        </form>
      )}
    </>
  );
}
