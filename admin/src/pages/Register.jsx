import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    userId: "",
    userRole: "",
    password: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(""); // Password Strength Indicator
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const validateForm = () => {
    const { name, address, contact, email, userId, userRole, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^[0-9]{10}$/;
    const userIdRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!name || !address || !contact || !email || !userId || !userRole || !password) {
      alert("All fields are required!");
      return false;
    }
    if (!emailRegex.test(email)) {
      alert("Invalid email format!");
      return false;
    }
    if (!contactRegex.test(contact)) {
      alert("Contact number must be 10 digits!");
      return false;
    }
    if (!userIdRegex.test(userId)) {
      alert("User ID must contain at least one letter, one number, and one special character!");
      return false;
    }
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters, including letters, numbers, and special characters!");
      return false;
    }
    return true;
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 8) return "Weak";
    if (/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) return "Strong";
    return "Good";
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User Registered Successfully!");
        navigate("/");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("Failed to register. Please try again later.");
    }
  };

  return (
    <div className="register-container">
  <h2>User Registration</h2>

  <label>Name:</label>
  <input
    className="input-field"
    type="text"
    name="name"
    placeholder="Enter your name"
    value={formData.name}
    onChange={handleChange}
  />

  <label>Address:</label>
  <input
    className="input-field"
    type="text"
    name="address"
    placeholder="Enter your Address"
    value={formData.address}
    onChange={handleChange}
  />

  <label>Contact:</label>
  <input
    className="input-field"
    type="text"
    name="contact"
    placeholder="Enter your contact number"
    value={formData.contact}
    onChange={handleChange}
  />

  <label>Email:</label>
  <input
    className="input-field"
    type="text"
    name="email"
    placeholder="Enter your Mail-id"
    value={formData.email}
    onChange={handleChange}
  />

  <label>User ID:</label>
  <input
    className="input-field"
    type="text"
    name="userId"
    placeholder="Enter User ID"
    value={formData.userId}
    onChange={handleChange}
  />

  <label>User Role:</label>
  <input
    className="input-field"
    type="text"
    name="userRole"
    placeholder="Enter UserRole"
    value={formData.userRole}
    onChange={handleChange}
  />

  <label>Password:</label>
  <input
    className="input-field"
    type="password"
    name="password"
    placeholder="Enter Password"
    value={formData.password}
    onChange={handleChange}
  />
  <p>Password Strength: <strong>{passwordStrength}</strong></p>

  <button className="register-button" onClick={handleRegister}>Register</button>
</div>

  );
}

export default Register;
