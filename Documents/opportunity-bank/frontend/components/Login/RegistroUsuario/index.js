import { Form, Formik, useFormikContext } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'
import SelectionInput from '../../Forms/SelectionInput'
import TextInput from '../../Forms/TextInput'
import { dataRegistroUsuario } from './dataRegistroUsuario'
import { useFetch } from '../../../utils/useFetch'
import { useRouter } from 'next/router'

const SUCCESS_CLASS =
  'mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
const ERROR_CLASS =
  'mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'

function RegistroUsuario() {
  const router = useRouter()
  const [countries, setCountries] = React.useState([])
  const [departamentos, setDepartamentos] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')

  const GetDep = () => {
    const { values } = useFormikContext()
    const [muninicipios, setMunicipios] = React.useState([])

    React.useEffect(async () => {
      try {
        const URL_CIUDADES = `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/maestras/departamento/${values.departamento}/ciudades`
        const municipios = await fetcher(URL_CIUDADES)
        setMunicipios(municipios)
      } catch (err) {
        console.log(err)
      }
    }, [values.departamento])

    return values.pais === 'CO-Colombia' && muninicipios.length > 0 ? (
      <SelectionInput
        key={'municipio'}
        id={'municipio'}
        label={'Municipio'}
        name={'municipio'}
        className={
          "'w-full h-12 px-4 py-2 my-1 text-base border border-color_gray_4 placeholder-color_gray_5 rounded-2xl'"
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
    tipo_sociedad: '',
    tipo_entidad: '',
    tipo_identificacion: '',
    documento: '',
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    celular: '',
    direccion: '',
    barrio: '',
    pais: '',
    departamento: '',
    municipio: '',
    genero: '',
    politica: true,
    notificacion: false,
  }

  async function fetcher(url) {
    let response = await fetch(url)
    return await response.json()
  }

  React.useEffect(async () => {
    setLoading(true)
    const URL_PAISES = `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/maestras/paises`
    const URL_DEPARTAMENTOS = `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/maestras/departamentos`

    const [paises, departamentos] = await Promise.all([
      fetcher(URL_PAISES),
      fetcher(URL_DEPARTAMENTOS),
    ])
    setCountries(paises)
    setDepartamentos(departamentos)
    setLoading(false)
  }, [])

  React.useEffect(() => {
    if (initialValuesForm.departamento !== '') {
      getMunicipio(initialValuesForm.departamento)
    }
  }, [initialValuesForm.departamento])

  return loading ? (
    <div>Loading ....</div>
  ) : (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl text-center font-medium mt-10">Regístrate</h1>
      <Formik
        initialValues={initialValuesForm}
        validationSchema={Yup.object({
          tipo_sociedad: Yup.string()
            .required('requerido')
            .oneOf(['N-Persona Natural', 'J-Persona Juridica']),
          tipo_entidad: Yup.string()
            .required('requerido')
            .oneOf([
              'O-ORGANIZACIÓN SIN ÁNIMO DE LUCRO',
              'R-PRIVADA',
              'P-PÚBLICA',
              'T-OTRO',
              'NINGUNO',
            ]),
          tipo_identificacion: Yup.string()
            .required('requerido')
            .oneOf([
              '1-Cédula de Ciudadanía',
              '2-Tarjeta de identidad',
              '3-Cédula de Extranjería',
              '4-NIT',
            ]),
          documento: Yup.number().required('requerido'),
          nombres: Yup.string()
            .matches('^[a-zA-Z ]+$', 'No puede contener números ni caracteres especiales.')
            .required('Requerido'),
          apellidos: Yup.string()
            .matches('^[ a-zA-Z ]+$', 'No puede contener números ni caracteres especiales.')
            .required('Requerido'),
          correo: Yup.string().email().required('Requerido'),
          telefono: Yup.string()
            .min(7, 'Ingresa un número de teléfono válido.')
            .required('Requerido'),
          celular: Yup.string()
            .min(10, 'Ingresa un número de celular válido.')
            .required('Requerido'),
          direccion: Yup.string().required('Requerido'),
          barrio: Yup.string().notRequired(),
          pais: Yup.string().required('Requerido'),
          departamento: Yup.string().notRequired().nullable(true),
          municipio: Yup.string().notRequired().nullable(true),
          genero: Yup.string().required('Requerido').oneOf(['f', 'm', 'o']),
        })}
        onSubmit={async value => {
          for (const key in value) {
            const val = value[key]
            if (typeof val === 'string') {
              value[key] = val.trim()
            }
          }

          const dataToSend = {
            ...value,
          }

          try {
            const { responseComplete, res } = await useFetch(
              `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/auth/registro`,
              dataToSend,
              false,
            )

            if (res.statusCode === 400) {
              setMessage(`Hubo un error, ${res.message}`)
              setTimeout(() => {
                setMessage('')
              }, 10000)
              return
            }

            if (responseComplete) {
              setMessage('Registro Exitoso')
              setTimeout(() => {
                router.push('/login')
              }, 2000)
            }
          } catch (err) {
            setMessage(`Hubo un error`)
          }
        }}
      >
        {({ values }) => (
          <Form className="px-4 md:px-0">
            {dataRegistroUsuario.map(field => {
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
                <React.Fragment>
                  <TextInput
                    key={field.id}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    className={field.className}
                    placeholder={field.fieldName}
                  />
                </React.Fragment>
              )
            })}

            {countries.length > 0 ? (
              <SelectionInput
                key={'Pais'}
                id={'Pais'}
                label={'Pais'}
                name={'pais'}
                className={
                  "'w-full h-12 px-4 py-2 my-1 text-base border border-color_gray_4 placeholder-color_gray_5 rounded-2xl'"
                }
                options={countries}
                render={country => (
                  <option key={country.id} value={country.id}>
                    {country.nombre}
                  </option>
                )}
              />
            ) : null}

            {values.pais === 'CO-Colombia' && departamentos.length > 0 ? (
              <SelectionInput
                key={'departamento'}
                id={'departamento'}
                label={'Departamento'}
                name={'departamento'}
                className={
                  "'w-full h-12 px-4 py-2 my-1 text-base border border-color_gray_4 placeholder-color_gray_5 rounded-2xl'"
                }
                options={departamentos}
                render={departamento => (
                  <option key={departamento.id} value={departamento.id}>
                    {departamento.nombre}
                  </option>
                )}
              />
            ) : null}

            <GetDep />

            {message !== '' && (
              <div className={message.includes('error') ? ERROR_CLASS : SUCCESS_CLASS}>
                {' '}
                {message}{' '}
              </div>
            )}

            <button
              type="submit"
              className="mt-4 p-2 max-w-full w-full text-2xl font-medium my-4 py-3 bg-color_primary_2_ligth rounded-full text-white"
            >
              Registrarme
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RegistroUsuario
