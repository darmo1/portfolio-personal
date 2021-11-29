import React from 'react'

export const CheckedSolicitud = ({
  solicitudId,
  solicitudPorAsesor,
  setsolicitudPorAsesor,
}) => {
  const handleCheckBox = e => {
    setsolicitudPorAsesor(prev => {
      return {
        ...prev,
        [e.target.name]: {
          ...prev[e.target.name],
          isChecked: !solicitudPorAsesor?.[e.target.name]?.isChecked,
        },
      }
    })
  }

  return (
    <div>
      <input
        type="checkbox"
        name={solicitudId}
        value={solicitudPorAsesor?.[solicitudId]?.isChecked}
        onClick={handleCheckBox}
      />
    </div>
  )
}
