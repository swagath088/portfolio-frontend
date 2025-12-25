📌 Portfolio Frontend (React + Vite)

This repository contains the frontend for my personal portfolio website, built using React with Vite.
It connects to a Django REST backend to display projects, blogs, and handle admin authentication.

🚀 Features

Display of Projects and Blogs

Secure admin login connected to Django backend

Dynamic content fetched using REST APIs

Responsive and clean user interface

Media (images) served via Cloudinary URLs

🧰 Tech Stack

Frontend: React (Vite)

Routing: React Router

State Management: useState, useEffect

Styling: CSS

API Requests: Axios

Tooling: Node.js, npm

⚙️ Prerequisites

Node.js 18+

npm

Backend server running (locally or deployed)

🔧 Setup Instructions (Local)
1. Clone the repository
git clone https://github.com/swagath088/portfolio-frontend.git
cd portfolio-frontend

2. Install dependencies
npm install

3. Configure backend API

Update the backend API base URL in your frontend configuration:

http://127.0.0.1:8000


(Replace with the deployed backend URL when running live.)

4. Run the development server
npm run dev


The application will run at:

http://localhost:5173

🌐 Live Deployment

Frontend: Vercel

Backend: Render
