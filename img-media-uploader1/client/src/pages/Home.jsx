import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <button onClick={() => navigate("/create-post")}>
        Create Post
      </button>

      <button onClick={() => navigate("/feed")}>
        View Feed
      </button>
    </div>
  )
}

export default Home
