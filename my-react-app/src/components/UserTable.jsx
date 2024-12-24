// src/components/UserTable.jsx
import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/table.css";
// import { getUsers } from "../services/Users";

const UserTable = ({ data, setData }) => {
    // useEffect(() => {
    //     try {
    //         getUsers().then((response) => {
    //             setData(response.data);
    //         });
    //     }catch(e){
    //         console.log(e);
    //     }
    // }, []);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
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
            <tr key={user.Id}>
              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td>{user.PhoneNumber}</td>
              <td>{user.AccountType}</td>
              <td>{user.PreferredBranch}</td>
              <td>
                <button onClick={() => handleView(user.Id)}>View</button>
                <button onClick={() => handleUpdate(user.Id)}>Update</button>
                <button onClick={() => handleDelete(user.Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
