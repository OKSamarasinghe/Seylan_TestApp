import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/form.css";
import  addUser  from "../services/Users";

const UserDetailForm = ({ data, setData }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    PhoneNumber: "",
    AccountType: "",
    PreferredBranch: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Adding the user to the backend first
    try {
      const newUser = await addUser(formData);
      if (newUser) {
        setData([...data, { ...formData, id: Date.now() }]); // Adding to local state
        alert("Form Submitted Successfully!");
        navigate("/table"); // Redirect to table page
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Seylan Bank - User Details Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="Name" // Use matching field name
            value={formData.Name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="Email" // Use matching field name
            value={formData.Email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="PhoneNumber" // Use matching field name
            value={formData.PhoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </label>
        <label>
          Account Type:
          <select
            name="AccountType" // Use matching field name
            value={formData.AccountType}
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
            name="PreferredBranch" // Use matching field name
            value={formData.PreferredBranch}
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
