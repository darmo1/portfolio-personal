import React from 'react'

function BtnEstado(props) {
  const btn = (name, color) => {
    return (
      <div className={`text-xs font-semibold px-4 rounded-full text-white py-2  bg-${color}`}>
        {name}
      </div>
    )
  }

  return (
    <React.Fragment>
      {props.estado.estado.toLowerCase() === 'completado' &&
        btn('Completado', 'color_primary_1')}
      {props.estado.estado.toLowerCase() === 'incompleto' &&
        btn('incompleto', 'color_primary_1')}
      {props.estado.estado.toLowerCase() === 'falta_documentos' &&
        btn('Faltan documentos', 'color_primary_1')}
      {props.estado.estado.toLowerCase() === 'por_validar' &&
        btn('Por validar', 'color_primary_1')}
      {props.estado.estado.toLowerCase() === 'preparado_envio' &&
        btn('Listo para enviar al operador', 'color_primary_1')}
      {props.estado.estado.toLowerCase() === 'rechazado' && btn('Rechazado', 'color_primary_1')}
      {props.estado.estado.toLowerCase() === 'aprobado' && btn('aprobado', 'color_primary_1')}
      {props.estado.estado.toLowerCase() === 'colocado' && btn('colocado', 'color_primary_1')}
    </React.Fragment>
  )
}

export default BtnEstado
