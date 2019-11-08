import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog, title, author, url }) => {

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
      title:
        <input {...title} reset="true" />
      </div>
      <div>
        author:
        <input {...author} reset="true" />
      </div>
      <div>
        url:
        <input {...url} reset="true" />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newUrl: PropTypes.string.isRequired,
}

export default BlogForm