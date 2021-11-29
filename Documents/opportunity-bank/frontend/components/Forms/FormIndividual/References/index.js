import * as React from 'react'
import { Formik, Form, Field } from 'formik'
import { DataReferencesTradeAndFamiliar } from './DataReferencesTradeAndFamiliar'
import * as Yup from 'yup'

import RadioButtom from '../../RadioButtom'
import TextInput from '../../TextInput'
import { useFetch } from '../../../../utils/useFetch'
import { useRouter } from 'next/router'

const ReferencesForm = props => {
  const router = useRouter()
  const { paso, rol } = router.query
  const [cedula, solicitud] = router.query.usuario

  const [hide, setHide] = React.useState(false)
  const reducerRef = (curr, updates) => ({ ...curr, ...updates })
  const [{ ref_personal_1, ref_personal_2, ref_comercial }, dispatch] = React.useReducer(
    reducerRef,
    {
      ref_personal_1: undefined,
      ref_personal_2: undefined,
      ref_comercial: undefined,
    },
  )

  const initialValuesForm = {
    nombre_cliente: '',
    numero_cliente: '',

    nombre_referencia_familiar: '',
    parentesco: '',
    numero_telefonico: '',

    nombre_referencia_familiar_alt: '',
    parentesco_alt: '',
    numero_telefonico_alt: '',
  }

  const [editForm, setEditForm] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [message, setMessage] = React.useState(null)
  const [valuesForm, setValuesForm] = React.useState(initialValuesForm)

  React.useEffect(async () => {
    setEditForm(false)
    try {
      const URL_GET_STEP_FORM = `${
        process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1
      }/credito/solicitud/${props.solicitud_id || solicitud}?seccion=${paso}`
      const response = await fetch(URL_GET_STEP_FORM)
      const info = await response.json()

      if (response.status === 404) {
        setLoading(false)
        setEditForm(true)
        setValuesForm(initialValuesForm)
      }

      if (response.status === 200) {
        const [ref_personal_1, ref_personal_2, ref_comercial] = info
        dispatch({ ref_personal_1, ref_personal_2, ref_comercial })
        setLoading(false)
        const obj = {
          nombre_cliente: ref_comercial.nombre,
          numero_cliente: ref_comercial.telefono,

          nombre_referencia_familiar: ref_personal_1.nombre,
          parentesco: ref_personal_1.parentesco,
          numero_telefonico: ref_personal_1.telefono,

          nombre_referencia_familiar_alt: ref_personal_2.nombre,
          parentesco_alt: ref_personal_2.parentesco,
          numero_telefonico_alt: ref_personal_2.telefono,
        }

        setValuesForm(obj)
        setEditForm(true)
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleBack = () => {
    router.push(
      `/individual/${cedula}/${props.solicitud_id || solicitud}?paso=FDE_7&rol=${rol}`,
    )
  }

  return editForm ? (
    <div className={`${hide && 'hidden'} mb-8`}>
      <Formik
        initialValues={valuesForm}
        validationSchema={Yup.object({
          nombre_cliente: Yup.string()
            .required('requerido')
            .matches(/^[a-zA-Z\s]*$/, 'No se permiten números ni caracteres especiales.'),
          numero_cliente: Yup.number().required('requerido'),

          nombre_referencia_familiar: Yup.string()
            .required('requerido')
            .matches(/^[a-zA-Z\s]*$/, 'No se permiten números ni caracteres especiales.'),
          parentesco: Yup.string()
            .required('requerido')
            .matches(/^[a-zA-Z\s]*$/, 'No se permiten números ni caracteres especiales.'),
          numero_telefonico: Yup.string()
            .min(7, 'Ingresa un número de teléfono válido.')
            .max(20, 'Ingresa un número de teléfono válido.'),

          nombre_referencia_familiar_alt: Yup.string()
            .required('requerido')
            .matches(/^[a-zA-Z\s]*$/, 'No se permiten números ni caracteres especiales.'),
          parentesco_alt: Yup.string()
            .required('requerido')
            .matches(/^[a-zA-Z\s]*$/, 'No se permiten números ni caracteres especiales.'),
          numero_telefonico_alt: Yup.string()
            .min(7, 'Ingresa un número de teléfono válido.')
            .max(20, 'Ingresa un número de teléfono válido.'),
        })}
        onSubmit={async value => {
          props.setForm(prevState => ({
            ...prevState,
            formulario_individual: {
              ...prevState.formulario_individual,
              informacion_referencias_comerciales_familiares: { ...value },
            },
          }))

          const dataToSend = {
            seccion: 'FDE_8',
            solicitud_id: props.solicitud_id || solicitud,
          }

          if (!ref_personal_1?.id) {
            dataToSend.data = {
              referencias: [
                {
                  tipo: 'personal',
                  nombre: value.nombre_referencia_familiar,
                  telefono: value.numero_telefonico,
                  parentesco: value.parentesco,
                },
                {
                  tipo: 'personal',
                  nombre: value.nombre_referencia_familiar_alt,
                  telefono: value.numero_telefonico_alt,
                  parentesco: value.parentesco_alt,
                },
                {
                  tipo: 'comercial',
                  nombre: value.nombre_cliente,
                  telefono: value.numero_cliente,
                },
              ],
            }
          } else {
            dataToSend.data = {
              referencias: [
                {
                  id: ref_personal_1?.id || null,
                  tipo: 'personal',
                  nombre: value.nombre_referencia_familiar,
                  telefono: value.numero_telefonico,
                  parentesco: value.parentesco,
                },
                {
                  id: ref_personal_2?.id || null,
                  tipo: 'personal',
                  nombre: value.nombre_referencia_familiar_alt,
                  telefono: value.numero_telefonico_alt,
                  parentesco: value.parentesco_alt,
                },
                {
                  id: ref_comercial?.id || null,
                  tipo: 'comercial',
                  nombre: value.nombre_cliente,
                  telefono: value.numero_cliente,
                },
              ],
            }
          }

          try {
            const { res, responseComplete } = await useFetch(
              `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud`,
              dataToSend,
            )

            if (res.status === 422) {
              setMessage(res.message || 'Ya tienes referencias')
            }

            if (responseComplete) {
              props.setIsCompletedReferenceForm(true)
              props.setCurrent(props.current + 1)
              router.push(
                `/individual/${cedula}/${
                  props.solicitud_id || solicitud
                }?paso=FDE_9&rol=${rol}`,
              )
              //setHide(true)
            } else {
              props.setIsCompletedReferenceForm(false)
            }
          } catch (err) {
            console.log(err)
          }
        }}
      >
        {values => (
          <Form>
            {DataReferencesTradeAndFamiliar.map(field => {
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

            {message}
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
  ) : (
    <div>Loading ...</div>
  )
}

export default ReferencesForm
