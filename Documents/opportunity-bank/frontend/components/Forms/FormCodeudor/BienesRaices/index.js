import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextInput from '../../TextInput'
import { DataBienesRaices } from './DataBienesRaices'
import { useFetch } from '../../../../utils/useFetch'
import { useRouter } from 'next/router'

const BienesRaices = props => {
  const router = useRouter()
  const { paso, rol } = router.query
  const [cedula, solicitud] = router.query.usuario

  const initialValuesForm = {
    activos_propios: '',
    avaluo_catastral: '',
    matricula: '',
    num_escritura: '',
  }

  const [initialValues, setInitialValues] = React.useState(initialValuesForm)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(async () => {
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
    router.push(`/codeudor/${cedula}/${props.solicitud_id || solicitud}?paso=FCO_5&rol=${rol}`)
  }

  const classInput = 'h-10 border border-gray-400 px-4'

  return loading ? (
    <div>Loading ....</div>
  ) : (
    <div>
      <h2 className="text-xl font-semibold mb-4">Info Bienes raices</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          activos_propios: Yup.number()
            .typeError('Debe ser un numero')
            .required('requerido')
            .positive(),
          num_escritura: Yup.number()
            .typeError('Debe ser un numero')
            .required('requerido')
            .positive(),
          matricula: Yup.number()
            .typeError('Debe ser un numero')
            .required('requerido')
            .positive(),
          avaluo_catastral: Yup.number().typeError('Debe ser un numero').required('requerido'),
        })}
        onSubmit={async value => {
          props.setForm(prevState => ({
            ...prevState,
            formulario_codeudor: {
              ...prevState.formulario_codeudor,
              bienes_raices: { ...value },
            },
          }))

          const dataToSend = {
            seccion: 'FCO_6',
            solicitud_id: props.solicitud_id || solicitud,
            data: { ...value },
          }

          try {
            const { responseComplete } = await useFetch(
              `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud`,
              dataToSend,
            )

            if (responseComplete) {
              props.dispatch({
                type: 'update',
                payload: true,
                fieldName: 'isCompletedBienesRaices',
              })
              props.setCurrent(props.current + 1)
              router.push(
                `/codeudor/${cedula}/${props.solicitud_id || solicitud}?paso=FCO_7&rol=${rol}`,
              )
            } else {
              props.dispatch({
                type: 'update',
                payload: false,
                fieldName: 'isCompletedBienesRaices',
              })
            }
          } catch (err) {
            console.log(err)
          }
        }}
      >
        {() => (
          <Form>
            {DataBienesRaices.map(field => {
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

export default BienesRaices
