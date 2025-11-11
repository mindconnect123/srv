import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/home");
      } else {
        alert(data || "Login failed");
      }
    } catch (err) {
      alert("Login failed, please try again.");
    }
  };

  // Handle signup/register
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const msg = await res.text();
      if (res.ok) {
        alert("Registration successful! You can now log in.");
        setIsLogin(true); // Switch to login mode
      } else {
        alert(msg);
      }
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>{isLogin ? "Login" : "Sign Up"} to MindConnect</h2>
      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ display: "block", marginBottom: 10, width: "100%" }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: 10, width: "100%" }}
          required
        />
        <button type="submit" style={{ width: "100%" }}>
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <div style={{ marginTop: 10 }}>
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </span>
          </>
        ) : (
          <>
            Already a user?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setIsLogin(true)}
            >
              Login
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
