import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api";

function ModifyBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [blog, setBlog] = useState({ title: "", content: "", category: "", image: "" });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`blogs/${id}/`, { headers: { Authorization: `Token ${token}` } })
      .then(res => setBlog(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleChange = e => setBlog({ ...blog, [e.target.name]: e.target.value });
  const handleImageChange = e => { if(e.target.files && e.target.files[0]) setImageFile(e.target.files[0]); };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("content", blog.content);
    if(blog.category) formData.append("category", blog.category);
    if(imageFile) formData.append("image", imageFile);

    try {
      await API.put(`blogs/${id}/`, formData, { headers: { Authorization: `Token ${token}`, "Content-Type": "multipart/form-data" } });
      alert("Blog updated!");
      navigate("/blogs");
    } catch(err) {
      console.error(err.response?.data);
      alert("Failed to update blog.");
    }
  };

  if(loading) return <p>Loading blog...</p>;

  return (
    <div style={{ maxWidth:"600px", margin:"auto" }}>
      <h2>Modify Blog</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={blog.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="content" value={blog.content} onChange={handleChange} placeholder="Content" required />
        <input type="text" name="category" value={blog.category || ""} onChange={handleChange} placeholder="Category" />
        {blog.image && <div><p>Current Image:</p><img src={blog.image} alt="Current" style={{ width:150, borderRadius:8 }}/></div>}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}

export default ModifyBlog;
