import React from 'react'
import Link from 'next/link'

const BoxPeerToPeer = props => {
  return props.usuario?.persona?.num_identificacion ? (
    <div className="my-4 bg-white border border-gray-200 rounded-lg p-4">
      <h2 className="font-bold text-lg"> {props.title} </h2>
      <div className="mt-4 font-section">
        <label className="font-semibold">{props.nombre} :</label>{' '}
        {`${props.usuario?.persona?.primer_nombre || ''} ${
          props.usuario?.persona?.primer_apellido || 'No tiene codeudor actualmente'
        } `}
      </div>

      <div className="mt-4 font-section">
        <label className="font-semibold">Número de identificación: </label>
        {` ${props.usuario?.persona?.num_identificacion || 'no aplica'}`}
      </div>

      <div className="text-center sm:text-left my-4">
        <div className="font-section">
          <Link
            href={`/backoffice/${props.usuario?.persona?.num_identificacion}?sid=${props.id}`}
          >
            <a className="hover:text-color_primary_2_ligth hover:font-bold">
              <small>
                <img src="/edit_icon.svg" alt="edit_icon" className="h-6 w-6 m-auto sm:m-0" />
              </small>
              Ir al dashboard del {props.nombre}
            </a>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="m-4 bg-white border border-gray-200  rounded-lg p-4   max-w-1/2 w-content">
      {' '}
      No tiene codeudor actualmente{' '}
    </div>
  )
}

export default BoxPeerToPeer
