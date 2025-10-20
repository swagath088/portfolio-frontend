import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import '../css/Login.css';

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
      const res = await API.post("login/", { username, password });
      const { token, is_superuser, username: uname } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("isSuperuser", is_superuser ? "true" : "false");
      localStorage.setItem("username", uname);

      setUser({ token, isSuperuser: is_superuser, username: uname });
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.detail || "Login failed. Check credentials.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
