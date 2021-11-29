import React from 'react'
import CreditCard from './CreditCard'

const Slide = props => {
  return (
    <div className="main-wrapper h-md_2 sm:h-lg flex justify-around">
      {props.slides.length ? (
        props.slides.map((item, idx) => {
          return <CreditCard key={idx} data={item} />
        })
      ) : (
        <CreditCard data={props.slides} />
      )}
    </div>
  )
}

export default Slide
