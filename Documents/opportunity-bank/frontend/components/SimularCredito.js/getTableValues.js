import { pmt } from '../../utils/PMT'

function getTableValues(valoresSimulacion, arrayWithValues, corriente) {
  const OBJETO_INICIAL = {
    periodo: 0,
    cuota: 0,
    interes: 0,
    capital: 0,
    saldo: valoresSimulacion.monto,
  }

  arrayWithValues.push(OBJETO_INICIAL)

  function recursion(arrayWithValues) {
    const length = arrayWithValues.length

    //base case
    if (arrayWithValues[length - 1].saldo <= 0) return

    const TASA_INTERES = corriente
    const lastElemet = arrayWithValues[length - 1]
    const cuota = Math.ceil(
      pmt(TASA_INTERES, Number(valoresSimulacion.cuotas), -Number(valoresSimulacion.monto)),
    )
    const interes = (TASA_INTERES * Number(lastElemet.saldo)).toFixed(2)
    const capital = (cuota - interes).toFixed(2)
    const saldo = (lastElemet.saldo - capital).toFixed(2)

    const obj = { cuota, interes, capital, saldo }
    arrayWithValues.push(obj)
    recursion(arrayWithValues)
  }

  recursion(arrayWithValues)

  return arrayWithValues
}

export default getTableValues
