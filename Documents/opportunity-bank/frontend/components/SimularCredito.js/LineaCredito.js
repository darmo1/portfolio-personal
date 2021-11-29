import { Form, Formik } from 'formik'
import * as React from 'react'
import SectionTitle from '../../components/SectionTitle'
import SelectionInput from '../Forms/SelectionInput'
import { dataLineaCredito } from './dataLineaCredito'
import Link from 'next/link'
import Title from '../Title'
import * as Yup from 'yup'
import CantidadYCuotasDePrestamos from './CantidadYCuotasDePrestamos'
import { MontoCredito } from '../../utils/MontoCredito'
import { PlazoCredito } from '../../utils/PlazoCredito'
import TextInput from '../Forms/TextInput'
import { useFormikContext } from 'formik'

const LineaCredito = props => {
  const handleChange = (e, setValues) => {
    const selected = e.target.value
    props.setValorCuota(0)
    props.setSimulationTable(null)
    setValues({ linea_credito: selected, cuotas: '', monto: '' })
  }

  return (
    <div className="w-11/12 md:w-3/5 mx-auto">
      <Title>Elige una línea de crédito </Title>
      <Formik
        initialValues={{
          linea_credito: '',
          cuotas: '',
          monto: '',
        }}
        validationSchema={Yup.object({
          linea_credito: Yup.string()
            .required('requerido')
            .oneOf([
              'Microempresarial',
              'Capital Semilla',
              'Agroindustrial',
              'Venteros ambulantes',
              'Egresados',
            ]),
          cuotas: Yup.number().required('requerido').positive().integer().min(2),
          monto: Yup.number()
            .required('requerido')
            .positive()
            .min(908526, 'El valor debe ser superior al salario mínimo.')
            .when('linea_credito', (linea_credito, schema) => {
              const message = 'Este valor excede el monto máximo.'
              switch (linea_credito) {
                case 'Microempresarial':
                  return schema.max(9085260, message)
                case 'Capital Semilla':
                  return schema.max(19987572, message)
                case 'Agroindustrial':
                  return schema.max(19987572, message)
                case 'Venteros ambulantes':
                  return schema.max(5000000, message)
                case 'Egresados':
                  return schema.max(19987572, message)
              }
            }),
        })}
        onSubmit={value => {
          props.setValoresSimulacion(prevState => ({
            ...prevState,
            ...value,
          }))
        }}
      >
        {({ values, setValues }) => (
          <Form>
            <div onChange={e => handleChange(e, setValues)}>
              <SelectionInput
                key={dataLineaCredito[0].id}
                id={dataLineaCredito[0].id}
                name={dataLineaCredito[0].name}
                className={dataLineaCredito[0].className}
                options={dataLineaCredito[0].options}
                render={option => (
                  <option key={option.id} value={option.name}>
                    {option.fieldName}
                  </option>
                )}
              />
            </div>

            {values.linea_credito !== '' ? (
              <React.Fragment>
                <CantidadYCuotasDePrestamos lineaCredito={values.linea_credito} />

                <div className="border bg-white rounded-lg p-8">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-center pb-4 md:pb-0 font-semibold text-color_primary_2_ligth text-xl">
                      ¿En cuántas cuotas desearía pagar?
                    </p>
                    <SelectionInput
                      key={'cuotas'}
                      label=""
                      name="cuotas"
                      className="h-10 border font-semibold pl-4 border-color_gray_4 rounded-lg"
                      options={numeroCuotas(PlazoCredito(values.linea_credito))}
                      render={(option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      )}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                    <p className="text-center font-semibold text-color_primary_2_ligth text-xl mb-4 md:mb-0">
                      ¿Cuánto dinero desea prestar?
                    </p>
                    <TextInput
                      key={'monto'}
                      label={''}
                      name={'monto'}
                      type={'number'}
                      className={
                        'text-center font-semibold h-10 border border-color_gray_5 rounded-lg'
                      }
                    />
                  </div>
                </div>
              </React.Fragment>
            ) : null}

            {values.cuotas !== '' && values.monto !== '' && (
              <button
                type="submit"
                className="flex mx-auto py-2 mt-6 px-6 text-white text-sm font-semibold rounded-full bg-color_primary_1_ligth"
              >
                SIMULAR MI CRÉDITO
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LineaCredito
