import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api"; 
import "../css/Blogs.css";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userIsSuper = localStorage.getItem("isSuperuser") === "true";
  const apiBase = API?.defaults?.baseURL || "";
  const mediaRoot = apiBase.replace(/\/api\/?$/, "");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get("blogs/"); 
      setBlogs(res.data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!userIsSuper) {
      alert("Only superusers can delete blogs.");
      return;
    }
    const ok = window.confirm("Delete this blog?");
    if (!ok) return;

    try {
      await API.delete(`blogs/${id}/`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed. Check console.");
    }
  };

  const handleModify = (id) => {
    if (!userIsSuper) {
      alert("Only superusers can modify blogs.");
      return;
    }
    navigate(`/modify-blog/${id}`);
  };

  const safeImage = (imgPath) => {
    if (!imgPath) return null;
    if (imgPath.startsWith("http")) return imgPath;
    if (imgPath.startsWith("/")) return `${mediaRoot}${imgPath}`;
    return `${mediaRoot}/${imgPath}`;
  };

  return (
    <div className="blogs-page">
      <header className="blogs-header">
        <h2>Blogs</h2>
        {userIsSuper && (
          <button className="primary" onClick={() => navigate("/add-blog")}>
            + Add Blog
          </button>
        )}
      </header>

      {loading ? (
        <p className="muted">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="muted">No blogs available</p>
      ) : (
        <div className="blogs-grid">
          {blogs.map((b) => (
            <article key={b.id} className="blog-card">
              <div className="blog-media">
                {b.image ? (
                  <img
                    src={safeImage(b.image)}
                    alt={b.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/150?text=No+Image";
                    }}
                  />
                ) : (
                  <div className="no-image">No image</div>
                )}
              </div>

              <div className="blog-body">
                <h3 className="blog-title">{b.title}</h3>
                <p className="blog-content">{b.content}</p>

                {userIsSuper && (
                  <div className="blog-actions">
                    <button onClick={() => handleModify(b.id)}>Modify</button>
                    <button className="danger" onClick={() => handleDelete(b.id)}>
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

export default Blogs;
