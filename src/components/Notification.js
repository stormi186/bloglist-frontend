import React from 'react'

const Notification = ({ message, type }) => {
  if (message === '' || message === null) {
    return null
  }

  if (type === 'success') {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
  else {
    return (
      <div className="fail">
        {message}
      </div>
    )
  }
}

export default Notification