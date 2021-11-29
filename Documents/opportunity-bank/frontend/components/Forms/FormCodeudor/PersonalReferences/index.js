import * as React from 'react'
import { Formik, Form, Field } from 'formik'
import { DataPersonalReferences } from './DataPersonalReferences'
import * as Yup from 'yup'

import RadioButtom from '../../RadioButtom'
import TextInput from '../../TextInput'
import { useFetch } from '../../../../utils/useFetch'
import { useRouter } from 'next/router'
import FileUploader from '../../../FileUploader'

const ReferencesForm = props => {
  const router = useRouter()
  const { paso, rol } = router.query
  const [cedula, solicitud] = router.query.usuario

  const [hide, setHide] = React.useState(false)
  const reducerRef = (curr, updates) => ({ ...curr, ...updates })
  const [{ ref_personal, ref_comercial }, dispatch] = React.useReducer(reducerRef, {
    ref_personal: undefined,
    ref_comercial: undefined,
  })

  const initialValuesForm = {
    nombre_cliente: '',
    numero_cliente: '',

    nombre_referencia_familiar: '',
    parentesco: '',
    numero_telefonico: '',
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
      }

      if (response.status === 200) {
        const [ref_personal, ref_comercial] = info
        dispatch({ ref_personal, ref_comercial })
        setLoading(false)
        const obj = {
          nombre_cliente: ref_comercial.nombre,
          numero_cliente: ref_comercial.telefono,

          nombre_referencia_familiar: ref_personal.nombre,
          parentesco: ref_personal.parentesco,
          numero_telefonico: ref_personal.telefono,
        }

        setValuesForm(obj)
        setEditForm(true)
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleBack = () => {
    router.push(`/codeudor/${cedula}/${props.solicitud_id || solicitud}?paso=FCO_6&rol=${rol}`)
  }

  return editForm ? (
    <div className={`${hide && 'hidden'} mb-8`}>
      <Formik
        initialValues={valuesForm}
        validationSchema={Yup.object({
          nombre_cliente: Yup.string().required('requerido'),
          numero_cliente: Yup.number().required('requerido'),

          nombre_referencia_familiar: Yup.string().required('requerido'),
          parentesco: Yup.string().required('requerido'),
          numero_telefonico: Yup.number().required('requerido'),
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
            seccion: 'FCO_7',
            solicitud_id: props.solicitud_id || solicitud,
          }

          if (!ref_personal?.id) {
            dataToSend.data = {
              referencias: [
                {
                  tipo: 'personal',
                  nombre: value.nombre_referencia_familiar,
                  telefono: value.numero_telefonico,
                  parentesco: value.parentesco,
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
                  id: ref_personal?.id || null,
                  tipo: 'personal',
                  nombre: value.nombre_referencia_familiar,
                  telefono: Number(value.numero_telefonico),
                  parentesco: value.parentesco,
                },
                {
                  id: ref_comercial?.id || null,
                  tipo: 'comercial',
                  nombre: value.nombre_cliente,
                  telefono: Number(value.numero_cliente),
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
              props.dispatch({
                type: 'update',
                payload: true,
                fieldName: 'isCompletedPersonalReference',
              })
              props.setCurrent(props.current + 1)

              // props.setCurrent(props.current + 1)
              router.push(
                `/codeudor/${cedula}/${props.solicitud_id || solicitud}?paso=FCO_8&rol=${rol}`,
              )
              //setHide(true)
            } else {
              props.dispatch({
                type: 'update',
                payload: false,
                fieldName: 'isCompletedPersonalReference',
              })
            }
          } catch (err) {
            console.log(err)
          }
        }}
      >
        {values => (
          <Form>
            {DataPersonalReferences.map(field => {
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

            <FileUploader />

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
