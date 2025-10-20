import React from 'react';

function BlogCard({ blog }) {
  const mediaRoot = process.env.REACT_APP_API_BASE?.replace(/\/api\/?$/, "");

  const safeImage = (imgPath) => {
    if (!imgPath) return null;
    if (imgPath.startsWith("http")) return imgPath;
    return imgPath.startsWith("/") ? `${mediaRoot}${imgPath}` : `${mediaRoot}/${imgPath}`;
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 15, marginBottom: 15, borderRadius: 8 }}>
      {blog.image && <img src={safeImage(blog.image)} alt={blog.title} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8 }} />}
      <h2>{blog.title}</h2>
      <p><strong>Author:</strong> {blog.author}</p>
      <p>{blog.content}</p>
      <p><em>{new Date(blog.created_at).toLocaleDateString()}</em></p>
    </div>
  );
}

export default BlogCard;
