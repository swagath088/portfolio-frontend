import { useNavigate } from "react-router-dom";
import '../css/About.css';

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="profile-section">
        <h1>Admin-Portfolio</h1>
        <img src="/images/profile.jpg" alt="Profile" className="profile-img" />
        <p>
          Hi! I am a passionate web developer. Explore my projects and blogs. You can contact me anytime, even without logging in.
        </p>
      </div>

      <div className="about-content">
        <p>
          I specialize in building modern web applications using React and Django. My focus is on clean design, responsive layouts, and smooth user experience. 
          I also manage my projects and blogs through a secure admin login for full CRUD functionality.
        </p>
      </div>

      <footer className="about-footer">
        <span>&copy; {new Date().getFullYear()} My Portfolio</span>
        <span className="admin-login-link" onClick={() => navigate("/login")} title="Admin login">
          Admin-Login
        </span>
      </footer>
    </div>
  );
}

export default About;
