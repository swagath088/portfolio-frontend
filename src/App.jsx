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

  const [mobileMenu, setMobileMenu] = useState(false); // for mobile sidebar toggle

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setMobileMenu(false);
  };

  const toggleMobileMenu = () => setMobileMenu(!mobileMenu);

  return (
    <Router>
      {/* Navbar */}
      <nav className="nav">
        {/* Hamburger for mobile */}
        <div className="mobile-hamburger" onClick={toggleMobileMenu}>
          ☰
        </div>

        {/* Navbar buttons */}
        <div className={`nav-buttons ${mobileMenu ? "open" : ""}`}>
          <Link to="/" className="nav-btn" onClick={() => setMobileMenu(false)}>Home</Link>
          <Link to="/projects" className="nav-btn" onClick={() => setMobileMenu(false)}>Projects</Link>
          <Link to="/blogs" className="nav-btn" onClick={() => setMobileMenu(false)}>Blogs</Link>
          <Link to="/add-message" className="nav-btn" onClick={() => setMobileMenu(false)}>Contact</Link>
          <Link to="/about" className="nav-btn" onClick={() => setMobileMenu(false)}>About</Link>
          {user && user.isSuperuser && (
            <>
              <Link to="/add-project" className="nav-btn" onClick={() => setMobileMenu(false)}>Add Project</Link>
              <Link to="/add-blog" className="nav-btn" onClick={() => setMobileMenu(false)}>Add Blog</Link>
              <Link to="/view-messages" className="nav-btn" onClick={() => setMobileMenu(false)}>View Messages</Link>
            </>
          )}
          {user && <button onClick={handleLogout}>Logout</button>}
        </div>
      </nav>

      {/* Content wrapper ensures mobile sidebar does not hide content */}
      <div className="content-wrapper">
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

          {/* Login route */}
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
