// src/components/UserTable.jsx
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/table.css";
import { deleteUser, getAllUsers} from "../services/Users";

const UserTable = () => {

    const [data, setData] = useState([]);

  useEffect(() => {
    getAllUsers().then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    try{
      deleteUser(id).then((response) => {
        console.log(response);
        alert("User deleted successfully!");
        setData((prevData) => prevData.filter((user) => user.id !== id));
      });
    }catch(error){
      console.log(error);
      }
  };

  const handleView = (id) => {
    navigate(`/view/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleBack = () => {
    navigate("/");  // This will navigate back to the homepage or a specific route.
  };

  return (
    <div className="table-container">
      {/* Back Button */}
      <button className="back-btn" onClick={handleBack}>Back</button>

      <h2>Seylan User Details</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Account Type</th>
            <th>Preferred Branch</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.accountType}</td>
              <td>{user.preferredBranch}</td>
              <td>
                <button onClick={() => handleView(user.id)}>View</button>
                <button onClick={() => handleUpdate(user.id)}>Update</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
