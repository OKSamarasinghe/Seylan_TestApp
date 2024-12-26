import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/form.css";
import  { addUser }  from "../services/Users.js";

const UserDetailForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    accountType: "",
    preferredBranch: "",
    userImage: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, userImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Adding the user to the backend first
    try {
      const newUser = await addUser(formData);
      if (newUser) {
        setFormData({
          name: newUser.name,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          accountType: newUser.accountType,
          preferredBranch: newUser.preferredBranch,
          userImage: newUser.userImage,
        });
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
            name="name" // Use matching field name
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email" // Use matching field name
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
            name="phoneNumber" // Use matching field name
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </label>
        <label>
          Account Type:
          <select
            name="accountType" // Use matching field name
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
            name="preferredBranch" // Use matching field name
            value={formData.preferredBranch}
            onChange={handleChange}
            placeholder="Enter your preferred branch"
            required
          />
        </label>

        {/*Upload a user Image*/}
        <label>
          User Image:
          <input
            type="file"
            name="userImage"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </label> 

        {/*Display the image preview */}
        {imagePreview && (
          <div className="justify-center">
            <label>Image Preview</label>
            <img src={imagePreview} alt="Image preview" style={{maxHeight: "200px", maxWidth: "200px"}}/>
          </div>
        )}

        <button type="submit">Submit</button>
        <button onClick={() => { navigate("/table") }}>View the table</button>
      </form>
    </div>
  );
};

export default UserDetailForm;
