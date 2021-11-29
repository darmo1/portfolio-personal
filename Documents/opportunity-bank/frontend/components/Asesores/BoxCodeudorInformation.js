import React from 'react'

const BoxCodeudorInformation = props => {
  return (
    <div className="m-4 bg-white border border-gray-200  rounded-lg p-4   max-w-1/2 w-content">
      <h2 className="font-semibold text-lg"> {props.title} </h2>
      <div>
        <label className="flex mt-4">{`Nombres:  `}</label>
        <small>
          {`${props.codeduor?.persona?.primer_nombre} ${
            props.codeduor?.persona?.segundo_nombre || ''
          } ${props.codeduor?.persona?.primer_apellido} ${
            props.codeduor?.persona?.segundo_apellido || ''
          }`}
        </small>
      </div>
      <div>
        <label className="block mt-4">Número de identificacion: </label>
        <small>{props.codeduor?.persona.num_identificacion} </small>
      </div>
    </div>
  )
}

export default BoxCodeudorInformation
