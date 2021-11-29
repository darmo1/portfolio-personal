import React from 'react'
import TextInput from '../../TextInput'
import { DataExpenses } from './DataExpenses'
import { DataIncome } from './DataIncome'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useFetch } from '../../../../utils/useFetch'
import { useRouter } from 'next/router'

const IncomeAndExpense = props => {
  const router = useRouter()
  const { paso, rol } = router.query
  const [cedula, solicitud] = router.query.usuario

  const initialValuesForm = {
    salario: '',
    otros_ingresos: '',
    ingresos_mensuales: '',

    cuota_arrendamiento: '',
    gastos_familiares: '',
    otros_gastos: '',
    gastos_mensuales: '',
  }

  const [initialValues, setInitialValues] = React.useState(initialValuesForm)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(async () => {
    setLoading(true)
    try {
      const URL_GET_STEP_FORM = `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud/${solicitud}?seccion=${paso}`
      const response = await fetch(URL_GET_STEP_FORM)
      const info = await response.json()
      console.log(info, 'from income')

      if (response.status === 404) {
        setInitialValues(initialValues)
        setLoading(false)
      }

      if (response.status === 200) {
        const valuesIncomes = {
          salario: info.ingresos.salario,
          otros_ingresos: info.ingresos.otros_ingresos,
          ingresos_mensuales: info.ingresos.ingresos_mensuales,

          cuota_arrendamiento: info.egresos.cuota_arrendamiento,
          gastos_familiares: info.egresos.gastos_familiares,
          otros_gastos: info.egresos.otros_gastos,
          gastos_mensuales: info.egresos.gastos_mensuales,
        }
        setInitialValues({ ...valuesIncomes })
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleBack = () => {
    router.push(`/codeudor/${cedula}/${props.solicitud_id || solicitud}?paso=FCO_4&rol=${rol}`)
  }

  return loading ? (
    <div>Loading ...</div>
  ) : (
    <div>
      <h2 className="text-xl font-bold mb-4"> Ingresos y Egresos</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          salario: Yup.number().typeError('Debe ser numero').required('requerido').positive(),
          otros_ingresos: Yup.number().typeError('Debe ser numero').notRequired().positive(),
          cuota_arrendamiento: Yup.number()
            .typeError('Debe ser numero')
            .required('requerido')
            .positive(),
          gastos_familiares: Yup.number()
            .typeError('Debe ser numero')
            .required('requerido')
            .positive(),
          otros_gastos: Yup.number().typeError('Debe ser numero').notRequired().positive(),
          gastos_mensuales: Yup.number(),
          ingresos_mensuales: Yup.number(),
        })}
        onSubmit={async value => {
          props.setForm(prevState => ({
            ...prevState,
            formulario_codeudor: {
              ...prevState.formulario_codeudor,
              ingresos_egresos: { ...value },
            },
          }))

          const {
            salario,
            otros_ingresos,
            ingresos_mensuales,

            cuota_arrendamiento,
            gastos_familiares,
            otros_gastos,
            gastos_mensuales,
          } = value

          const dataToSend = {
            seccion: 'FCO_5',
            solicitud_id: props.solicitud_id || solicitud,
            data: {
              ingresos: {
                salario,
                otros_ingresos,
                ingresos_mensuales: salario + otros_ingresos,
              },
              egresos: {
                cuota_arrendamiento,
                gastos_familiares,
                otros_gastos,
                gastos_mensuales: cuota_arrendamiento + gastos_familiares + otros_gastos,
              },
            },
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
                fieldName: 'isCompletedIncomeAndExpense',
              })
              props.setCurrent(props.current + 1)
              router.push(
                `/codeudor/${cedula}/${props.solicitud_id || solicitud}?paso=FCO_6&rol=${rol}`,
              )
            } else {
              props.dispatch({
                type: 'update',
                payload: false,
                fieldName: 'isCompletedIncomeAndExpense',
              })
            }
          } catch (err) {
            console.log(err)
          }
        }}
      >
        {({ values }) => (
          <Form>
            {DataIncome.map(field => {
              return (
                <React.Fragment key={field.id}>
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

            {
              <div>
                <label>Ingresos mensuales</label>
                <br />
                <Field
                  type="number"
                  disabled
                  placeholder="Ingresos Mensuales"
                  name="ingresos_mensuales"
                  value={values.salario + values.otros_ingresos}
                />
                <ErrorMessage name="ingresos_mensuales" />
              </div>
            }
            <br />

            {DataExpenses.map(field => {
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

            {
              <div className="flex items-baseline">
                <label className="text-lg font-bold">Gastos Mensuales: </label>
                <Field
                  type="number"
                  disabled
                  placeholder="Gastos Mensuales"
                  name="gastos_mensuales"
                  className="rounded-lg border-color_gray_2"
                  value={
                    values.cuota_arrendamiento + values.gastos_familiares + values.otros_gastos
                  }
                />
                <ErrorMessage name="gastos_mensuales" />
              </div>
            }

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

export default IncomeAndExpense
