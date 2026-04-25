import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(""https://safeface-clean-bl8z.onrender.com/login"", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
  alert("Login successful");

  localStorage.setItem("userId", data.userId);
  console.log("Saved userId:", data.userId);

  localStorage.setItem("userId", data.userId);
localStorage.setItem("role", data.role);

if (data.role === "Admin") {
  navigate("/admin");
} else {
  navigate("/dashboard");
}
}

  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">SafeFace</h1>
        <p className="auth-subtitle">
          Uncover the truth. Protect your digital identity.
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit" className="auth-button">
            Log In
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
       <p className="text-sm text-center mt-2">
  <span
    onClick={() => navigate("/forgot-password")}
    style={{
      color: "#2563eb",
      cursor: "pointer",
      fontWeight: "500"
    }}
    onMouseOver={e => e.target.style.textDecoration = "underline"}
    onMouseOut={e => e.target.style.textDecoration = "none"}
  >
    Forgot password?
  </span>
</p>

</div>
 </div>

    

  );
}

export default Login;

