import * as React from 'react'
import { Formik, Form } from 'formik'
import { DataInfoBusiness } from './DataInfoBusiness'
import * as Yup from 'yup'

import RadioButtom from '../../RadioButtom'
import TextInput from '../../TextInput'
import SelectionInput from '../../SelectionInput'
import { useFetch } from '../../../../utils/useFetch'
import { ListaComunasBarriosMedellin } from '../../../../utils/ListaComunasBarriosMedellin'
import DateInput from '../../DateInput'
import { useRouter } from 'next/router'

const InfoBusiness = props => {
  const router = useRouter()
  const { paso, rol } = router.query
  const [cedula, solicitud] = router.query.usuario

  const [hide, setHide] = React.useState(false)
  const initialValuesForm = {
    nombre_negocio: '',
    comuna: '',
    direccion: '',
    fecha_creacion: '',
    telefono: '',
    macrosector: '',
    subsector: '',
    tipo_persona: '',
    num_empl_permanentes: '',
    num_empl_eventuales: '',
    local: '',
    nombre_arrendador: '',
    telefono_arrendador: '',
  }

  const comunasObj = {}
  ListaComunasBarriosMedellin.forEach(el => {
    comunasObj[el.COMUNA] = el.NOMBRE_COMUNA
  })

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
      `/individual/${cedula}/${props.solicitud_id || solicitud}?paso=FDE_6&rol=${rol}`,
    )
  }

  return loading ? (
    <div>Loading ...</div>
  ) : (
    <div className={`${hide && 'hidden'} mb-8`}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          nombre_negocio: Yup.string().required('requerido'),
          comuna: Yup.string().required('requerido'),
          direccion: Yup.string().required('requerido'),
          fecha_creacion: Yup.date()
            .required('requerido')
            .max(new Date().toISOString().slice(0, 10), 'Ingresa una fecha válida.'),
          telefono: Yup.string()
            .min(7, 'Ingresa un número de teléfono válido.')
            .max(20, 'Ingresa un número de teléfono válido.'),
          macrosector: Yup.string()
            .required('requerido')
            .oneOf(['Comercio', 'Producción', 'Servicios', 'Agropecuario']),
          subsector: Yup.string()
            .required('requerido')
            .oneOf([
              'Alimentos',
              'Aseo',
              'Artesanos',
              'Textil',
              'Madera',
              'Belleza',
              'Tecnología',
              'Mantenimiento y reparación',
              'Tiendas',
              'Transporte',
              'Miscelaneas',
              'Depositos y Ferretería',
              'Licores',
              'Ventas por Catalogo',
              'Mensajería',
              'Ventas Ambulantes',
              'Otros',
            ]),
          tipo_persona: Yup.string().required('requerido').oneOf(['Natural', 'Juridica']),
          num_empl_permanentes: Yup.number()
            .required('requerido')
            .typeError('Debe ser un numero'),
          num_empl_eventuales: Yup.number()
            .required('requerido')
            .typeError('Debe ser un numero'),
          local: Yup.string().required('requerido').oneOf(['Propio', 'Arrendado']),
          nombre_arrendador: Yup.string().nullable(true),
          numero_arrendador: Yup.number()
            .nullable(true)
            .typeError('Debe ser número')
            .positive(),
        })}
        onSubmit={async value => {
          props.setForm(prevState => ({
            ...prevState,
            formulario_individual: {
              ...prevState.formulario_individual,
              informacion_negocio: { ...value },
            },
          }))

          const dataToSend = {
            seccion: 'FDE_7',
            solicitud_id: props.solicitud_id || solicitud,
          }

          if (value.local !== 'Arrendado') {
            const { nombre_arrendador, telefono_arrendador, telefono, ...dataBusiness } = value
            dataToSend.data = {
              ...dataBusiness,
              nombre_arrendador: null,
              telefono_arrendador: null,
              telefono: Number(telefono),
            }
          } else {
            const { telefono_arrendador, telefono, ...dataBusiness } = value
            dataToSend.data = {
              ...dataBusiness,
              telefono_arrendador: Number(telefono_arrendador),
              telefono: Number(telefono),
            }
          }

          try {
            const { responseComplete } = await useFetch(
              `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud`,
              dataToSend,
            )

            if (responseComplete) {
              props.setIsCompletedInfoBusiness(true)
              props.setCurrent(props.current + 1)
              router.push(
                `/individual/${cedula}/${
                  props.solicitud_id || solicitud
                }?paso=FDE_8&rol=${rol}`,
              )
              //setHide(true)
            } else {
              props.setIsCompletedInfoBusiness(false)
            }
          } catch (error) {
            console.log(error)
          }
        }}
      >
        {({ values }) => (
          <Form>
            {
              <SelectionInput
                key={'comuna'}
                id={'comuna'}
                label={'Comuna donde está el negocio'}
                name={'comuna'}
                className={'h-10 border border-gray-400 px-4'}
                options={Object.values(comunasObj)}
                render={(option, index) => (
                  <option key={index} value={`${option}`}>
                    {`${option}`}
                  </option>
                )}
              />
            }

            {DataInfoBusiness.map(field => {
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

            {values.local === 'Arrendado' ? (
              <div>
                <TextInput
                  key="nombre_arrendador"
                  label={'Nombre del arrendador'}
                  name={'nombre_arrendador'}
                  type="text"
                  className="h-10 border border-gray-400 px-4 w-full"
                />

                <TextInput
                  key={'telefono_arrendador'}
                  label={'Telefono'}
                  name={'telefono_arrendador'}
                  type="number"
                  className="h-10 border border-gray-400 px-4 w-full"
                />
              </div>
            ) : null}

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

export default InfoBusiness
