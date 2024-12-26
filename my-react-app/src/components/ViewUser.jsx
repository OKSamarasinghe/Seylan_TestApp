// src/components/ViewUser.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./../styles/form.css";
import { getUserById } from "../services/Users";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserById(id);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user details. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div className="form-container">
      <h2>View User Details</h2>
      <p><strong>Full Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
      <p><strong>Account Type:</strong> {user.accountType}</p>
      <p><strong>Preferred Branch:</strong> {user.preferredBranch}</p>
      <button onClick={() => navigate("/table")}>Back to Table</button>
    </div>
  );
};

export default ViewUser;
