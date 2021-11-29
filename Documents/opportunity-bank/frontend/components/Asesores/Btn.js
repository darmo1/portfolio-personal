import React from 'react'
import Link from 'next/link'

const Btn = props => {
  return (
    <Link href={props.href}>
      <a>
        <div
          className={`mx-auto flex my-4 px-4 py-4 rounded-full hover:bg-color_primary_2_ligth text-black hover:text-white text-sm pr-4 bg-gray-300`}
        >
          <img className="mr-2 w-8 h-6" src={props.icon_url} />
          {/* <image src={props.icon} alt="icon" /> */}
          {props.name}
        </div>
      </a>
    </Link>
  )
}

export default Btn
