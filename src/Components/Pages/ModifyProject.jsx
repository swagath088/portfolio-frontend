import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api"; // your axios instance

function ModifyProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [project, setProject] = useState({
    title: "",
    description: "",
    tech_stack: "",
    github_link: "",
    live_link: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`projects/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => setProject(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", project.title);
    formData.append("description", project.description);
    if (project.tech_stack) formData.append("tech_stack", project.tech_stack);
    if (project.github_link) formData.append("github_link", project.github_link);
    if (project.live_link) formData.append("live_link", project.live_link);
    if (imageFile) formData.append("image", imageFile); // only if new image chosen

    try {
      await API.put(`projects/${id}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Project updated successfully!");
      navigate("/projects");
    } catch (err) {
      console.error("Update project failed:", err.response?.data);
      alert("❌ Failed to update project. Check console.");
    }
  };

  if (loading) return <p>Loading project...</p>;

  return (
    <div className="modify-project-page">
      <h2>Modify Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={project.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="tech_stack"
          value={project.tech_stack || ""}
          onChange={handleChange}
          placeholder="Tech Stack"
        />
        <input
          type="text"
          name="github_link"
          value={project.github_link || ""}
          onChange={handleChange}
          placeholder="GitHub Link"
        />
        <input
          type="text"
          name="live_link"
          value={project.live_link || ""}
          onChange={handleChange}
          placeholder="Live Link"
        />

        {/* ✅ Show current image if exists */}
        {project.image && (
          <div style={{ marginBottom: "10px" }}>
            <p>Current Image:</p>
            <img
              src={project.image}
              alt="Current project"
              style={{ width: "150px", borderRadius: "8px" }}
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="submit">Update Project</button>
      </form>
    </div>
  );
}

export default ModifyProject;
