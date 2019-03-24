import React from 'react'

export default function Message(props) {
  const message = props.message
  return (
    <li className="media">
      <div className="media-body">
        <h4 className="media-heading">{message.user.firstName}</h4>
        {message.content}
      </div>
    </li>
  )
}
