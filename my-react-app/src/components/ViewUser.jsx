// src/components/ViewUser.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./../styles/form.css";
import { getUserById } from "../services/Users";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    phoneNumber: "",
    accountType: "",
    preferredBranch: "",
    userImage: "",
  });

  //load the specefic user detail on load
  useEffect(() => {
    getUserById(id).then((response)=>{
      console.log(response.data);
      setUser(response.data);
    })
  }, []);
  
  return (
    <div className="form-container">
      <h2>View User Details</h2>
      <p><strong>User Id:</strong> {user.id}</p>
      <p><strong>Full Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phoneNumber}</p>
      <p><strong>Account Type:</strong> {user.accountType}</p>
      <p><strong>Branch:</strong> {user.preferredBranch}</p>
      <p><strong>Image:</strong><img src={user.userImage} style={{maxHeight: "150px", maxWidth: "150px"}}/></p>

      <button onClick={() => navigate("/table")}>Back to Table</button>
    </div>
  );
};

export default ViewUser;
