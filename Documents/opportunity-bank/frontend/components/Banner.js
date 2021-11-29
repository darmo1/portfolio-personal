import React from 'react'

const Banner = ({ title, image_url }) => {
  return (
    <section className="flex md:h-60">
      <div className="bg-color_primary_2_ligth w-full"></div>
      <div className="main-wrapper flex flex-col-reverse md:flex-row">
        <div className="flex justify-center items-center bg-color_primary_2_ligth w-screen">
          <h1 className="text-4xl lg:text-5xl p-6 text-white font-semibold">{title}</h1>
        </div>
        <div className="w-screen">
          {/* <div style={{
            backgroundImage: `url(${image_url})`
          }} className="w-full h-full object-cover gradient">
          </div> */}
          <img
            src={image_url}
            alt="img-capital-semilla"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="bg-white w-full"></div>
    </section>
  )
}

export default Banner
