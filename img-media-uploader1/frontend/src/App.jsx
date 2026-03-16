import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './pages/home'
import {CreatePost} from './pages/createPost.jsx'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create-post' element={<CreatePost />} />
      <Route path='/feed' element={<h1 className="pageTitle">All the post feed</h1>} />
    </Routes>
  )
}

export default App
