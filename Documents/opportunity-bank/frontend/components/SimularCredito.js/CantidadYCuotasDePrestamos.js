import * as React from 'react'
import Title from '../Title'
import { separadorMillares } from '../../utils/separadorMillares'

const CantidadYCuotasDePrestamos = ({ lineaCreditoInfo }) => {
  return (
    <div className="mt-8">
      <Title> Las condiciones para esta línea son: </Title>
      <div className="mb-16">
        <div className="flex justify-evenly mt-4  border-b-2">
          <span className="ml-12 font-semibold">Un plazo de:</span>
          <span className=" font-semibold">
            Entre 1 hasta {lineaCreditoInfo.num_cuotas} meses
          </span>
        </div>
        <div className="flex justify-evenly mt-4 border-b-2">
          <span className="text-lg font-semibold">Un monto máximo de:</span>
          <span className="text-lg font-semibold">{`$ ${separadorMillares(
            lineaCreditoInfo.monto_total,
          )}`}</span>
        </div>
      </div>
    </div>
  )
}

export default CantidadYCuotasDePrestamos
