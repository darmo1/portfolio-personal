import React from 'react'

const CardControl = props => {
  return (
    <div className="m-4 bg-white border border-gray-200  rounded-lg p-4   max-w-1/2 w-content">
      <h2>{props.name} </h2>
    </div>
  )
}

export default CardControl
