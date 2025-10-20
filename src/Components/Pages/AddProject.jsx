import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tech_stack", techStack);
    formData.append("github_link", githubLink);
    formData.append("live_link", liveLink);
    if(imageFile) formData.append("image", imageFile);

    try {
      await API.post("projects/", formData, { headers: { Authorization: `Token ${token}`, "Content-Type": "multipart/form-data" } });
      navigate("/projects");
    } catch(err) {
      console.error(err);
      alert("Failed to add project.");
    }
  };

  return (
    <div style={{ maxWidth:"600px", margin:"auto" }}>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
        <input type="text" value={techStack} onChange={e => setTechStack(e.target.value)} placeholder="Tech Stack" />
        <input type="url" value={githubLink} onChange={e => setGithubLink(e.target.value)} placeholder="GitHub Link" />
        <input type="url" value={liveLink} onChange={e => setLiveLink(e.target.value)} placeholder="Live Link" />
        <input type="file" onChange={e => setImageFile(e.target.files[0])} />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}

export default AddProject;
