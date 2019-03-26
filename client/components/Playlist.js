import React from 'react'
import {Track} from './Track'

export const Playlist = props => {
  const playlist = props.playlist
  return (
    <div>
      {playlist &&
        playlist.map(track => <Track key={track.id} track={track} />)}
    </div>
  )
}
