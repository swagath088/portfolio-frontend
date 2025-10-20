import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if(category) formData.append("category", category);
    if(imageFile) formData.append("image", imageFile);

    try {
      await API.post("blogs/", formData, { headers: { Authorization: `Token ${token}`, "Content-Type": "multipart/form-data" } });
      navigate("/blogs");
    } catch(err) {
      console.error(err);
      alert("Failed to add blog.");
    }
  };

  return (
    <div style={{ maxWidth:"600px", margin:"auto" }}>
      <h2>Add Blog</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
        <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
        <input type="file" onChange={e => setImageFile(e.target.files[0])} />
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default AddBlog;
