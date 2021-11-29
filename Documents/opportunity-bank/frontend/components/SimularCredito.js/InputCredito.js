import * as React from 'react'
import { separadorMillares } from '../../utils/separadorMillares'

const InputCredito = ({
  lineaCreditoInfo,
  valoresSimulacion,
  setValoresSimulacion,
  selected,
  refMonto,
}) => {
  const handleChange = ({ target }) => {
    setValoresSimulacion({
      ...valoresSimulacion,
      linea_credito: lineaCreditoInfo.nombre,
      [target.name]: target.value,
    })
  }

  function numeroCuotas(max_cuota) {
    const arr = []
    for (let i = 1; i <= max_cuota; i++) {
      arr.push(i)
    }
    return arr
  }

  return (
    <React.Fragment>
      <div className="border bg-white rounded-lg p-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-center pb-4 md:pb-0 font-semibold text-color_primary_2_ligth text-xl">
            ¿En cuántas cuotas desearía pagar?
          </p>
          <select
            onChange={handleChange}
            key={'cuotas'}
            label=""
            name="cuotas"
            className="h-10 border  pl-4 border-color_gray_4 rounded-lg"
            value={valoresSimulacion.cuotas}
          >
            <option value="" className="font-light">
              {' '}
              {`---Seleccione cuota ---`}{' '}
            </option>
            {numeroCuotas(lineaCreditoInfo.num_cuotas).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <p className="text-center font-semibold text-color_primary_2_ligth text-xl mb-4 md:mb-0">
            ¿Cuánto dinero desea prestar?
          </p>
          <input
            onChange={handleChange}
            ref={refMonto}
            key={'monto'}
            label={''}
            name={'monto'}
            type={'number'}
            className={'text-center font-semibold h-10 border border-color_gray_5 rounded-lg'}
            min={0}
            max={Number(lineaCreditoInfo.monto_total)}
            placeholder="2'000.000"
            value={valoresSimulacion.monto}
          />
        </div>
      </div>
    </React.Fragment>
  )
}
export default InputCredito
