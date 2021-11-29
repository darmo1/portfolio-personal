import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'
import Modal from './Modal'

const SUCCESS_CLASS =
  'mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
const ERROR_CLASS =
  'mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'

const BoxIntereses = props => {
  const initialValues = {
    interes_mora: '',
    interes_corriente: '',
    salario_minimo: '',
    anno_vigencia: '',
  }

  const classInput = 'h-10 border ronded-lg border-gray-400 px-4 w-1/2'

  const [initialValuesForm, setInitialValuesForm] = React.useState(initialValues)
  const [copyInitialValuesForm, setCopyInitialValuesForm] = React.useState(initialValuesForm)
  const [dataForm, setDataForm] = React.useState(null)
  const [valBox, setValBox] = React.useState(null)

  const [isEditableOff, setIsEditableOff] = React.useState(true)
  const [renderModal, setRenderModal] = React.useState(false)
  const [loadingBoxInteres, setLoadingBoxInteres] = React.useState(false)
  const [messageError, setMessageError] = React.useState('')
  const [showButton, setShowButton] = React.useState(false)

  async function fetcher(url) {
    let response = await fetch(url)
    return await response.json()
  }

  React.useEffect(async () => {
    setLoadingBoxInteres(true)
    try {
      const url_tasa_interes = `${process.env.NEXT_PUBLIC_CONFIG_SERVICES_V1}/config/credito/tasas`
      const url_salario_minimo = `${process.env.NEXT_PUBLIC_CONFIG_SERVICES_V1}/config/salario-minimo`

      const [tasas, salario] = await Promise.all([
        fetcher(url_tasa_interes),
        fetcher(url_salario_minimo),
      ])
      const { corriente, mora } = tasas
      setValBox({
        corriente,
        mora,
        salario,
      })
      setInitialValuesForm({
        interes_mora: mora.valor_tasa,
        interes_corriente: corriente.valor_tasa,
        salario_minimo: salario.salario,
        anno_vigencia: salario.anno_vigencia,
      })
      props.setSalarioMinimo(salario.salario)
      setCopyInitialValuesForm({
        interes_mora: mora.valor_tasa,
        interes_corriente: corriente.valor_tasa,
        salario_minimo: salario.salario,
        anno_vigencia: salario.anno_vigencia,
      })
      setLoadingBoxInteres(false)
    } catch (error) {
      setLoadingBoxInteres(false)
      setMessageError(
        'Hubo un error, estos valores no se encuentran disponibles, intentalo más tarde',
      )
    }
  }, [])

  const handleEditableBox = () => {
    setShowButton(true)
    setIsEditableOff(false)
  }

  const handleModifyInteres = async () => {
    //TODO: Aqui debo hacer la peticion para enviar al backend modificado los valores

    const { corriente, mora, salario } = valBox
    try {
      if (initialValuesForm.interes_corriente !== dataForm.interes_corriente) {
        const url_modicar_interes_corriente = `${process.env.NEXT_PUBLIC_CONFIG_SERVICES_V1}/config/credito/tasa/${corriente.tasa_id}`
        const { interes_corriente } = dataForm
        const resUpdate = await fetcher(url_modicar_interes_corriente, {
          nombre_tasa: 'Interes Corriente',
          valor_tasa: Number(interes_corriente),
        })

        const { dataResponse, res } = resUpdate

        if (res.status === 400) {
          setMessageError('Hubo un error al actualizar interés corriente, intenta más tarde')
          setTimeout(() => {
            setMessageError('')
          }, 3000)
          setRenderModal(false)
        }

        if (res.status === 200) {
          setMessageError(' Proceso exitoso, se ha actualizado')
          setTimeout(() => {
            setMessageError('')
          }, 3000)
          setRenderModal(false)
        }
      }

      if (initialValuesForm.interes_mora !== dataForm.interes_mora) {
        const url_modicar_interes_mora = `${process.env.NEXT_PUBLIC_CONFIG_SERVICES_V1}/config/credito/tasa/${mora.tasa_id}`
        const { interes_mora } = dataForm
        const resUpdate = await fetcher(url_modicar_interes_mora, {
          nombre_tasa: 'Interes Mora',
          valor_tasa: Number(interes_mora),
        })

        const { dataResponse, res } = resUpdate

        if (res.status === 400) {
          setMessageError('Hubo un error al actualizar interés corriente, intenta más tarde')
          setTimeout(() => {
            setMessageError('')
          }, 3000)
          setRenderModal(false)
        }

        if (res.status === 200) {
          setMessageError(' Proceso exitoso, se ha actualizado')
          setTimeout(() => {
            setMessageError('')
          }, 3000)
          setRenderModal(false)
        }
      }

      if (initialValuesForm.salario_minimo !== dataForm.salario_minimo) {
        const url_modificar_salario = `${process.env.NEXT_PUBLIC_CONFIG_SERVICES_V1}/config/salario-minimo/${salario.salario_id}`
        const { salario_minimo, anno_vigencia } = dataForm
        const resUpdate = await fetcher(url_modificar_salario, {
          anno_vigencia: Number(anno_vigencia),
          salario: Number(salario_minimo),
        })

        const { dataResponse, res } = resUpdate

        if (res.status === 400) {
          setMessageError('Hubo un error al actualizar interés corriente, intenta más tarde')
          setTimeout(() => {
            setMessageError('')
          }, 3000)
          setRenderModal(false)
        }

        if (res.status === 200) {
          setMessageError(' Proceso exitoso, se ha actualizado')
          setTimeout(() => {
            setMessageError('')
          }, 3000)
          setRenderModal(false)
        }
      }
      setRenderModal(false)
      setShowButton(false)
      setIsEditableOff(true)

      // setRenderModal(false)
      async function fetcher(url, dataSend) {
        let response = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataSend),
        })

        return { dataResponse: await response.json(), res: response }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    setRenderModal(false)
    setLoadingBoxInteres(true)
    setShowButton(false)
    setIsEditableOff(true)
    setInitialValuesForm({ ...copyInitialValuesForm })
    setTimeout(() => {
      setLoadingBoxInteres(false)
    }, 500)
  }

  return loadingBoxInteres ? (
    <div>Loading ....</div>
  ) : (
    <>
      {!showButton && (
        <button
          type="button"
          onClick={handleEditableBox}
          className="rounded-lg  h-12 flex justify-center hover:bg-color_primary_2_ligth mx-auto hover:text-white mt-4"
        >
          <span className="text-sm">
            <img src="/edit_icon.svg" alt="editable-icon" className="h-6 mx-auto" />
            <strong className="px-4">Editar</strong>
          </span>
        </button>
      )}
      <div className="flex flex-wrap">
        <Formik
          initialValues={initialValuesForm}
          validationSchema={Yup.object({
            interes_mora: Yup.number()
              .typeError('Deber ser un numero')
              .required('Requerido')
              .min(0),
            interes_corriente: Yup.number()
              .typeError('Deber ser un numero')
              .required('Requerido')
              .min(0),
            salario_minimo: Yup.number()
              .typeError('Deber ser un numero')
              .required('Requerido')
              .min(0),
            anno_vigencia: Yup.number()
              .typeError('Deber ser un numero')
              .required('Requerido')
              .min(0),
          })}
          onSubmit={value => {
            setDataForm(value)
            setRenderModal(true)
          }}
        >
          {({ values }) => {
            return (
              <div className="bg-white rounded-lg p-4 w-full">
                <Form>
                  <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row justify-between border-b border-color_gray_8">
                      <div className="flex justify-between md:my-4 items-center md:w-45 border-b border-color_gray_8 md:border-b-0 pb-4 md:pb-0">
                        <label className="font-bold">Interés mora:</label>
                        <Field
                          type="number"
                          name="interes_mora"
                          disabled={isEditableOff}
                          className={classInput}
                        />
                        <ErrorMessage name="interes_mora" />
                      </div>
                      <div className="flex justify-between my-4 items-center md:w-45">
                        <label className="font-bold">Interés corriente:</label>
                        <Field
                          type="number"
                          name="interes_corriente"
                          disabled={isEditableOff}
                          className={classInput}
                        />
                        <ErrorMessage name="interes_mora" />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex justify-between my-4 items-center md:w-45 border-b border-color_gray_8 md:border-b-0 pb-4 md:pb-0">
                        <label className="mr-4 font-bold">Salario:</label>
                        <Field
                          type="number"
                          name="salario_minimo"
                          disabled={isEditableOff}
                          className={classInput}
                        />
                        <ErrorMessage name="interes_mora" />
                      </div>
                      <div className="flex justify-between mb-4 md:mt-4 items-center md:w-45">
                        <label className="mr-4 font-bold">Año vigencia:</label>
                        <Field
                          name="anno_vigencia"
                          type="number"
                          disabled={isEditableOff}
                          className={classInput}
                        />
                        <ErrorMessage name="anno_vigencia" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    {showButton ? (
                      <button
                        type="submit"
                        className="mt-6 p-4 w-full sm:w-1/4 font-bold text-white rounded-full bg-color_primary_2_ligth mx-auto"
                      >
                        Guardar
                      </button>
                    ) : null}
                  </div>
                </Form>
              </div>
            )
          }}
        </Formik>
        {messageError !== '' ? (
          <div className={messageError.includes('error') ? ERROR_CLASS : SUCCESS_CLASS}>
            {' '}
            {messageError}{' '}
          </div>
        ) : null}
        <div
          id="editar-interes"
          className={
            renderModal &&
            `fixed inset-5 backdrop-blur-sm  flex items-center justify-center z-50`
          }
        ></div>

        {renderModal ? (
          <Modal nodo="editar-interes">
            <div className="border rounded-lg p-4 flex flex-col bg-white ">
              <h1>Estás seguro deseas cambiar esta configuración </h1>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mr-4 mt-6 p-2 w-2/5 font-bold text-white rounded-full bg-color_primary_2_ligth"
                  onClick={handleModifyInteres}
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
      </div>
    </>
  )
}

export default BoxIntereses
