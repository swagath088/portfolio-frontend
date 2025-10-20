import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api"; 
import "../css/AddBlog.css";
function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  if (imageFile) formData.append("image", imageFile);

  try {
    const res = await API.post("blogs/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Token ${localStorage.getItem("token")}`,
      },
    });
    console.log("Blog added:", res.data);
    navigate("/blogs");
  } catch (err) {
    console.error("Add blog failed:", err.response?.data);
  }
};


  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Add Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />

        <label>Image</label>
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />

        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default AddBlog;
