import React, { useState } from "react";
import "../Register.css";
import { Link } from "react-router-dom";


function Register() {
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    password: "",
    userName: "",
    contactNumber: ""
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

 
  // ✅ Password strength check
  if (!isStrongPassword(formData.password)) {
    alert(
      "Password must contain at least 1 uppercase letter and 1 special character"
    );
    return;
  }

  // ✅ Contact number check
  if (!isValidContactNumber(formData.contactNumber)) {
    alert("Contact number must be exactly 10 digits");
    return;
  }

  try {
    const response = await fetch(""https://safeface-clean-bl8z.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message);
  } catch (error) {
    alert("Error connecting to backend");
    console.error(error);
  }
};

  const isStrongPassword = (password) => {
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  return uppercaseRegex.test(password) && specialCharRegex.test(password);
};

const isValidContactNumber = (contact) => {
  const contactRegex = /^\d{10}$/; // exactly 10 digits
  return contactRegex.test(contact);
};

  return (
    <div className="register-container">
      <h1>SafeFace</h1>
      <p className="subtitle">Welcome To SafeFace</p>

      <form className="register-form" onSubmit={handleSubmit}>
        <input
        type="text"
        name="userId"
        placeholder="User ID"
       value={formData.userId}
       onChange={(e) => {
       const noSpaces = e.target.value.replace(/\s/g, "");
       setFormData({ ...formData, userId: noSpaces });
        }}
        minLength={8}
      required
       />

        <input
          type="email"
          name="email"
          placeholder="Email ID"
          onChange={handleChange}
          pattern="^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$"
         title="Only Gmail or Yahoo email addresses are allowed"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          minLength={8}
          required
        />

       <input
        type="text"
        name="userName"
        placeholder="User Name"
        value={formData.userName}
        onChange={(e) => {
        const onlyLetters = e.target.value.replace(/[^a-zA-Z ]/g, "");
        setFormData({ ...formData, userName: onlyLetters });
        }}
       
       required
       />

        <input
         type="text"
         name="contactNumber"
         value={formData.contactNumber}
         placeholder="Contact Number"
         maxLength={10}
         onChange={(e) => {
           const onlyNumbers = e.target.value.replace(/\D/g, "");
           setFormData({ ...formData, contactNumber: onlyNumbers });
       }}
       required
      />

        <button type="submit">Register</button>
        <p className="login-text">
        If already have an account?{" "}
        
        <Link to="/login" className="login-link">
  Log in
</Link>
</p>
      </form>
    </div>
  );
}

export default Register;
