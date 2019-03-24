import React from 'react'

export default function Message(props) {
  const message = props.message

  return (
    <li className="media">
      <div className="media-body">
        <strong>{message.user.spotifyId}: </strong> {message.content}
      </div>
    </li>
  )
}
