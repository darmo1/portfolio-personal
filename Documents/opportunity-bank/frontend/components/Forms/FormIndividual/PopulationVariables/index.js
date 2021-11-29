import * as React from 'react'
import { Formik, Form } from 'formik'
import { dataPopulationVariables } from './DataPopulationVariables'
import * as Yup from 'yup'

import RadioButtom from '../../RadioButtom'
import TextInput from '../../TextInput'
import { useFetch } from '../../../../utils/useFetch'
import SelectionInput from '../../SelectionInput'
import { useRouter } from 'next/router'

const PopulationVariables = props => {
  const router = useRouter()
  const { paso, rol } = router.query
  const [cedula, solicitud] = router.query.usuario

  const [hide, setHide] = React.useState(false)
  const initialValuesForm = {
    genero: '',
    orientacion_sexual: '',
    etnia: '',
    discapacidad: '',
    victima: '',
    poblacion_campesina: '',
    estado_civil: '',
    nivel_escolaridad: '',
    rol_hogar: '',
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
      `/individual/${cedula}/${props.solicitud_id || solicitud}?paso=FDE_4&rol=${rol}`,
    )
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className={`${hide && 'hidden'} mb-8`}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          genero: Yup.string()
            .required('requerido')
            .oneOf(['Masculino', 'Femenino', 'Otro', 'Prefiero no decir']),
          orientacion_sexual: Yup.string()
            .required('requerido')
            .oneOf(['LGBTI', 'OTRO', 'Heterosexual', 'No Aplica']),
          etnia: Yup.string().required('requerido'),
          discapacidad: Yup.string().required('requerido').oneOf(['SI', 'NO']),
          victima: Yup.string().required('requerido').oneOf(['SI', 'NO']),
          poblacion_campesina: Yup.string().required('requerido').oneOf(['SI', 'NO']),
          estado_civil: Yup.string()
            .required('requerido')
            .oneOf(['Soltero', 'Casado', 'Viudo', 'Union Libre', 'Divorciado']),
          nivel_escolaridad:
            Yup.string().required('requerido').oneOf[
              ('Ninguno',
              'Priimaria',
              'Bachiller',
              'Tecnico',
              'Tecnologo',
              'Profesional',
              'Especialista')
            ],
          rol_hogar: Yup.string()
            .required('requerido')
            .oneOf(['Cabeza Hogar', 'Aporta economicamente', 'No aporta']),
        })}
        onSubmit={async value => {
          props.setForm(prevState => ({
            ...prevState,
            formulario_individual: {
              ...prevState.formulario_individual,
              variables_poblacionales: { ...value },
            },
          }))

          const dataToSend = {
            seccion: 'FDE_5',
            solicitud_id: props.solicitud_id || solicitud,
            data: { ...value },
          }

          try {
            const { responseComplete } = await useFetch(
              `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud`,
              dataToSend,
            )
            if (responseComplete) {
              props.setIsCompletedPopulationVariables(true)
              props.setCurrent(props.current + 1)
              router.push(
                `/individual/${cedula}/${
                  props.solicitud_id || solicitud
                }?paso=FDE_6&rol=${rol}`,
              )
              //setHide(true)
            } else {
              props.setIsCompletedPopulationVariables(false)
            }
          } catch (err) {
            console.log(err)
          }
        }}
      >
        {values => (
          <Form>
            <h2 className="text-xl text-center font-medium mb-4">
              Información personal Adicional
            </h2>
            {dataPopulationVariables.map(field => {
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

              return (
                <TextInput
                  key={field.id}
                  label={field.fieldName}
                  name={field.name}
                  className={field.className}
                />
              )
            })}
            <div className="flex justify-around">
              <button
                onClick={() => handleBack(values)}
                className="mt-6 p-4 w-2/5 font-bold text-white rounded-full bg-red-500"
              >
                Anterior
              </button>

              <button
                type="submit"
                className="mt-6 p-4 w-2/5 font-bold text-white rounded-full bg-color_primary_2_ligth"
              >
                Siguiente
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default PopulationVariables
