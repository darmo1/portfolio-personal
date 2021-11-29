import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik'
import React from 'react'
import SelectionInput from '../Forms/SelectionInput'
import * as Yup from 'yup'
import { useFetch } from '../../utils/useFetch'

const className =
  'w-full h-12 px-4 py-2 my-1 text-base border border-color_gray_4 placeholder-color_gray_5 rounded-2xl'

const CrearUsuario = ({ roles }) => {
  //   const [countries, setCountries] = React.useState([])
  //   const [departamentos, setDepartamentos] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')

  const GetDep = () => {
    const { values } = useFormikContext()
    const [muninicipios, setMunicipios] = React.useState([])

    React.useEffect(async () => {
      try {
        const URL_CIUDADES = `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/maestras/departamento/05-ANTIOQUIA/ciudades`
        const municipios = await fetcher(URL_CIUDADES)
        setMunicipios(municipios)
      } catch (err) {
        console.log(err, 'from err')
      }
    }, [])

    return muninicipios.length > 0 ? (
      <SelectionInput
        key={'municipio'}
        id={'municipio'}
        label={'Ciudad o Municipio'}
        name={'municipio'}
        className={
          "'w-full h-12 px-4 py-2  text-base border border-color_gray_4 placeholder-color_gray_5 rounded-2xl'"
        }
        options={muninicipios}
        render={municipio => (
          <option key={municipio.id} value={municipio.id}>
            {municipio.nombre}
          </option>
        )}
      />
    ) : null
  }

  const initialValuesForm = {
    nombres: '',
    apellidos: '',
    cedula: '',
    telefono: '',
    celular: '',
    correo: '',
    direccion: '',
    rolID: '',
    municipio: '',
  }

  async function fetcher(url) {
    let response = await fetch(url)
    return await response.json()
  }

  return loading ? (
    <div>Loading....</div>
  ) : (
    <Formik
      initialValues={initialValuesForm}
      validationSchema={Yup.object({
        nombres: Yup.string().required('Requerido'),
        apellidos: Yup.string().required('Requerido'),
        cedula: Yup.number()
          .required('Requerido')
          .typeError('Debe ser un número')
          .test(
            'Is positive?',
            'ERROR: El numero tiene que ser mayor a cero',
            value => value > 0,
          ),
        telefono: Yup.string()
          .required('Requerido')
          .typeError('Debe ser un número')
          .test(
            'Is positive?',
            'ERROR: El numero tiene que ser mayor a cero',
            value => value >= 0,
          ),
        celular: Yup.string()
          .notRequired()
          .typeError('Debe ser un número')
          .test(
            'Is positive?',
            'ERROR: El numero tiene que ser mayor a cero',
            value => value >= 0,
          )
          .nullable(true),
        correo: Yup.string().required('Requerido').email(),
        direccion: Yup.string().required('Requerido'),
        rolID: Yup.string().required('Requerido'),
        municipio: Yup.string().required('Requerido'),
      })}
      onSubmit={async value => {
        const URL_CREATE_USER_ROL = `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/roles/crear-usuario-rol`
        const { rolID, ...dataForm } = value
        const dataToSend = {
          ...dataForm,
          rolID: Number(rolID),
        }

        try {
          const { res } = useFetch(URL_CREATE_USER_ROL, dataToSend)
          console.log(res)
        } catch (err) {
          console.log(err)
        }
      }}
    >
      {({ values }) => {
        return (
          <Form className="flex flex-col">
            <label>
              {' '}
              Nombres
              <Field type="text" name="nombres" className={className} />
              <ErrorMessage name="nombres" />
            </label>

            <label>
              {' '}
              Apellidos
              <Field type="text" name="apellidos" className={className} />
              <ErrorMessage name="apellidos" />
            </label>

            <label>
              Cedula
              <Field type="number" min={0} name="cedula" className={className} />
              <ErrorMessage name="cedula" />
            </label>

            <label>
              Teléfono
              <Field type="number" name="telefono" className={className} />
              <ErrorMessage name="telefono" />
            </label>

            <label>
              Celular
              <Field type="number" name="celular" className={className} />
              <ErrorMessage name="celular" />
            </label>

            <label>
              Correo
              <Field type="email" name="correo" className={className} />
              <ErrorMessage name="correo" />
            </label>

            <label>
              Dirección
              <Field type="text" name="direccion" className={className} />
              <ErrorMessage name="direccion" />
            </label>

            <SelectionInput
              key={'roles'}
              id={'roles'}
              label={'Rol'}
              name={'rolID'}
              className={
                'w-full h-12 px-4 py-2 my-1 text-base border border-color_gray_4 placeholder-color_gray_5 rounded-2xl'
              }
              options={roles}
              render={rol => (
                <option key={rol.id} value={rol.id}>
                  {rol.nombre}
                </option>
              )}
            />

            <GetDep />

            {message !== '' && (
              <div className={message.includes('error') ? ERROR_CLASS : SUCCESS_CLASS}>
                {' '}
                {message}{' '}
              </div>
            )}

            <button
              type="submit"
              className="mt-2 p-2  font-bold text-white rounded-full bg-color_primary_2_ligth"
            >
              Crear
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CrearUsuario
