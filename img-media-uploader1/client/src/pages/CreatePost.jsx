import { useNavigate } from "react-router-dom"
import axios from 'axios'

const CreatePost = () => {
  const navigate = useNavigate();

  
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
      const formData = new FormData(e.target);
      axios.post('http://localhost:8000/posts/create-post', formData)
      .then((res)=>{
        console.log(res.data)
        alert("Form submitted successfully !!")
        navigate('/');
      })
      .catch((error)=>{
        console.log("form submission failed ", error.message)
      })
  }

  return (
    <div className="app">
      <div className="container">
        <div className="card formBox">
          <h1 className="title">Create Post</h1>
          <p className="subtitle">Upload your image and caption.</p>

          <form className="postForm" onSubmit={onSubmitHandler}>
            <input type="file" name="image" />
            <input type="text" name="caption" placeholder="Caption" />
            <button className="buttonPrimary" type="submit">Upload</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
