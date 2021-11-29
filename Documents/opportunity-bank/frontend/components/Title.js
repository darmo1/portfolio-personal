import React from 'react'

const Title = ({ children }) => {
  return (
    <h1 className={`text-center text-3xl font-semibold text-color_primary_2_ligth my-4`}>
      {children}
    </h1>
  )
}

export default Title
