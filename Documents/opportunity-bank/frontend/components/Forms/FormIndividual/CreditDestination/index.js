import * as React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {
  DataDestinationCreditForm,
  DataDescriptionInversion,
} from './DataDestinationCreditForm'
import * as Yup from 'yup'
import SelectionInput from '../../SelectionInput'
import RadioButtom from '../../RadioButtom'
import TextInput from '../../TextInput'
import { useFetch } from '../../../../utils/useFetch'
import { MyTextArea } from '../../TextArea'
import { useRouter } from 'next/router'

const CreditDestinationForm = props => {
  const router = useRouter()
  const { paso, rol } = router.query
  const [cedula, solicitud] = router.query.usuario

  const initialValuesForm = {
    tipo_solicitud: '',
    linea_credito: '',
    tipo_credito: '',
    monto_solicitado: '',
    plazo: '',
    activos: '',
    capital_trabajo: '',
    descripcion: '',
  }

  const [initialValues, setInitialValues] = React.useState(initialValuesForm)
  const [loading, setLoading] = React.useState(true)

  const [messageError, setMessageError] = React.useState(false)
  const [hide, setHide] = React.useState(false)

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
      `/individual/${cedula}/${props.solicitud_id || solicitud}?paso=FDE_2&rol=${rol}`,
    )
  }

  return loading ? (
    <div>Loading ...</div>
  ) : (
    <div className={`${hide && 'hidden'} mb-8`}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          tipo_solicitud: Yup.string()
            .required('requerido')
            .oneOf(['Creacion', 'Fortalecimiento']),
          linea_credito: Yup.string()
            .required('requerido')
            .oneOf([
              'Microempresarial',
              'Capital Semilla',
              'Agroindustrial',
              'Venteros ambulantes',
              'Egresados',
            ]),
          tipo_credito: Yup.string().required('requerido').oneOf(['Nuevo', 'Renovación']),
          monto_solicitado: Yup.number()
            .typeError('Debe ser un número')
            .required('requerido')
            .positive(' Debe ser mayor a 0')
            .test('monto_solicitado', '', function (monto_solicitado, context) {
              const SMLV = 908526
              const validarCantidadPrestamos = AmountCredit(context.parent.linea_credito)
              if (
                monto_solicitado >= SMLV &&
                monto_solicitado <= validarCantidadPrestamos?.max_prestamo
              ) {
                return true
              } else {
                return this.createError({
                  message: `Para este crédito se permite ${validarCantidadPrestamos?.label}`,
                })
              }
            })
            .test(
              'monto_sum',
              'El monto solicitado debe ser igual a la suma de los activos y el capital de trabajo',
              function (monto_solicitado, context) {
                return (
                  monto_solicitado == context.parent.activos + context.parent.capital_trabajo
                )
              },
            ),
          plazo: Yup.number()
            .typeError('Debe ser un número')
            .required('requerido')
            .positive(' Debe ser mayor a 0')
            .test('plazo', '', function (plazo, context) {
              const MIN_PLAZO = 1
              const validarCantidadPlazo = plazoCredito(context.parent.linea_credito)
              if (plazo >= MIN_PLAZO && plazo <= validarCantidadPlazo?.max_prestamo) {
                return true
              } else {
                return this.createError({ message: `${validarCantidadPlazo?.label}` })
              }
            }),
          activos: Yup.number()
            .typeError('Debe ser un número')
            .required('requerido')
            .positive(' Debe ser mayor a 0'),
          // .test('activos', '', function( param, ctx ){

          // }),
          capital_trabajo: Yup.number()
            .typeError('Debe ser un número')
            .required('requerido')
            .positive(' Debe ser mayor a 0'),
          descripcion: Yup.string()
            .required('requerido')
            .max(100, 'No puede exceder a 100 caractéres'),
        })}
        onSubmit={async value => {
          props.setForm(prevState => ({
            ...prevState,
            formulario_individual: {
              ...prevState.formulario_individual,
              destino_credito: { ...value },
            },
          }))

          const dataToSend = {
            seccion: 'FDE_3',
            solicitud_id: props.solicitud_id || solicitud,
            data: { ...value },
          }

          try {
            const { responseComplete } = await useFetch(
              `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud`,
              dataToSend,
            )
            if (responseComplete) {
              props.setIsCompletedCreditDestination(true)
              props.setCurrent(props.current + 1)
              router.push(
                `/individual/${cedula}/${
                  props.solicitud_id || solicitud
                }?paso=FDE_4&rol=${rol}`,
              )
              //setHide(true)
            } else {
              props.setIsCompletedCreditDestination(false)
            }
          } catch (err) {
            console.log(err)
          }
        }}
      >
        {({ values }) => (
          <Form>
            {DataDestinationCreditForm.map(field => {
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
            })}
            <div className="mb-6">
              <label className="mb-2">
                {' '}
                Monto solicitado
                <TextInput
                  type="number"
                  name="monto_solicitado"
                  className="w-full h-10 border border-gray-400"
                  min="0"
                />
              </label>
            </div>

            <label>
              {' '}
              Plazo (meses)
              <TextInput
                type="number"
                name="plazo"
                className="w-full block h-10 border border-gray-400 px-4"
                min="2"
              />
            </label>

            {DataDescriptionInversion.map(field => {
              if (field.type === 'text-area') {
                return (
                  <MyTextArea
                    key={field.id}
                    label={field.fieldName}
                    name={field.name}
                    className={field.className}
                    type={field.type}
                  />
                )
              }

              return (
                <TextInput
                  key={field.id}
                  label={field.fieldName}
                  name={field.name}
                  className={field.className}
                  type={field.type}
                />
              )
            })}

            <div className="mb-6">
              <label className="mb-2">
                {' '}
                Activos - ¿Cuánto vas a invertir en equipos y máquinas?{' '}
                <TextInput
                  type="number"
                  name="activos"
                  className="w-full block h-10 border border-gray-400 px-4"
                  min="2"
                />
              </label>
            </div>
            <React.Fragment>
              <div className="">
                <label className="mb-2">
                  Capital de trabajo - ¿Cuánto vas a invertir en insumos o materia prima?
                  <TextInput
                    type="number"
                    name="capital_trabajo"
                    className="w-full block h-10 border border-gray-400 px-4"
                    min="2"
                  />
                </label>
              </div>
            </React.Fragment>
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

            {messageError ? <p>{`Algo salió mal :(`}</p> : null}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreditDestinationForm

function AmountCredit(credit) {
  const SMLV = 908526
  let MAX_PRESTAMO

  switch (credit) {
    case 'Microempresarial':
      MAX_PRESTAMO = SMLV * 10
      return {
        max_prestamo: Number(MAX_PRESTAMO),
        label: 'mínimo 1 SMLV - hasta 10 SMLV',
      }

    case 'Capital Semilla':
      MAX_PRESTAMO = SMLV * 22
      return {
        max_prestamo: Number(MAX_PRESTAMO),
        label: 'mínimo 1 SMLV - hasta 22 SMLV',
      }

    case 'Agroindustrial':
      MAX_PRESTAMO = SMLV * 22
      return {
        max_prestamo: Number(MAX_PRESTAMO),
        label: 'mínimo 1 SMLV - hasta 22 SMLV',
      }

    case 'Venteros ambulantes':
      MAX_PRESTAMO = 5000000
      return {
        max_prestamo: Number(MAX_PRESTAMO),
        label: 'mínimo 1 SMLV - hasta  5.000.000',
      }

    case 'Egresados':
      MAX_PRESTAMO = SMLV * 22
      return {
        max_prestamo: Number(MAX_PRESTAMO),
        label: 'mínimo 1 SMLV - hasta 22 SMLV',
      }
  }
}

function plazoCredito(creditName) {
  switch (creditName) {
    case 'Microempresarial':
      return {
        max_prestamo: 36,
        label: 'hasta 36 cuotas',
      }

    case 'Capital Semilla':
      return {
        max_prestamo: 36,
        label: 'hasta 36 cuotas',
      }

    case 'Agroindustrial':
      return {
        max_prestamo: 48,
        label: 'hasta 48 cuotas',
      }

    case 'Venteros ambulantes':
      return {
        max_prestamo: 36,
        label: 'hasta  36cuotas',
      }

    case 'Egresados':
      return {
        max_prestamo: 48,
        label: 'hasta 48 cuotas',
      }
  }
}
