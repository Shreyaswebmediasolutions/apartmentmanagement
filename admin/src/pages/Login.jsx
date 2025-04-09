import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Ensure this path is correct

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userId || !password) {
      setError("User ID and Password are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login Successful!");
        navigate("/dashboard"); // ✅ Redirect to Dashboard
      } else {
        setError(data.message || "Invalid credentials!");
      }
    } catch (error) {
      setError("Server error! Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2>Apartment Management Login</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleLogin}>
        <label>User ID:</label>
        <input 
          type="text" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          placeholder="Enter your User ID" 
        />

        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter your Password" 
        />

        <button type="submit" className="btn-signin">Sign In</button>
      </form>

      <p>Don't have an account?</p>
      <button className="btn-signup" onClick={() => navigate("/register")}>Sign Up</button>
    </div>
  );
}

export default Login;
