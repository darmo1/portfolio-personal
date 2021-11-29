import { Formik, Form, ErrorMessage, Field } from 'formik'
import { useRouter } from 'next/router'
import * as React from 'react'
import * as Yup from 'yup'
import { useFetch } from '../../../../utils/useFetch'

const HabbeasData = props => {
  const router = useRouter()
  const { paso, rol } = router.query
  const [cedula, solicitud] = router.query.usuario
  return (
    <div className="bg-gray-100 max-w-4xl mx-auto rounded-lg p-8 ">
      <Formik
        initialValues={{
          terminos_condiciones: false,
        }}
        validationSchema={Yup.object({
          terminos_condiciones: Yup.boolean().oneOf(
            [true],
            'Debes aceptar los terminos y condiciones',
          ),
        })}
        onSubmit={async value => {
          props.setForm(prevState => ({
            ...prevState,
            formulario_individual: {
              ...prevState.formulario_individual,
              autorizacion_datos_personales: { ...value },
            },
          }))

          props.setShowModal(false)
          router.push(`/individual/${cedula}/${solicitud || ''}?paso=FDE_1&rol=${rol}`)
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <section className="flex flex-col ">
                <h2 className="text-2xl text-center my-8">
                  Autorización para el tratamiento de datos personales del Banco
                </h2>
                <p className="text-justify">
                  Autorizo al Municipio de Medellín, identificado con NIT Nº 890.905.211-1, como
                  Responsable para tratar mis datos personales conforme a su Política de
                  Tratamiento de Datos Personales, disponible en www.medellin.gov.co, para que
                  sean incluidos en sus bases de datos, para los siguientes fines: efectuar las
                  gestiones pertinentes para el desarrollo de las funciones legales y
                  cumplimiento del objeto misional del programa Banco de los Pobres adscrito a
                  la Secretaría de Desarrollo Económico, cuyo propósito es crear de mecanismos
                  financieros flexibles que permitan promover las actividades productivas,
                  comerciales y de servicios de la ciudad, apoyándose en entidades nacionales e
                  internacionales que ejecutan actividades tendientes a desarrollar y operar
                  líneas de créditos encaminadas a financiar proyectos individuales y
                  colectivos. En esa medida, declaro que la información suministrada es
                  correcta, veraz, verificable y actualizada. Igualmente autorizo al Municipio
                  de Medellín, para contactarme vía WhatsApp, correo electrónico, mensajes de
                  texto, llamadas telefónicas a mis números fijo y celular, comunicaciones
                  escritas u otros medios de comunicación; para compartir mis datos personales
                  con terceros aliados o contratistas del Municipio de Medellín, así como con
                  otras entidades del orden municipal, departamental y nacional, para garantizar
                  la prestación de sus servicios o para la ejecución de planes, programas,
                  proyectos o estrategias conjuntas. Asimismo, declaro que conozco que no es
                  obligatorio responder preguntas relacionadas con datos sensibles o de menores
                  de edad (en calidad de representante legal) y que, en caso de proporcionarlos,
                  estoy autorizando expresamente su Tratamiento y que tengo derecho a conocer,
                  consultar, actualizar, rectificar y suprimir mi información, solicitar prueba
                  de esta autorización y revocarla (cuando ello sea posible y no se requieran
                  los datos en virtud de las funciones legales del Municipio de Medellín),
                  derechos que se me ha informado puedo ejercer a través de los canales: portal
                  web www.medellin.gov.co y presencial en el Centro de Servicio a la Ciudadanía,
                  MasCercas y Casas de Gobierno.
                </p>
              </section>
              <br />

              <div className="flex flex-col items-center">
                <label>
                  <Field type="checkbox" name="terminos_condiciones" className="mr-4" />
                  ¿Estoy de acuerdo con los términos y condiciones?
                </label>

                <ErrorMessage name="terminos_condiciones" component="div" className="" />

                <br />
                <button
                  type="submit"
                  className="  mt-4 p-2 w-1/2 text-white rounded-full bg-color_primary_2_ligth"
                >
                  Siguiente
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default HabbeasData
