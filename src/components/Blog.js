import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, name }) => {
  const [ descriptionVisible, setDescriptionVisible ] = useState(false)
  const hideWhenVisible = { display: descriptionVisible ? 'none' : '' }
  const showWhenVisible = { display: descriptionVisible ? '' : 'none' }
  const hideFromUser = { display: (blog.user.name === name) ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteStyle = {
    background: 'blue',
    color: 'white',
    borderRadius: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div onClick={() => setDescriptionVisible(true)} className="show">
          <p className="blog">{blog.title} {blog.author}</p>
        </div>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div onClick={() => setDescriptionVisible(false)} className="hide">
          <p>{blog.title} {blog.author}</p>
        </div>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>{blog.likes} likes <button onClick={updateLikes}>like</button></p>
        <p>added by {blog.user.name}</p>
        <div style={hideFromUser}>
          <p><button onClick={deleteBlog} style={deleteStyle}>remove</button></p>
        </div>
      </div>
    </div>
  )}

export default Blog