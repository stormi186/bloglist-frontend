import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { useField } from './hooks'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ errorType, setErrorType ] = useState('fail')
  const username = useField('text')
  const password = useField('password')
  const title = useField('string')
  const author = useField('string')
  const url = useField('string')
  const [ user, setUser ] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    try {
      const returnedBlog = await blogService.create(blogObject)
      setErrorType('success')
      setErrorMessage(
        `a new blog '${title.value} by '${author.value}' added`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.concat(returnedBlog))
    }
    catch(error) {
      setErrorType('fail')
      setErrorMessage(error.response.data.error)
    }
    title.reset()
    author.reset()
    url.reset()
  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload(false)
  }

  const loginForm = () => {
    const handleLogin = async (event) => {
      event.preventDefault()
      try {
        const user = await loginService.login({
          username: username.value, password: password.value,
        })
        window.localStorage.setItem(
          'loggedBlogAppUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        setUser(user)
        setErrorType('success')
        setErrorMessage(
          'successful login'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } catch (exception) {
        setErrorType('fail')
        setErrorMessage('wrong username or password')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        username.reset()
        password.reset()
      }
    }

    return (
      <form onSubmit={handleLogin} className="login">
        <h1>log in to application</h1>
        <div>
        username
          <input {...username} reset="true" />
        </div>
        <div>
        password
          <input {...password} reset="true" />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        addBlog={addBlog}
        title={title}
        author={author}
        url={url}
      />
    </Togglable>
  )

  const loggedInHeader = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button type="submit" onClick={handleLogout}>logout</button></p>
    </div>
  )

  const updateLikesOf = async (id) => {
    try {
      const oldBlog = blogs.find(o => o.id === id)
      const changedBlog = { ...oldBlog, likes: oldBlog.likes+1 }
      await blogService.update(id, changedBlog)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
      setErrorType('success')
      setErrorMessage(
        'thanks for like'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    catch(error) {
      setErrorType('fail')
      setErrorMessage(
        'Cant add like'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.filter(n => n.id !== id))
    }
  }

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find(o => o.id === id)
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      try {
        await blogService.deleteBlog(id)
        const newBlogs = await blogService.getAll()
        setBlogs(newBlogs)
        setErrorType('success')
        setErrorMessage(
          'blog successfully deleted'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      catch(error) {
        setErrorType('fail')
        setErrorMessage(
          'Cant delete'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter(n => n.id !== id))
      }
    }
  }

  const allBlogs = () => (
    <div>
      <Blogs blogsToShow={blogs} updateLikesOf={updateLikesOf} deleteBlog={deleteBlog} name={user.name} />
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} type={errorType} />
      {user === null && loginForm()}
      {user !== null && loggedInHeader()}
      {user !== null && blogForm()}
      {user !== null && allBlogs()}
    </div>
  )
}

export default App