import * as React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { DataBasicInformationForm } from './DataBasicInformationForm'
import * as Yup from 'yup'
import SelectionInput from '../../SelectionInput'
import TextInput from '../../TextInput'
import DateInput from '../../DateInput'
import { useFetch } from '../../../../utils/useFetch'
import { useRouter } from 'next/router'

const prerrequisitosDefault = {
  terminos_condiciones: true,
  rango_edad: true,
  estrato_valido: true,
  no_central_riesgo: true,
  no_deudas_vigentes: true,
  ubicacion_negocio: true,
}

const BasicInformationForm = props => {
  const {
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    num_identificacion,
  } = props.userInfo

  const router = useRouter()
  const { paso, rol } = router.query
  const [cedula, solicitud] = router.query.usuario
  const [disableInput, setDisableInput] = React.useState(false)

  React.useEffect(() => {
    if (!num_identificacion) {
      setDisableInput(false)
    } else {
      setDisableInput(true)
    }
  }, [])

  const initialValuesForm = {
    razon_social: '',
    nit: '',
    tipo_identificacion: '',
    num_identificacion: num_identificacion || '',
    seguridad_social: '',
    primer_nombre: primer_nombre || '',
    segundo_nombre: segundo_nombre || '',
    primer_apellido: primer_apellido || '',
    segundo_apellido: segundo_apellido || '',
    fecha_nacimiento: '',
    edad: '',
  }

  const [initialValues, setInitialValues] = React.useState(initialValuesForm)
  const [preReq, setpreReq] = React.useState(undefined)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(async () => {
    setLoading(true)
    if (!solicitud) {
      setLoading(false)
      return
    }

    try {
      const URL_GET_STEP_FORM = `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud/${solicitud}?seccion=${paso}`
      const response = await fetch(URL_GET_STEP_FORM)
      const info = await response.json()

      if (response.status === 404) {
        setInitialValues(initialValues)
        setLoading(false)
      }

      if (response.status === 200) {
        setInitialValues({ ...info.persona, edad: '' })
        setpreReq({ ...info.prerrequisitos })
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  const [hide, setHide] = React.useState(false)

  function calculateAge(date) {
    const currentDate = new Date().getFullYear()
    const birthDate = new Date(date)
    const birthYear = birthDate.getFullYear()
    const calculateAge = Math.floor(currentDate - birthYear)
    return Number(calculateAge)
  }

  function InputAge(props) {
    const { fecha_nacimiento, setFieldValue } = props

    React.useEffect(() => {
      if (fecha_nacimiento !== '') {
        const age = calculateAge(fecha_nacimiento)
        setFieldValue('edad', age)
      }
    }, [fecha_nacimiento])
    return (
      <div>
        <label className="hidden">Edad</label>
        <Field type="text" disabled placeholder="Edad" name="edad" className="hidden" />
        <ErrorMessage name="edad" />
      </div>
    )
  }

  return loading ? (
    <div>Loading</div>
  ) : (
    <div className={`${hide && 'hidden'} mb-8`}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          razon_social: Yup.string().nullable(true),
          nit: Yup.number()
            .typeError('Debe ser un número')
            .positive(' Debe ser mayor a 0')
            .nullable(true),
          tipo_identificacion: Yup.string()
            .required('requerido')
            .oneOf(['C.C', 'C.E', 'P.E.P']),
          num_identificacion: Yup.number()
            .typeError('Debe ser un número')
            .required('requerido')
            .positive('Debe ser mayor a 0'),
          seguridad_social: Yup.string().required('requerido').oneOf(['EPS', 'Sisbén', 'N/a']),
          primer_nombre: Yup.string()
            .required('requerido')
            .max(20, 'No puede exceder a 20 caractéres')
            .matches(/^[a-zA-Z\s]*$/, 'No se permiten números ni caracteres especiales.'),
          segundo_nombre: Yup.string()
            .notRequired()
            .max(20, 'No puede exceder a 20 caractéres')
            .matches(/^[a-zA-Z\s]*$/, 'No se permiten números ni caracteres especiales.')
            .nullable(true),
          primer_apellido: Yup.string()
            .required('requerido')
            .max(20, 'No puede exceder a 20 caractéres')
            .matches(/^[a-zA-Z\s]*$/, 'No se permiten números ni caracteres especiales.'),
          segundo_apellido: Yup.string()
            .notRequired()
            .max(20, 'No puede exceder a 20 caractéres')
            .matches(/^[a-zA-Z\s]*$/, 'No se permiten números ni caracteres especiales.')
            .nullable(true),
          fecha_nacimiento: Yup.date()
            .required('requerido')
            .test('age', 'Debes tener entre 18 y 75', function validateAge(edad) {
              const currentDate = new Date().getFullYear()
              const birthDate = new Date(edad)
              const birthYear = birthDate.getFullYear()
              const calculateAge = Math.floor(currentDate - birthYear)
              return Number(calculateAge) >= 18 && Number(calculateAge) <= 75
            }),
          edad: Yup.number()
            .typeError('Debe ser un número')
            .min(18, 'Debes tener 18 años')
            .max(75, 'Debes tener menos de 75')
            .positive('¿Es en serio?')
            .notRequired(),
        })}
        onSubmit={async value => {
          props.setForm(prevState => ({
            ...prevState,
            formulario_individual: {
              ...prevState.formulario_individual,
              informacion_basica: { ...value },
            },
          }))

          const { edad, nit, razon_social, ...infoBasic } = value

          const dataToSend = {
            seccion: 'FDE_2',
            data: {
              prerrequisitos: preReq ||
                prerrequisitosDefault || {
                  ...props.form.formulario_individual.autorizacion_datos_personales,
                  ...props.form.formulario_individual.datos_prerequisitos,
                },
            },
          }

          if (solicitud) {
            dataToSend.solicitud_id = solicitud
          }

          if (nit === '') {
            dataToSend.data.persona = { nit: null, ...infoBasic }
          } else {
            dataToSend.data.persona = { ...infoBasic, nit: Number(nit) }
          }

          if (razon_social === '') {
            dataToSend.data.persona = { razon_social: null, ...infoBasic }
          } else {
            dataToSend.data.persona = { ...infoBasic, razon_social }
          }

          try {
            const { res, responseComplete } = await useFetch(
              `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud`,
              dataToSend,
              false,
            )

            if (responseComplete) {
              props.setSolicitud_id(res.solicitud_credito)
              props.setIsCompletedBasicInformation(true)
              props.setCurrent(props.current + 1)
              router.push(
                `/individual/${value.num_identificacion || cedula}/${
                  res.solicitud_credito || solicitud
                }?paso=FDE_3&rol=${rol}`,
              )
              //setHide(true)
            } else {
              props.setIsCompletedBasicInformation(false)
            }
          } catch (err) {
            console.log(err)
          }
        }}
      >
        {values => (
          <Form>
            {DataBasicInformationForm.map(field => {
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
                    />

                    <InputAge
                      fecha_nacimiento={values.values.fecha_nacimiento}
                      setFieldValue={values.setFieldValue}
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
                <TextInput
                  key={field.id}
                  label={field.fieldName}
                  name={field.name}
                  type={field.type}
                  className={field.className}
                />
              )
            })}

            <div className="flex justify-center md:justify-end">
              <button
                type="submit"
                className="mt-6 p-4 w-2/5 font-bold text-white rounded-full bg-color_primary_2_ligth"
              >
                Siguiente
              </button>
            </div>

            {/* <button
              type="submit"
              className="mt-4 p-2 w-1/2 text-white rounded-full bg-blue_secondary"
            >
              Siguiente
            </button> */}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default BasicInformationForm
