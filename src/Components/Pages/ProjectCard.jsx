import React from 'react';

export default function ProjectCard({ project }) {
  const imgSrc = project.image_url || (project.image ? `http://127.0.0.1:8000${project.image}` : null);
  return (
    <div style={{ border: '1px solid #ccc', padding: 15, borderRadius: 8 }}>
      {imgSrc && <img src={imgSrc} alt={project.title} style={{ width:'100%', height:200, objectFit:'cover', borderRadius:8 }} />}
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p><strong>Tech:</strong> {project.tech_stack}</p>
      <a href={project.github_link} target="_blank" rel="noreferrer">GitHub</a>
      {project.live_link && <> | <a href={project.live_link} target="_blank" rel="noreferrer">Live</a></>}
    </div>
  );
}
