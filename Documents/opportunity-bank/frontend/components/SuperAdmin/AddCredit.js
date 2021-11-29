import React from 'react'
import { useAuthContext } from '../../auth-context'
import validForm from '../../utils/validateFields'
const AddCredit = props => {
  const { setOpenModal } = useAuthContext()
  const [messageError, setMessageError] = React.useState('')
  const [err, setErr] = React.useState({})

  const [editMontoMinSalarios, setEditMontoMinSalarios] = React.useState(false)
  const [editMontoMin, setEditMontoMin] = React.useState(true)

  const [editMontoMax, setEditMontoMax] = React.useState(true)
  const [editMontoMaxSalarios, setEditMontoMaxSalarios] = React.useState(false)

  const handleChange = ({ target }) => {
    if (target.name === 'num_salarios_minimo') {
      props.setValueMontoMinimo(target.value)
    }

    if (target.name === 'num_salarios') {
      props.setValueMontoMaximo(target.value)
    }

    props.setValuesAddLineaCredito({
      ...props.valuesAddLineaCredito,
      [target.name]: target.value,
    })
  }

  const refNodes = {
    linea_credito: React.useRef(null),
    num_cuotas: React.useRef(null),
    num_salarios_minimo: React.useRef(null),
    num_salarios: React.useRef(null),
    monto_minimo: React.useRef(
      refNodes?.num_salarios_minimo?.current?.value * props.salarioMinimo || 0,
    ),
    monto_total: React.useRef(
      refNodes?.num_salarios?.current?.value * props.salarioMinimo || 0,
    ),
  }

  //Efecto para guardar el monto minimo si agregas el # de salarios minimos

  React.useEffect(() => {
    props.setValuesAddLineaCredito({
      ...props.valuesAddLineaCredito,
      monto_minimo: refNodes?.num_salarios_minimo?.current?.value * props.salarioMinimo || 0,
    })
  }, [refNodes?.num_salarios_minimo?.current?.value])

  React.useEffect(() => {
    props.setValuesAddLineaCredito({
      ...props.valuesAddLineaCredito,
      monto_total: refNodes?.num_salarios?.current?.value * props.salarioMinimo || 0,
    })
  }, [refNodes?.num_salarios?.current?.value])

  const handleEditarMontoMin = () => {
    setEditMontoMinSalarios(true)
    setEditMontoMin(false)
  }

  const handleGuardarMontoMin = () => {
    setEditMontoMin(true)
    const nuevoValor = (props.valuesAddLineaCredito.monto_minimo / props.salarioMinimo).toFixed(
      1,
    )
    props.setValuesAddLineaCredito({
      ...props.valuesAddLineaCredito,
      num_salarios_minimo: nuevoValor,
    })
    refNodes.num_salarios_minimo.current.value = nuevoValor
    setEditMontoMinSalarios(false)
  }
  const handleEditarMontoMax = () => {
    setEditMontoMaxSalarios(true)
    setEditMontoMax(false)
  }

  const handleGuardarMontoMax = () => {
    setEditMontoMax(true)
    const nuevoValor = (props.valuesAddLineaCredito.monto_total / props.salarioMinimo).toFixed(
      1,
    )
    props.setValuesAddLineaCredito({
      ...props.valuesAddLineaCredito,
      num_salarios: nuevoValor,
    })
    refNodes.num_salarios.current.value = nuevoValor
    setEditMontoMaxSalarios(false)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const resultValidate = validForm(props.valuesAddLineaCredito)
    setErr(resultValidate)
    const isMissingFields = Object.keys(resultValidate).length
    const missingFields = Object.keys(resultValidate)

    if (!isMissingFields) {
      setOpenModal(true)
    } else {
      for (let key of missingFields) {
        refNodes[key].current.focus({ preventScroll: false })
      }
    }
  }

  const handleCloseBox = event => {
    event.preventDefault()
    props.setValuesAddLineaCredito({
      linea_credito: '',
      num_cuotas: '',
      num_salarios: '',
      monto_total: '',
      num_salarios_minimo: '',
      monto_minimo: '',
    })
    props.setValueMontoMinimo('')
    props.setValueMontoMaximo('')
    props.setShowCreditLineBox(false)
  }

  return (
    <div className="bg-white rounded-lg p-4">
      <form onSubmit={handleSubmit} className="mx-auto">
        <div className="flex flex-col mb-4 border-b border-color_gray_8 pb-4">
          <label className="font-bold">Nombre de línea de crédito:</label>
          <input
            type="text"
            name="linea_credito"
            value={props.valuesAddLineaCredito.linea_credito}
            onChange={handleChange}
            ref={refNodes.linea_credito}
            className="h-10 border border-gray-400 px-4 rounded-lg"
          />

          {err.linea_credito ? (
            <small className="block text-red-400 text-sm">{err.linea_credito}</small>
          ) : null}
        </div>

        <div className="flex flex-col mb-4  border-b border-color_gray_8 pb-4">
          <label className="font-bold">Número de cuotas permitidas:</label>
          <input
            type="number"
            min={1}
            name="num_cuotas"
            value={props.valuesAddLineaCredito.num_cuotas}
            onChange={handleChange}
            ref={refNodes.num_cuotas}
            className="h-10 border border-gray-400 px-4 rounded-lg"
          />

          {err.num_cuotas ? (
            <small className="block text-red-400 text-sm">{err.num_cuotas}</small>
          ) : null}
        </div>

        <div className="flex flex-col mb-4 border-b border-color_gray_8 pb-4">
          <label className="font-bold">Numero de salarios - monto mínimo:</label>
          <input
            type="number"
            name="num_salarios_minimo"
            disabled={editMontoMinSalarios}
            value={!editMontoMinSalarios ? props.valuesAddLineaCredito.num_salarios_minimo : ''}
            onChange={handleChange}
            ref={refNodes.num_salarios_minimo}
            className="h-10 border border-gray-400 px-4 rounded-lg"
          />

          {err.num_salarios_minimo ? (
            <small className="block text-red-400 text-sm">{err.num_salarios_minimo}</small>
          ) : null}
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 border-b border-color_gray_8 pb-4">
          <label className="font-bold md:w-1/3">Monto mínimo:</label>
          <input
            type="number"
            name="monto_minimo"
            ref={refNodes.monto_minimo}
            disabled={editMontoMin}
            value={
              editMontoMin && !refNodes?.num_salarios_minimo?.current?.value
                ? refNodes?.num_salarios_minimo?.current?.value * props.salarioMinimo || 0
                : props.valuesAddLineaCredito.monto_minimo
            }
            onChange={handleChange}
            className="h-10 border border-gray-400 px-4 rounded-lg"
          />

          {editMontoMin ? (
            <div className="hover:bg-color_primary_2_ligth rounded-lg  h-12 flex items-center  mx-auto hover:text-white">
              <span className="text-sm">
                <img src="/edit_icon.svg" alt="editable-icon" className="h-6 ml-2" />
              </span>
              <button
                className="pr-4 text-sm font-bold"
                type="button"
                onClick={handleEditarMontoMin}
              >
                Editar
              </button>
            </div>
          ) : (
            <div className="hover:bg-color_primary_1_ligth rounded-lg  h-12 flex items-center  mx-auto hover:text-white mt-4">
              <span className="text-sm">
                <img src="/edit_icon.svg" alt="editable-icon" className="h-6 ml-2" />
              </span>
              <button
                className="pr-4 text-sm font-bold"
                type="button"
                onClick={handleGuardarMontoMin}
              >
                {'Guardar'}
              </button>
            </div>
          )}
          {err.monto_minimo ? (
            <small className="block text-red-400 text-sm">{err.monto_minimo}</small>
          ) : null}
        </div>

        <div className="flex flex-col mb-4 border-b border-color_gray_8 pb-4">
          <label className="font-bold">Número de salarios - monto máximo:</label>
          <input
            type="number"
            name="num_salarios"
            disabled={editMontoMaxSalarios}
            value={!editMontoMaxSalarios ? props.valuesAddLineaCredito.num_salarios : ''}
            onChange={handleChange}
            ref={refNodes.num_salarios}
            className="h-10 border border-gray-400 px-4 rounded-lg"
          />

          {err.num_salarios ? (
            <small className="block text-red-400 text-sm">{err.num_salarios}</small>
          ) : null}
        </div>

        <div>
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <label className="font-bold md:w-1/3">Monto Máximo:</label>
            <input
              type="number"
              name="monto_total"
              ref={refNodes.monto_total}
              disabled={editMontoMax}
              value={
                editMontoMax && !refNodes?.num_salarios?.current?.value
                  ? refNodes?.num_salarios?.current?.value * props.salarioMinimo || 0
                  : props.valuesAddLineaCredito.monto_total
              }
              className="h-10 border border-gray-400 px-4 rounded-lg"
              onChange={handleChange}
            />

            {editMontoMax ? (
              <div className="hover:bg-color_primary_2_ligth rounded-lg  h-12 flex items-center  mx-auto hover:text-white">
                <span className="text-sm">
                  <img src="/edit_icon.svg" alt="editable-icon" className="h-6 ml-2" />
                </span>
                <button
                  className=" text-sm font-bold pr-4"
                  type="button"
                  onClick={handleEditarMontoMax}
                >
                  Editar
                </button>
              </div>
            ) : (
              <div className="hover:bg-color_primary_1_ligth rounded-lg  h-12 flex items-center  mx-auto hover:text-white mt-4">
                <span className="text-sm">
                  <img src="/edit_icon.svg" alt="editable-icon" className="h-6 ml-2" />
                </span>
                <button
                  className="pr-4 text-sm font-bold"
                  type="button"
                  onClick={handleGuardarMontoMax}
                >
                  {'Guardar'}
                </button>
              </div>
            )}
            {err.monto_total ? (
              <small className="block text-red-400 text-sm">{err.monto_total}</small>
            ) : null}
          </div>
        </div>

        <div className="flex justify-around md:w-3/5 mx-auto">
          <button
            type="submit"
            className="mt-6 p-4 w-2/6 sm:w-2/5 font-bold text-white rounded-full bg-color_primary_2_ligth"
          >
            Enviar
          </button>
          <button
            onClick={handleCloseBox}
            type="submit"
            className="mt-6 p-4 w-2/6 sm:w-2/5 font-bold text-white rounded-full bg-color_primary_1_ligth"
          >
            Cerrar
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCredit
