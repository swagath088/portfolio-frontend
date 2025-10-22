import { useNavigate } from "react-router-dom";
import '../css/About.css';

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="profile-section">
        <h1>Admin Portfolio</h1>
        <img src="/images/profile.jpg" alt="Swagath" className="profile-img" />
        <p>
          Hi, I’m Swagath. I am a passionate web developer who loves creating modern and responsive web applications. My goal is to build projects that are both functional and visually appealing, delivering smooth experiences for users.
        </p>
      </div>

      <div className="about-content">
        <p>
          I specialize in full-stack development using React for frontend and Django REST Framework for backend. I focus on clean code, responsive design, and user-friendly interfaces. 
          I also manage my projects and blogs through a secure admin dashboard, giving me hands-on experience with CRUD operations, authentication, and role-based access control.
        </p>
      </div>

      <footer className="about-footer">
        <span>&copy; {new Date().getFullYear()} Swagath Portfolio</span>
        <span className="admin-login-link" onClick={() => navigate("/login")} title="Admin login">
          &nbsp; Admin Login
        </span>
      </footer>
    </div>
  );
}

export default About;
