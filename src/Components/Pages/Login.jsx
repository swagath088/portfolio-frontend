import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import "../css/Login.css";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      // Call your backend API correctly
      const res = await API.post("login/", { username, password });
      const { token, is_superuser, username: uname } = res.data;

      // Save data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("isSuperuser", is_superuser ? "true" : "false");
      localStorage.setItem("username", uname);

      // Update state
      setUser({ token, isSuperuser: is_superuser, username: uname });

      // Redirect to home
      navigate("/");
    } catch (err) {
      // Show proper error message from backend if available
      setError(err?.response?.data?.detail || "Login failed. Check credentials.");
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
