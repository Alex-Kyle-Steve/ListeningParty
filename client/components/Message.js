import React from 'react'

export default function Message(props) {
  const message = props.message

  return (
    <li className="media">
      <div className="media-body">
        <strong>
          {message.user.firstName
            ? message.user.firstName +
              (message.user.lastName ? message.user.lastName[0] : '')
            : message.user.spotifyId}
          {': '}
        </strong>
        {message.content}
      </div>
    </li>
  )
}
