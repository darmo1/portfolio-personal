import { ErrorMessage, Field, Form, Formik, useFormikContext, withFormik } from 'formik'
import * as React from 'react'
import Title from '../Title'
import * as Yup from 'yup'
import Modal from './Modal'

const classInput = 'h-10 border ronded-lg border-gray-400 px-4 w-full'
const SUCCESS_CLASS =
  'mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-4'
const ERROR_CLASS =
  'mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4'
const classModal = `fixed inset-5 backdrop-blur-sm  flex items-center justify-center`

const EditCredit = props => {
  const [showModal, setShowModal] = React.useState(false)
  const [showModalDelete, setShowModalDelete] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [messageError, setMessageError] = React.useState('')

  const [editCredit, setEditCredit] = React.useState(undefined)
  const [valuesToDelete, setValuesToDelete] = React.useState(undefined)

  React.useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [props.lineaCreditoSelected])

  const handleEditLineaCredito = async event => {
    event.preventDefault()
    const { portafolio_id, num_salarios, ...dataToSend } = editCredit
    setShowModal(false)
    setMessageError('Procesando...')
    const URL = `${process.env.NEXT_PUBLIC_CONFIG_SERVICES_V1}/config/credito/portafolio/${portafolio_id}`
    try {
      const responseFetch = await fetch(URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...dataToSend, num_salarios: null }),
      })

      const response = await responseFetch.json()

      if (responseFetch.statusCode === 404) {
        setMessageError('Hubo un error. Intente de nuevo')
        setTimeout(() => {
          setMessageError('')
        }, 5000)
      }

      if (responseFetch.status === 200) {
        setMessageError(response.message)
        setTimeout(() => {
          setMessageError('')
          props.setLineaCreditoSelected('')
        }, 5000)
      }
    } catch (err) {
      console.log(err, err.message)
      setShowModal(false)
      setMessageError('Hubo un error. Intentelo más tarde')
      setTimeout(() => {
        setMessageError('')
      }, 5000)
    }
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const closeBox = event => {
    event.preventDefault()
    props.setLineaCreditoSelected('')
  }

  const eliminarRegistro = valores => {
    setShowModalDelete(true)
    setValuesToDelete(valores)
  }

  const handleDeleteCredito = async () => {
    const { portafolio_id, ...dataToSend } = valuesToDelete
    setShowModalDelete(false)
    try {
      const URL = `${process.env.NEXT_PUBLIC_CONFIG_SERVICES_V1}/config/credito/portafolio/${portafolio_id}`
      const responseFetch = await fetch(URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      })

      const response = await responseFetch.json()

      if (responseFetch.statusCode === 404) {
        setMessageError('Hubo un error. Intente de nuevo')
        setTimeout(() => {
          setMessageError('')
        }, 5000)
      }

      if (responseFetch.status === 200) {
        setMessageError(response.message)
        setTimeout(() => {
          setMessageError('')
          props.setLineaCreditoSelected('')
        }, 5000)
      }
    } catch (error) {
      console.log(err, err.message)
      setShowModalDelete(false)
      setMessageError('Hubo un error. Intentelo más tarde')
      setTimeout(() => {
        setMessageError('')
      }, 5000)
    }
  }

  const handleCancelProcessDelete = () => {
    setShowModalDelete(false)
  }

  return loading ? (
    <div> Loading ... </div>
  ) : (
    <div className="rounded-lg p-4 bg-white">
      <h2 className="text-lg text-color_primary_2_ligth font-semibold text-center">
        {props.lineaDeCredito.nombre}
      </h2>
      <Formik
        initialValues={props.lineaDeCredito}
        validationSchema={Yup.object().shape({
          nombre: Yup.string().required('Requerido').typeError('Debe ser texto'),
          num_cuotas: Yup.number()
            .required('Requerido')
            .typeError('Debe ser un número')
            .min(1, 'No puede ser cero ni un numero menor a uno'),
          num_salarios: Yup.number()
            .notRequired('Requerido')
            .typeError('Debe ser un número')
            .min(0, 'No puede ser cero ni un numero menor a cero')
            .nullable(true),
          monto_total: Yup.number()
            .required('Requerido')
            .typeError('Debe ser un número')
            .min(0, 'No puede ser cero ni un numero menor a cero'),
          num_salarios_minimo: Yup.number()
            .notRequired()
            .typeError('Debe ser un numero')
            .min(0, 'No puede ser cero ni un numero menor a cero')
            .nullable(true),
          monto_minimo: Yup.number()
            .notRequired()
            .typeError('Debe ser un numero')
            .min(0, 'No puede ser cero ni un numero menor a cero'),
        })}
        onSubmit={value => {
          setEditCredit(value)
          setShowModal(true)
        }}
      >
        {({ values }) => {
          return (
            <Form>
              <div className="flex flex-col sm:flex-row justify-between my-4 border-b sm:items-center border-color_gray_8 pb-4">
                <label className="font-bold">Nombre línea de crédito:</label>
                <div className="flex flex-col ">
                  <Field
                    className={`${classInput} border-radius`}
                    type="text"
                    name="nombre"
                    value={values.nombre}
                  />
                  <ErrorMessage name="nombre" />
                </div>
              </div>

              <div className="flex justify-between border-b items-center border-color_gray_8 pb-4">
                <label className="font-bold">Plazo máximo en meses:</label>
                <div className="flex flex-col">
                  <Field
                    className={classInput}
                    type="number"
                    name="num_cuotas"
                    placeholder="36"
                  />
                  <ErrorMessage name="num_cuotas" />
                </div>
              </div>

              {/* <div className="flex justify-between my-4">
                <label className="font-section text-lg">Monto mínimo en (SMLV):</label>
                <div className="flex flex-col">
                  <Field
                    className={classInput}
                    type="number"
                    name="num_salarios_minimo"
                    placeholder="1"
                  />
                  <ErrorMessage name="num_salarios_minimo" />
                </div>
              </div> */}

              <div className="flex flex-col md:flex-row justify-between border-b border-color_gray_8">
                <div className="flex justify-between md:my-4 items-center md:w-45 border-b border-color_gray_8 md:border-b-0 py-4 md:py-0">
                  <label className="font-bold w-3/4">Monto mínimo:</label>
                  <div className="flex flex-col">
                    <Field
                      className={classInput}
                      type="number"
                      name="monto_minimo"
                      placeholder="1'000.000"
                    />
                    <ErrorMessage name="monto_minimo" />
                  </div>
                </div>

                {/* <div className="flex justify-between my-4">
                <label className="font-section text-lg">Número de salarios equivalentes al monto máximo:</label>
                <div className="flex flex-col">
                  <Field
                    className={classInput}
                    type="number"
                    name="num_salarios"
                    placeholder="100"
                  />
                  <ErrorMessage name="num_salarios" />
                </div>
              </div> */}

                <div className="flex justify-between md:my-4 items-center md:w-45 border-b border-color_gray_8 md:border-b-0 py-4 md:pt-0 md:pb-0">
                  <label className="font-bold w-3/4">Monto máximo:</label>
                  <div className="flex flex-col">
                    <Field
                      className={classInput}
                      type="number"
                      name="monto_total"
                      placeholder="100'.000.000"
                    />
                    <ErrorMessage name="monto_total" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-around">
                <button
                  type="submit"
                  className="mt-6 p-4 sm:w-1/4 font-bold text-white rounded-full bg-color_primary_2_ligth"
                >
                  Guardar
                </button>
                <button
                  type="submit"
                  className="mt-6 p-4 sm:w-1/4 font-bold text-white rounded-full bg-color_primary_1_ligth"
                  onClick={closeBox}
                >
                  Cerrar
                </button>

                <button
                  type="button"
                  className="mt-6 p-4 sm:w-1/4  font-bold text-white rounded-full bg-red-500"
                  onClick={() => eliminarRegistro(values)}
                >
                  Eliminar
                </button>
              </div>

              {messageError !== '' ? (
                <div className={messageError.includes('error') ? ERROR_CLASS : SUCCESS_CLASS}>
                  {messageError}
                </div>
              ) : null}
            </Form>
          )
        }}
      </Formik>

      {showModal ? (
        <Modal nodo="edit-credit" className="flex items-center">
          <div className="border rounded-lg p-4 flex flex-col bg-white ">
            <h1>Esta seguro(a) que desea editar este crédito</h1>
            <div className="flex justify-center">
              <button
                type="submit"
                className="mr-4 mt-6 p-2 w-2/5 font-bold text-white rounded-full bg-color_primary_2_ligth"
                onClick={handleEditLineaCredito}
              >
                Si
              </button>

              <button
                type="submit"
                className="mt-6 p-2 w-2/5 font-bold text-white rounded-full bg-red-500"
                onClick={handleCancel}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
      <div id="edit-credit" className={showModal && classModal}></div>
      <div id="delete-credit" className={showModalDelete && classModal}></div>

      {showModalDelete ? (
        <Modal nodo="delete-credit" className="flex items-center">
          <div className="border rounded-lg p-4 flex flex-col bg-white ">
            <h1>¿Esta seguro de eliminar esta línea de crédito?</h1>
            <div className="flex justify-center">
              <button
                type="submit"
                className="mr-4 mt-6 p-2 w-2/5 font-bold text-white rounded-full bg-color_primary_2_ligth"
                onClick={handleDeleteCredito}
              >
                Si
              </button>

              <button
                type="submit"
                className="mt-6 p-2 w-2/5 font-bold text-white rounded-full bg-red-500"
                onClick={handleCancelProcessDelete}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}

export default EditCredit
