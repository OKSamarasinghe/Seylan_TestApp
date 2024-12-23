// src/components/UserDetailForm.jsx
import React, { useState } from "react";
import "./../styles/form.css";

const UserDetailForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    accountType: "",
    branch: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Details Submitted:", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="form-container">
      <h2>Seylan Bank - User Details Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </label>
        <label>
          Account Type:
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            required
          >
            <option value="">--Select Account Type--</option>
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
            <option value="Fixed Deposit">Fixed Deposit</option>
          </select>
        </label>
        <label>
          Preferred Branch:
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            placeholder="Enter your preferred branch"
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserDetailForm;
