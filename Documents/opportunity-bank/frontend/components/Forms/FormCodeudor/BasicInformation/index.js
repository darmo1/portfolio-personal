import { Formik, Form } from 'formik'

import * as Yup from 'yup'
import * as React from 'react'
import { DataBasicInformation, datacodeudor } from './DataBasicInformation'
import TextInput from '../../TextInput'
import DateInput from '../../DateInput'
import SelectionInput from '../../SelectionInput'
import { useFetch } from '../../../../utils/useFetch'
import { useRouter } from 'next/router'

const SUCCESS_CLASS =
  'mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
const ERROR_CLASS =
  'mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'

const BasicInformationForm = props => {
  const router = useRouter()
  const { paso, rol } = router.query
  const [cedula, solicitud] = router.query.usuario

  const {
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    num_identificacion,
  } = props.userInfo
  const [disableInput, setDisableInput] = React.useState(false)

  const initialValuesForm = {
    tipo_identificacion: '',
    num_identificacion: num_identificacion || '',
    primer_nombre: primer_nombre || '',
    segundo_nombre: segundo_nombre || '',
    primer_apellido: primer_apellido || '',
    segundo_apellido: segundo_apellido || '',
    fecha_nacimiento: '',
    seguridad_social: '',
    num_identificacion_deudor: '',
  }

  React.useEffect(() => {
    if (!num_identificacion) {
      setDisableInput(false)
    } else {
      setDisableInput(true)
    }
  }, [])

  const [initialValues, setInitialValues] = React.useState(initialValuesForm)
  const [loading, setLoading] = React.useState(false)
  const [messageError, setMessageError] = React.useState('')

  React.useEffect(async () => {
    setLoading(true)
    if (!solicitud) {
      setLoading(false)
      return
    }

    try {
      //const URL_GET_STEP_FORM = `https://oportunitybank.azurewebsites.net/api/v1/credito/solicitud/${solicitud}?seccion=${paso}`
      const URL_GET_STEP_FORM = `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud/${solicitud}?seccion=${paso}`
      const response = await fetch(URL_GET_STEP_FORM)
      const info = await response.json()

      if (response.status === 404) {
        setInitialValues(initialValues)
      }

      if (response.status === 200) {
        setInitialValues({ ...info })
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      setMessageError('Hubo un error, intenta de nuevo')
      setTimeout(() => setMessageError(''), 3000)
    }
  }, [])

  return loading ? (
    <div>Loading ....</div>
  ) : (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          tipo_identificacion: Yup.string()
            .required('requerido')
            .oneOf(['C.C', 'C.E', 'P.E.P']),
          num_identificacion: Yup.number()
            .typeError('Debe ser un número')
            .required('requerido')
            .positive(' Debe ser mayor a 0'),

          primer_nombre: Yup.string().required('requerido'),
          segundo_nombre: Yup.string(),
          primer_apellido: Yup.string().required('requerido'),
          segundo_apellido: Yup.string().notRequired().nullable(true),
          fecha_nacimiento: Yup.date().required('requerido'),
          seguridad_social: Yup.string().required('requerido').oneOf(['EPS', 'Sisbén', 'N/a']),
          num_identificacion_deudor: Yup.number()
            .required('requerido')
            .typeError('Deber ser un numero')
            .positive(),
        })}
        onSubmit={async value => {
          props.setForm(prevState => ({
            ...prevState,
            formulario_codeudor: {
              ...prevState.formulario_codeudor,
              informacion_basica: { ...value },
            },
          }))

          const { num_identificacion, num_identificacion_deudor, ...dataValues } = value

          const dataToSend = {
            seccion: 'FCO_1',
            data: {
              ...dataValues,
              num_identificacion: Number(num_identificacion),
              num_identificacion_deudor: Number(num_identificacion_deudor),
            },
          }

          try {
            const { responseComplete, res } = await useFetch(
              `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud`,
              dataToSend,
            )

            if (res.statusCode === 404) {
              setMessageError(res.message)
              setTimeout(() => {
                setMessageError('')
              }, 3000)
            }

            if (responseComplete) {
              props.dispatch({
                type: 'update',
                payload: true,
                fieldName: 'isCompletedBasicInformation',
              })
              props.setSolicitud_id(res.solicitud_credito)
              props.setCurrent(props.current + 1)
              router.push(
                `/codeudor/${value.num_identificacion || cedula}/${
                  res.solicitud_credito || solicitud
                }?paso=FCO_2&rol=${rol}`,
              )
            } else {
              props.dispatch({
                type: 'update',
                payload: false,
                fieldName: 'isCompletedBasicInformation',
              })
            }
          } catch (err) {
            console.log(err)
          }
        }}
      >
        {({ values }) => {
          return (
            <Form>
              {DataBasicInformation.map(field => {
                if (field.type === 'select') {
                  return (
                    <SelectionInput
                      key={field.id}
                      id={field.id}
                      label={field.fieldName}
                      name={field.name}
                      className={field.className}
                      options={field.options}
                      render={option => (
                        <option key={option.id} value={option.name}>
                          {option.fieldName}
                        </option>
                      )}
                    />
                  )
                }

                if (field.type === 'date') {
                  return (
                    <div key={field.id}>
                      <DateInput
                        key={field.id}
                        label={field.fieldName}
                        name={field.name}
                        type={field.type}
                        className={field.className}
                      />
                    </div>
                  )
                }

                if (field.name === 'num_identificacion') {
                  return (
                    <TextInput
                      key={field.id}
                      label={field.fieldName}
                      name={field.name}
                      type={field.type}
                      className={field.className}
                      disabled={disableInput}
                    />
                  )
                }

                return (
                  <React.Fragment>
                    <TextInput
                      key={field.id}
                      label={field.fieldName}
                      name={field.name}
                      type={field.type}
                      className={field.className}
                    />
                  </React.Fragment>
                )
              })}

              {messageError !== '' && <div className={ERROR_CLASS}>{messageError}</div>}

              <div className="flex justify-center md:justify-end">
                <button
                  type="submit"
                  className="mt-6 p-4 w-2/5 font-bold text-white rounded-full bg-color_primary_2_ligth"
                >
                  Siguiente
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default BasicInformationForm
