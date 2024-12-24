// src/components/ViewUser.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./../styles/form.css";

const ViewUser = ({ users }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div className="form-container">
      <h2>View User Details</h2>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phoneNumber}</p>
      <p><strong>Account Type:</strong> {user.accountType}</p>
      <p><strong>Branch:</strong> {user.branch}</p>
      <button onClick={() => navigate("/table")}>Back to Table</button>
    </div>
  );
};

export default ViewUser;
