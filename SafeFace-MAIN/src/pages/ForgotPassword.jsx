import { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://127.0.0.1:5000/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    alert("If this email exists, a reset link has been sent.");
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h2 className="forgot-title">Forgot Password</h2>
        <p className="forgot-subtitle">
          Enter your registered email to receive a reset link
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="forgot-input"
            placeholder="Enter registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="forgot-button" type="submit">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
