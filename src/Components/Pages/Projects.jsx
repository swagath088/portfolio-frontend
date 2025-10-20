import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api"; // expects axios instance with baseURL "http://127.0.0.1:8000/api/"
import "../css/Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Determine if current user is superuser (string "true" in localStorage)
  const userIsSuper = localStorage.getItem("isSuperuser") === "true";

  // compute backend root to prefix media URLs (remove trailing /api/ if present)
  const apiBase = API?.defaults?.baseURL || "";
  const mediaRoot = apiBase.replace(/\/api\/?$/, ""); // e.g. "http://127.0.0.1:8000"

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await API.get("projects/"); // GET http://127.0.0.1:8000/api/projects/
      setProjects(res.data || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete project (superuser only)
  const handleDelete = async (id) => {
    if (!userIsSuper) {
      alert("You must be a superuser to delete projects.");
      return;
    }
    const ok = window.confirm("Are you sure you want to delete this project?");
    if (!ok) return;

    try {
      await API.delete(`projects/${id}/`); // DELETE http://.../api/projects/{id}/
      // remove from state
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed — check console.");
    }
  };

  // Navigate to modify page (you can implement ModifyProject route later)
  const handleModify = (id) => {
    if (!userIsSuper) {
      alert("You must be a superuser to modify projects.");
      return;
    }
    navigate(`/modify-project/${id}`);
  };

  // safeImage: returns full URL for image (handles both absolute & relative returned values)
  const safeImage = (imgPath) => {
    if (!imgPath) return null;
    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) return imgPath;
    // some backends return '/media/...' or 'media/...'
    if (imgPath.startsWith("/")) return `${mediaRoot}${imgPath}`;
    return `${mediaRoot}/${imgPath}`;
  };

  return (
    <div className="projects-page">
      <header className="projects-header">
        <h2>Projects</h2>
        {userIsSuper && (
          <button className="primary" onClick={() => navigate("/add-project")}>
            + Add Project
          </button>
        )}
      </header>

      {loading ? (
        <p className="muted">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="muted">No projects available</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-media">
               {project.image ? (
              <img
            src={safeImage(project.image)}
            alt={project.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/420x240?text=No+Image";
            }}
          />
            ) : (
              <div className="no-image">No image</div>
            )}
              </div>

              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <p className="project-meta">
                  <strong>Tech:</strong> {project.tech_stack || "—"}
                </p>

                <div className="project-links">
                  {project.github_link && (
                    <a
                      className="link-btn"
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  )}
                  {project.live_link && (
                    <a
                      className="link-btn"
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  )}
                </div>

                {userIsSuper && (
                  <div className="project-actions">
                    <button onClick={() => handleModify(project.id)}>Modify</button>
                    <button className="danger" onClick={() => handleDelete(project.id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
