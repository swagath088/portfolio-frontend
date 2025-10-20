import { Link } from "react-router-dom";

function Navbar({ user, handleLogout }) {
  return (
    <nav style={{
      display: "flex",
      gap: "15px",
      padding: "10px 20px",
      backgroundColor: "#333",
      color: "#fff",
      alignItems: "center"
    }}>
      <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
      <Link to="/projects" style={{ color: "#fff", textDecoration: "none" }}>Projects</Link>
      <Link to="/blogs" style={{ color: "#fff", textDecoration: "none" }}>Blogs</Link>
      <Link to="/add-message" style={{ color: "#fff", textDecoration: "none" }}>Contact</Link>
      <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>About</Link>

      {/* Show Logout and admin links only if logged in */}
      {user && (
        <>
          {user.isSuperuser && (
            <>
              <Link to="/add-project" style={{ color: "#fff", textDecoration: "none" }}>Add Project</Link>
              <Link to="/add-blog" style={{ color: "#fff", textDecoration: "none" }}>Add Blog</Link>
              <Link to="/view-messages" style={{ color: "#fff", textDecoration: "none" }}>View Messages</Link>
            </>
          )}
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "auto",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "5px 12px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
