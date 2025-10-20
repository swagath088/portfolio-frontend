import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import "../css/Blogs.css";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userIsSuper = localStorage.getItem("isSuperuser") === "true";

  const mediaRoot = import.meta.env.VITE_API_BASE?.replace(/\/api\/?$/, "");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get("blogs/");
      setBlogs(res.data || []);
    } catch (err) {
      console.error(err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!userIsSuper) return alert("Only superusers can delete blogs.");
    if (!window.confirm("Delete this blog?")) return;
    try {
      await API.delete(`blogs/${id}/`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const handleModify = (id) =>
    userIsSuper ? navigate(`/modify-blog/${id}`) : alert("Only superusers can modify.");

  const safeImage = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return img.startsWith("/") ? `${mediaRoot}${img}` : `${mediaRoot}/${img}`;
  };

  return (
    <div className="blogs-page">
      <header className="blogs-header">
        <h2>Blogs</h2>
        {userIsSuper && <button onClick={() => navigate("/add-blog")}>+ Add Blog</button>}
      </header>

      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div className="blogs-grid">
          {blogs.map((b) => (
            <article key={b.id} className="blog-card">
              {b.image ? (
                <img src={safeImage(b.image)} alt={b.title} />
              ) : (
                <div>No Image</div>
              )}
              <h3>{b.title}</h3>
              <p>{b.content}</p>
              {userIsSuper && (
                <div className="blog-actions">
                  <button onClick={() => handleModify(b.id)}>Modify</button>
                  <button onClick={() => handleDelete(b.id)}>Delete</button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blogs;
