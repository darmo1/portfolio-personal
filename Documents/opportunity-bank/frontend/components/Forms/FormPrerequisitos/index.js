import { Form, Formik } from 'formik'
import React from 'react'
import SelectionInput from '../SelectionInput'
import { DataPrerequisitos } from './DataPrerequisitos'
import * as Yup from 'yup'
import { useFetch } from '../../../utils/useFetch'
import { useRouter } from 'next/router'

const FormPrerequisitos = props => {
  const router = useRouter()
  const { paso, rol } = router.query
  const [cedula, solicitud] = router.query.usuario

  const initialVal = {
    rango_edad: '',
    estrato_valido: '',
    no_central_riesgo: '',
    no_deudas_vigentes: '',
    ubicacion_negocio: '',
  }

  return (
    <div className="w-full md:w-11/12 mx-auto rounded-lg p-4">
      <Formik
        initialValues={initialVal}
        validationSchema={Yup.object({
          rango_edad: Yup.string()
            .required('requerido')
            .oneOf(['true'], 'Estos son los requisitos mínimos'),
          estrato_valido: Yup.string()
            .required('requerido')
            .oneOf(['true'], 'Estos son los requisitos mínimos'),
          no_central_riesgo: Yup.string()
            .required('requerido')
            .oneOf(['true'], 'Estos son los requisitos mínimos'),
          no_deudas_vigentes: Yup.string()
            .required('requerido')
            .oneOf(['true'], 'Estos son los requisitos mínimos'),
          ubicacion_negocio: Yup.string()
            .required('requerido')
            .oneOf(['true'], 'Estos son los requisitos mínimos'),
        })}
        onSubmit={async value => {
          const obj = {}
          for (const prop in value) {
            obj[prop] = Boolean(value[prop])
          }

          props.setForm(prevState => ({
            ...prevState,
            formulario_individual: {
              ...prevState.formulario_individual,
              datos_prerequisitos: { ...obj },
            },
          }))

          router.push(`/individual/${cedula}/${solicitud || ''}?paso=FDE_2&rol=${rol}`)

          props.setShowPreRequisitos(false)

          // props.setSolicitud_id(res.solicitud_credito)

          // const obj = {}
          // for (const prop in value ){
          //   obj[prop] = Boolean(value[prop])
          // }

          // const dataToSend = {
          //   seccion: "FDE_1",
          //   data: {
          //     ...props.form.formulario_individual.autorizacion_datos_personales,
          //     ...obj,
          //   },
          // };

          //   try {
          //   const { responseComplete , res } = await useFetch(
          //     "https://oportunitybank.azurewebsites.net/api/v1/credito/solicitud",
          //     dataToSend
          //   );

          //   if ( responseComplete ) {
          //     props.setShowPreRequisitos(false);
          //     props.setSolicitud_id(res.solicitud_credito)
          //   } else {
          //       props.setShowPreRequisitos(true);

          //   }
          // } catch (error) {
          //   console.log(error, "error para el envio de la info al backend");
          // }
        }}
      >
        {({ values }) => (
          <Form>
            {DataPrerequisitos.map(field => {
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

            <div className="flex md:block">
              <button
                type="submit"
                className="mt-8 p-4 w-3/5 mx-auto lg:w-2/5 text-lg text-white font-semibold rounded-full bg-color_primary_2_ligth md:float-right"
              >
                Solicitar Crédito
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormPrerequisitos
