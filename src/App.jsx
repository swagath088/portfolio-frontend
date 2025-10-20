import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Projects from "./Components/Pages/Projects";
import Blogs from "./Components/Pages/Blogs";
import About from "./Components/Pages/About";
import AddProject from "./Components/Pages/AddProject";
import AddBlog from "./Components/Pages/AddBlog";
import Login from "./Components/Pages/Login";
import AddMsg from "./Components/Pages/AddMsg";
import ViewMsg from "./Components/Pages/ViewMsg"; 
import ModifyProject from "./Components/Pages/ModifyProject";
import ModifyBlog from "./Components/Pages/ModifyBlog";
import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const isSuperuser = localStorage.getItem("isSuperuser") === "true";
    return token ? { token, username, isSuperuser } : null;
  });

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <Router>
      {/* Navbar for everyone */}
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="/" className="nav-btn">Home</Link> |{" "}
        <Link to="/projects" className="nav-btn">Projects</Link> |{" "}
        <Link to="/blogs" className="nav-btn">Blogs</Link> |{" "}
        <Link to="/add-message" className="nav-btn">Contact</Link>
        <Link to="/about" className="nav-btn">About</Link> |{" "}
        {user && (
          <>
            {" | "}
            {user.isSuperuser && (
              <>
                <Link to="/add-project" className="nav-btn">Add Project</Link> |{" "}
                <Link to="/add-blog" className="nav-btn">Add Blog</Link> |{" "}
                <Link to="/view-messages" className="nav-btn">View Messages</Link> |{" "}
              </>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home user={user} />} />
        <Route path="/projects" element={<Projects user={user} />} />
        <Route path="/blogs" element={<Blogs user={user} />} />
        <Route path="/about" element={<About user={user} setUser={setUser} />} />
        <Route path="/add-message" element={<AddMsg user={user} />} />

        {/* Admin-only routes */}
        <Route path="/add-project" element={user?.isSuperuser ? <AddProject /> : <Navigate to="/" />} />
        <Route path="/add-blog" element={user?.isSuperuser ? <AddBlog /> : <Navigate to="/" />} />
        <Route path="/view-messages" element={user?.isSuperuser ? <ViewMsg /> : <Navigate to="/" />} />
        <Route path="/modify-project/:id" element={user?.isSuperuser ? <ModifyProject /> : <Navigate to="/" />} />
        <Route path="/modify-blog/:id" element={user?.isSuperuser ? <ModifyBlog /> : <Navigate to="/" />} />

        {/* Login route for guests */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
