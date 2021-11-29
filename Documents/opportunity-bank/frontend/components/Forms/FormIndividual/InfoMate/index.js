import * as React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { DataMateForm } from './DataMateForm'
import * as Yup from 'yup'

import TelInput from '../../TelInput'
import { useFetch } from '../../../../utils/useFetch'
import TextInput from '../../TextInput'
import SelectionInput from '../../SelectionInput'
import { useRouter } from 'next/router'

const InfoMate = props => {
  const router = useRouter()
  const { paso, rol } = router.query
  const [cedula, solicitud] = router.query.usuario

  const [hide, setHide] = React.useState(false)

  const initialValuesForm = {
    nombre: '',
    num_identificacion: '',
    telefono: '',
    genero: '',
    lugar_trabajo: '',
    telefono_trabajo: '',
  }

  const [initialValues, setInitialValues] = React.useState(initialValuesForm)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(async () => {
    setLoading(true)
    try {
      const URL_GET_STEP_FORM = `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud/${solicitud}?seccion=${paso}`
      const response = await fetch(URL_GET_STEP_FORM)
      const info = await response.json()

      if (response.status === 404) {
        setInitialValues(initialValues)
        setLoading(false)
      }

      if (response.status === 200) {
        setInitialValues({ ...info })
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleBack = () => {
    router.push(
      `/individual/${cedula}/${props.solicitud_id || solicitud}?paso=FDE_3&rol=${rol}`,
    )
  }

  return loading ? (
    <div>Loading ...</div>
  ) : (
    <div className={`${hide && 'hidden'} mb-8`}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          nombre: Yup.string().matches(
            /^[a-zA-Z\s]*$/,
            'No se permiten números ni caracteres especiales.',
          ),
          num_identificacion: Yup.number()
            .typeError('Debe ser un numero')
            .test(
              'required_if_name',
              'Requerido si se especifica nombre de cónyugue.',
              function (num, context) {
                return (
                  context.parent.nombre === undefined ||
                  (context.parent.nombre !== undefined && num !== undefined)
                )
              },
            ),
          telefono: Yup.number().typeError('Debe ser un numero').positive().notRequired(),
          genero: Yup.string()
            .required('Requerido')
            .oneOf(['Masculino', 'Femenino', 'Otro', 'Prefiero no decir']),
        })}
        onSubmit={async value => {
          props.setForm(prevState => ({
            ...prevState,
            formulario_individual: {
              ...prevState.formulario_individual,
              conyugue: { ...value },
            },
          }))

          const {
            lugar_trabajo,
            telefono_trabajo,
            telefono,
            num_identificacion,
            ...dataConyugue
          } = value

          const dataToSend = {
            seccion: 'FDE_4',
            solicitud_id: props.solicitud_id || solicitud,
            data: {
              telefono: Number(telefono),
              num_identificacion: Number(num_identificacion),
              ...dataConyugue,
            },
          }

          try {
            const { responseComplete } = await useFetch(
              `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud`,
              dataToSend,
            )

            if (responseComplete) {
              props.setIsCompletedInfoMate(true)
              props.setCurrent(props.current + 1)
              router.push(
                `/individual/${cedula}/${
                  props.solicitud_id || solicitud
                }?paso=FDE_5&rol=${rol}`,
              )
              //setHide(true)
            } else {
              props.setIsCompletedInfoMate(false)
            }
          } catch (err) {
            console.error(err)
          }
        }}
      >
        {values => (
          <Form>
            {DataMateForm.map(field => {
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

              if (field.type === 'tel') {
                return (
                  <TelInput
                    key={field.id}
                    label={field.fieldName}
                    name={field.name}
                    type={field.type}
                    className={field.className}
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

            <div className="flex justify-around">
              <button
                onClick={handleBack}
                className="mt-6 p-4 w-2/5 font-bold text-white rounded-full bg-red-500"
              >
                Anterior
              </button>

              <button
                type="submit"
                className="mt-6 p-4 w-2/5 font-bold text-white rounded-full bg-color_primary_2_ligth"
              >
                {' '}
                Siguiente{' '}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default InfoMate
