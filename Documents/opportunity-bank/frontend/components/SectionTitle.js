import React from 'react'

const SectionTitle = ({ color_title, children }) => {
  return (
    <div className="flex mx-auto mb-12 md:w-full">
      <h2
        className={`text-3xl border-b-2 w-full md:w-1/2 text-${color_title} border-${color_title}`}
      >
        {children}
      </h2>
      <h2 className="hidden md:block md:border-b md:w-1/2"></h2>
    </div>
  )
}

export default SectionTitle
