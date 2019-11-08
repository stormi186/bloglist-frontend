import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogsToShow, updateLikesOf, deleteBlog, name }) => {

  const rows = () => blogsToShow.map(blog =>
    <Blog key={blog.id} blog={blog} name={name} updateLikes={() => updateLikesOf(blog.id)} deleteBlog={() => deleteBlog(blog.id)} />
  )

  return (
    <div>
      {rows()}
    </div>
  )
}

export default Blogs