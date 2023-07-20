import axios from "axios";
import React, { useState } from "react";

export default function AddCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const postForm = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/customers", {
        name: name,
        address: address,
        phone: phone,
        e_mail: email,
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        // Clear form fields
        setName("");
        setaddress("");
        setPhone("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      setError("Failed to add customer");
    }

    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <div className="spinner mx-auto m-5"></div>}
      {error && (
        <div className="alert alert-danger w-50 mx-auto text-center">
          <h4>{error}</h4>
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
            placeholder="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            className="w-50 border-bottom my-2 border-0 border-secondary px-3 pt-3 pb-1"
            placeholder="address"
            type="text"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <input
            className="w-50 border-bottom my-2 border-0 border-secondary px-3 pt-3 pb-1"
            required
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            className="btn mb-5 btn-primary w-50 rounded-5 fs-4 pb-1"
            type="submit"
            value="Add Customer"
          />
        </form>
      )}
    </>
  );
}
