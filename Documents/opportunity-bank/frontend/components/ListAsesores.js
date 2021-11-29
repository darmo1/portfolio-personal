import React from 'react'

export const ListAsesores = props => {
  const ListaDeAsesores = props.usuarios?.filter(usuario => usuario.rolID === 4)
  const handleChangeAsesor = e => {
    props.setsolicitudPorAsesor(prev => {
      return {
        ...prev,
        [e.target.name]: { ...prev[e.target.name], asesor: Number(e.target.value) },
      }
    })
  }

  return (
    <select
      name={props.solicitudId}
      value={props.solicitudPorAsesor?.[props.solicitudId]?.asesor}
      onChange={handleChangeAsesor}
    >
      <option value=""> sin asignar </option>
      {ListaDeAsesores?.map((asesor, index) => (
        <option value={asesor.cedula} key={index}>
          {' '}
          {`${asesor.nombres}  ${asesor.apellidos}`}{' '}
        </option>
      ))}
    </select>
  )
}
