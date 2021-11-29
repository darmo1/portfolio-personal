import { data } from 'autoprefixer'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import * as Yup from 'yup'
import { useFetch } from '../../../../utils/useFetch'

import DateInput from '../../DateInput'
import SelectionInput from '../../SelectionInput'
import TelInput from '../../TelInput'
import TextInput from '../../TextInput'
import { DataPopulationVariables } from './DataPopulationVariables'

const PopulationVariables = props => {
  const router = useRouter()
  const { paso, rol } = router.query
  const [cedula, solicitud] = router.query.usuario

  const initialValuesForm = {
    genero: '',
    estado_civil: '',
    nivel_escolaridad: '',
    personas_a_cargo: '',
    estado_laboral: '',
    nombre_empresa: '',
    direccion_empresa: '',
    telefono_empresa: '',
    poblacion_campesina: 'NO',
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
    router.push(`/codeudor/${cedula}/${props.solicitud_id || solicitud}?paso=FCO_2&rol=${rol}`)
  }

  const classInput = 'h-10 border border-gray-400 px-4'

  return loading ? (
    <div>Loading ... </div>
  ) : (
    <div>
      <h2 className="text-xl font-semibold mb-4">Variables poblacionales</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          genero: Yup.string().required('requerido').oneOf(['Masculino', 'Femenino', 'N/a']),
          estado_civil: Yup.string()
            .required('requerido')
            .oneOf(['Soltero', 'Casado', 'Viudo', 'Union Libre', 'Divorciado']),
          nivel_escolaridad: Yup.string()
            .required('requerido')
            .oneOf([
              'Ninguno',
              'Primaria',
              'Bachiller',
              'Tecnico',
              'Tecnologo',
              'Profesional',
              'Especialista',
              'Magister',
              'Doctorado',
            ]),
          personas_a_cargo: Yup.number().required('requerido'),
          estado_laboral: Yup.string().required('requerido').oneOf(['Empleado', 'Desempleado']),

          nombre_empresa: Yup.string().notRequired(),
          direccion_empresa: Yup.string().notRequired(),
          telefono_empresa: Yup.number().positive().notRequired(),
          poblacion_campesina: Yup.string().notRequired(),
        })}
        onSubmit={async value => {
          props.setForm(prevState => ({
            ...prevState,
            formulario_codeudor: {
              ...prevState.formulario_codeudor,
              variables_poblacionales: { ...value },
            },
          }))

          let dataToSend = {
            seccion: 'FCO_3',
            solicitud_id: props.solicitud_id || solicitud,
          }

          if (value.estado_laboral === 'Desempleado') {
            const { nombre_empresa, direccion_empresa, telefono_empresa, ...data } = value

            dataToSend.data = { ...data }
          } else {
            dataToSend.data = { ...value }
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
                fieldName: 'isCompletedPopulationVariables',
              })
              props.setCurrent(props.current + 1)
              router.push(
                `/codeudor/${cedula}/${props.solicitud_id || solicitud}?paso=FCO_4&rol=${rol}`,
              )
            } else {
              props.dispatch({
                type: 'update',
                payload: false,
                fieldName: 'isCompletedPopulationVariables',
              })
            }
          } catch (err) {
            console.log(err)
          }
        }}
      >
        {({ values }) => (
          <Form>
            {DataPopulationVariables.map(field => {
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

            {values.estado_laboral === 'Empleado' ? (
              <div>
                <TextInput
                  key={'nombre_empresa'}
                  label={'Nombre de la empresa'}
                  name="nombre_empresa"
                  type="text"
                  className={classInput}
                  placeholder="Nombre de la empresa en la que trabajas"
                />

                <TextInput
                  key={'direccion_empresa'}
                  type="text"
                  name="direccion_empresa"
                  placeholder="Dirección"
                  className={classInput}
                />

                <TextInput
                  key={'telefono_empresa'}
                  type="number"
                  name="telefono_empresa"
                  placeholder="Teléfono de la empresa"
                  className={classInput}
                />
              </div>
            ) : null}

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

export default PopulationVariables
