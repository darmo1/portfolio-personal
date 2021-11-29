import React from 'react'
import Link from 'next/link'

const CreditCard = props => {
  return (
    <div className="w-80 bg-white rounded-lg m-4 p-4 h-md_1 sm:h-md_2 lg:h-md_1">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="">
            <img src={props.data.src} alt="" />
          </div>
          <div>
            <p className="text-color_primary_1 text-xl font-bold text-center my-4">
              {props.data.title}
            </p>
            <p className={`${props.data.class && props.data.class} font-semibold text-left`}>
              {props.data.text}
            </p>
          </div>
        </div>
        <div className="text-center mb-4">
          <Link href={props.data.url}>
            <a className="bg-color_primary_2_ligth rounded-full px-4 py-4 w-1/2 text-center text-white font-semibold">
              Solicitar crédito
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CreditCard
