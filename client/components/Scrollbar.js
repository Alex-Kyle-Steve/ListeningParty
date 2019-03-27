import React from 'react'

export const Scrollbar = function(props) {
  return (
    <div>
      <input
        type="range"
        min="1"
        max="100"
        onMouseDown={props.onMouseDown}
        defaultValue={0}
        className="slider"
        id="myRange"
      />
    </div>
  )
}
