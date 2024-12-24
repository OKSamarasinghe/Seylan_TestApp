// src/components/UpdateUser.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./../styles/form.css";

const UpdateUser = ({ users, setUsers }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find((user) => user.id === parseInt(id));

  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = users.map((u) =>
      u.id === parseInt(id) ? { ...formData } : u
    );
    setUsers(updatedUsers);
    alert("User updated successfully!");
    navigate("/table");
  };

  return (
    <div className="form-container">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
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
            required
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UpdateUser;
