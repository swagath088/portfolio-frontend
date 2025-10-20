import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api"; 
import "../css/AddProject.css";
function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tech_stack", techStack);
    formData.append("github_link", githubLink);
    formData.append("live_link", liveLink);
    if (imageFile) formData.append("image", imageFile);

    try {
      await API.post("projects/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/projects"); // redirect after success
    } catch (err) {
      console.error("Add project failed:", err);
      alert("Failed to add project. Check console.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Tech Stack</label>
        <input type="text" value={techStack} onChange={(e) => setTechStack(e.target.value)} />

        <label>GitHub Link</label>
        <input type="url" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />

        <label>Live Link</label>
        <input type="url" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} />

        <label>Image</label>
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />

        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}

export default AddProject;
