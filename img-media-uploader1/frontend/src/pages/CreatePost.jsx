
const CreatePost = () => {
  return (
    <div>
      <form className='postForm'>
        <input type='file' name='image' />
        <input type="text" name="caption" />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}

export default {CreatePost}
