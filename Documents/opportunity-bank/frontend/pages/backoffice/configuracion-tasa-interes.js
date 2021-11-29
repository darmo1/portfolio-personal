import * as React from 'react'
import { useAuthContext } from '../../auth-context'
import AddCredit from '../../components/SuperAdmin/AddCredit'
import Modal from '../../components/SuperAdmin/Modal'
import { useFetch } from '../../utils/useFetch'

const classModal = `fixed inset-5 backdrop-blur-sm  flex items-center justify-center`
const SUCCESS_CLASS =
  'mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
const ERROR_CLASS =
  'mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'

function ConfigurarInteres(props) {
  const initialValues = {
    linea_credito: '',
    num_cuotas: '',
    num_salarios_minimo: '',
    num_salarios: '',
    monto_minimo: '',
    monto_total: '',
  }
  const { openModal, setOpenModal } = useAuthContext()
  const [showCreditLineBox, setShowCreditLineBox] = React.useState(false)
  const [valuesAddLineaCredito, setValuesAddLineaCredito] = React.useState(initialValues)
  const [message, setMessage] = React.useState('')
  const [valueMontoMinimo, setValueMontoMinimo] = React.useState('')
  const [valueMontoMaximo, setValueMontoMaximo] = React.useState('')

  const handleCancelProcess = () => {
    setValueMontoMinimo('')
    setValueMontoMaximo('')
    setOpenModal(false)
  }

  const handleAddLineaCredito = () => {
    setShowCreditLineBox(true)
  }

  const handleCreateLineaCredito = async () => {
    setOpenModal(false)
    setMessage('Procesando...')
    const URL_CREATE_CREDITO = `${process.env.NEXT_PUBLIC_CONFIG_SERVICES_V1}/config/credito/portafolio`

    const dataToSend = {
      nombre: valuesAddLineaCredito.linea_credito,
      num_cuotas: Number(valuesAddLineaCredito.num_cuotas),
    }

    if (valuesAddLineaCredito.num_salarios_minimo === Number(valueMontoMinimo)) {
      ;(dataToSend.num_salarios_minimo = Number(valuesAddLineaCredito.num_salarios_minimo)),
        (dataToSend.monto_minimo = null)
    } else {
      ;(dataToSend.num_salarios_minimo = null),
        (dataToSend.monto_minimo = Number(valuesAddLineaCredito.monto_minimo))
    }

    if (valuesAddLineaCredito.num_salarios === Number(valueMontoMaximo)) {
      ;(dataToSend.num_salarios = Number(valuesAddLineaCredito.num_salarios)),
        (dataToSend.monto_total = null)
    } else {
      ;(dataToSend.num_salarios = null),
        (dataToSend.monto_total = Number(valuesAddLineaCredito.monto_total))
    }

    try {
      const { res, responseComplete } = await useFetch(URL_CREATE_CREDITO, dataToSend)

      if (responseComplete) {
        setOpenModal(false)
        setShowCreditLineBox(false)
        setValuesAddLineaCredito(initialValues)
        setMessage(res.message)
        setTimeout(() => {
          setMessage('')
        }, 5000)
      } else {
        setOpenModal(false)
        setMessage(`Hubo un error, ${res.message}`)
        setTimeout(() => {
          setMessage('')
        }, 5000)
      }
    } catch (err) {
      setOpenModal(false)
      setMessage(`Hubo un error, ${err.message}`)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  return (
    <div className="my-8 w-full">
      <section className="relative">
        <div className="flex justify-center w-11/12 mx-auto mb-4">
          <button type="submit" onClick={handleAddLineaCredito} className="mx-auto">
            <img src="/agregar-icono.svg" className="mx-auto" />
            Agregar Línea de crédito
          </button>
        </div>

        {showCreditLineBox ? (
          <AddCredit
            valuesAddLineaCredito={valuesAddLineaCredito}
            setValuesAddLineaCredito={setValuesAddLineaCredito}
            showCreditLineBox={showCreditLineBox}
            setShowCreditLineBox={setShowCreditLineBox}
            salarioMinimo={props.salarioMinimo}
            valueMontoMinimo={valueMontoMinimo}
            setValueMontoMinimo={setValueMontoMinimo}
            valueMontoMaximo={valueMontoMaximo}
            setValueMontoMaximo={setValueMontoMaximo}
          />
        ) : null}

        {message !== '' ? (
          <div className={message.includes('error') ? ERROR_CLASS : SUCCESS_CLASS}>
            {message}
          </div>
        ) : null}

        {openModal ? (
          <Modal nodo="create-credit" className="flex items-center">
            <div className="border rounded-lg p-4 flex flex-col bg-white ">
              <h1>Estás seguro de crear una línea de crédito</h1>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mr-4 mt-6 p-2 w-2/5 font-bold text-white rounded-full bg-color_primary_2_ligth"
                  onClick={handleCreateLineaCredito}
                >
                  Si
                </button>

                <button
                  type="submit"
                  className="mt-6 p-2 w-2/5 font-bold text-white rounded-full bg-red-500"
                  onClick={handleCancelProcess}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}

        <div id="create-credit" className={openModal && classModal}>
          {' '}
        </div>
      </section>

      <section></section>
    </div>
  )
}

export default ConfigurarInteres
