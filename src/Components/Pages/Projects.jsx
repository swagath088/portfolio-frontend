import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import "../css/Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userIsSuper = localStorage.getItem("isSuperuser") === "true";

  const mediaRoot = import.meta.env.VITE_API_BASE?.replace(/\/api\/?$/, "");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await API.get("projects/");
      setProjects(res.data || []);
    } catch (err) {
      console.error(err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!userIsSuper) return alert("Only superusers can delete projects.");
    if (!window.confirm("Are you sure to delete this project?")) return;
    try {
      await API.delete(`projects/${id}/`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const handleModify = (id) =>
    userIsSuper
      ? navigate(`/modify-project/${id}`)
      : alert("Only superusers can modify projects.");

  const safeImage = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return img.startsWith("/") ? `${mediaRoot}${img}` : `${mediaRoot}/${img}`;
  };

  return (
    <div className="projects-page">
      <header className="projects-header">
        <h2>Projects</h2>
        {userIsSuper && (
          <button onClick={() => navigate("/add-project")}>+ Add Project</button>
        )}
      </header>

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              {project.image ? (
                <img
                  src={safeImage(project.image)}
                  alt={project.title}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/420x240?text=No+Image")
                  }
                />
              ) : (
                <div>No image</div>
              )}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>
                <strong>Tech:</strong> {project.tech_stack || "—"}
              </p>
              <div className="project-links">
                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}
                {project.live_link && (
                  <>
                    {" "}
                    |{" "}
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  </>
                )}
              </div>

              {userIsSuper && (
                <div className="project-actions">
                  <button onClick={() => handleModify(project.id)}>Modify</button>
                  <button onClick={() => handleDelete(project.id)}>Delete</button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
