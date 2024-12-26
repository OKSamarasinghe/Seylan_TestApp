// src/components/UpdateUser.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./../styles/form.css";
import { getUserById, updateUser } from "../services/Users";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: id,
    name: "",
    email: "",
    phoneNumber: "",
    accountType: "",
    preferredBranch: "",
    userImage: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    getUserById(id).then((response) => {
      console.log(response.data);
      setFormData(response.data);

      if(imagePreview === null){
        setImagePreview(response.data.userImage);
      }
      if(imagePreview !== null){
        console.log("Image preview code: " + imagePreview);
      }
    });
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Update the preview
        setFormData((prevData) => ({ ...prevData, userImage: reader.result })); // Update formData
      };
      reader.readAsDataURL(file); // Convert to base64
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submission
    console.log("Submitting form data:", formData); // Log the entire formData
    try {
      const response = await updateUser(formData); // Send updated formData
      if (response.status === 200) {
        alert("User updated successfully!");
        navigate("/table"); // Redirect after success
      } else {
        console.error("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };
  

  return (
    <div className="form-container">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={formData.name}
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
            name="preferredBranch"
            value={formData.preferredBranch}
            onChange={handleChange}
            required
          />
        </label>

        {/*Upload a user Image*/}
        <label>
          User Image:
          <input
            type="file"
            name="UserImage"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </label> 

        {/*Display the image preview */}
        {imagePreview && (
          <div>
            <label>Image Preview</label>
            <img src={imagePreview} alt="Image preview" style={{maxHeight: "200px", maxWidth: "200px"}}/>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UpdateUser;
