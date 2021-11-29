import * as React from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'

const HabbeasData = props => {
  return (
    <div className="bg-gray-100 max-w-4xl mx-auto rounded-lg p-8">
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
            formulario_codeudor: {
              ...prevState.formulario_codeudor,
              autorizacion_datos_personales: { ...value },
            },
          }))

          props.setShowModal(false)
        }}
      >
        {({ values }) => {
          return (
            <Form>
              <section>
                <h2 className="text-2xl text-center my-4">
                  Autorización para el tratamiento de datos personales
                </h2>
                <p className="text-xs text-justify">
                  Por medio de la presente, manifiesto que autorizo al Municipio de Medellín
                  para el tratamiento de mis datos personales, bajo las condiciones que me son
                  informadas en los siguientes términos: EL Municipio de Medellín, identificado
                  con NIT No. 890.905.211-1, actuará como Responsable del tratamiento de los
                  datos, los que podrá recolectar, usar y tratar conforme a su Política de
                  Tratamiento de Datos Personales, que está disponible en www.medellin.gov.co,
                  la que se reserva el derecho de modificar en cualquier momento, de lo cual
                  informará a través de dicho sitio web. Entiendo que es de carácter facultativo
                  responder preguntas que versen sobre datos sensibles (aquellos que afectan mi
                  intimidad) o de menores de edad. No obstante, de proporcionarlos, estoy
                  autorizando expresamente su Tratamiento. Declaro que conozco mis derechos como
                  titular, especialmente los de conocer, actualizar, rectificar y suprimir mi
                  información personal, consultar mi información, solicitar prueba de esta
                  autorización, así como el derecho a revocar el consentimiento otorgado y que
                  puedo ejercer mis derechos a través de los canales dispuestos por el Municipio
                  de Medellín, a saber, el portal web www.medellin.gov.co, la Línea de Atención
                  4444144, en el Centro de Servicios a la Ciudadanía, ubicado en la Calle 44 N
                  52 – 165 Centro Administrativo la Alpujarra, o en una de sus sedes externas,
                  es decir, Casas de Gobierno, Mas cerca y Centros de Servicios al Ciudadano
                  (pueden consultarse en la Línea de Atención). Así, autorizo de manera
                  voluntaria, previa, explícita, informada e inequívoca al Municipio de Medellín
                  para tratar mis datos y para que la información por mi suministrada sea
                  incluida en las bases de datos de esta entidad, para llevar a cabo acciones
                  tendientes al cumplimiento de su objeto misional y, específicamente, para el
                  desarrollo del objetivo del Programa Social Banco de los Pobres,
                  fundamentalmente contribuir al mejoramiento de la calidad de vida de los
                  habitantes del Municipio de Medellín a través de la concesión de microcréditos
                  por medio de los cuales se financien proyectos rentables y sostenibles en el
                  tiempo, que permitan el desarrollo de microempresas y la generación de empleo
                  productivo, fortalecer la cultura de la legalidad, brindar acompañamiento
                  financiero y contribuir con el desarrollo de los demás programas y proyectos
                  de la Administración Municipal. Igualmente autorizo para compartir mis datos
                  personales con terceros aliados o contratistas del Municipio de Medellín, con
                  el objeto de que le presten servicios a éste o en nombre de éste, o para la
                  ejecución de estrategias o programas conjuntos, así como con otras entidades
                  del orden departamental y nacional y, concretamente, con los operadores que
                  ofrezcan, administren y gestionen las líneas de crédito del Banco de los
                  Pobres, o a quien represente sus derechos u ostente la calidad de acreedor, a
                  quienes conjuntamente autorizo para que consulten, reporten, modifiquen,
                  actualicen y rectifiquen, mi información comercial, financiera y crediticia
                  ante las centrales de riesgo crediticio, o ante cualquier otra entidad que
                  administre bases de datos con los fines legalmente definidos para este tipo de
                  servicios. Declaro que la información suministrada es correcta, veraz,
                  verificable y actualizada, a la fecha de suscripción de la presente
                  autorización, y me comprometo a actualizarla inmediatamente en caso de alguna
                  modificación. Igualmente que esta solicitud es exacta en todas sus partes y en
                  caso de comprobarse alguna inexactitud será causal de rechazo; así mismo
                  declaro que he sido informado sobre las característi- cas, tarifas, garantías,
                  seguros y demás condiciones de los productos y/o servicios que solicito y que
                  podré consultarlas directamente ante la entidad que ofrece el producto.
                </p>
              </section>
              <br />

              <label className="font-semibold flex justify-center">
                <Field type="checkbox" name="terminos_condiciones" className="mr-4" />
                ¿Estoy de acuerdo con los términos y condiciones?
              </label>
              <ErrorMessage
                name="terminos_condiciones"
                component="div"
                className="text-xs text-red-500 flex justify-center"
              />

              <br />

              <p className="mt-4 text-xs text-justify">
                <b>Codeudor:</b> El cual debe estar entre los 18 y 75 años y que resida en el
                territorio nacional. Este codeudor no podrá presentar ningún tipo de mora o
                reporte en las centrales de riesgo. El codeudor no podrá se codeudor de dos o
                más personas en el Banco de los Pobres y tampoco pordrá solicitar crédito como
                titular con el mismo. 1. Codeudor con contrato laboral: Se aceptarán codeudores
                que estén vinculados mediante contratos término indefinido, con un ingreso
                mínimo de dos (2) SMLMV. Para acreditar lo anterior deberá presentar los
                siguientes documentos: a. Fotocopia ampliada de la cédula de ciudadanía al 200%.
                b. Certificación laboral expedida por la empresa o entidad en donde labora,
                especificando el tipo de vinculación y salario, no superior a (30) días de
                expedición. c. Copia de las dos últimas colillas de pago. 2. Codeudor con
                propiedad raíz: a. Certificado de tradición y libertad del inmueble. Este
                certificado no debe tener más de (30) días de expedición. La propiedad raíz
                deberá estar ubicada en el Departamento de Antioquia. b. Fotocopia ampliada de
                la cédula de ciudadanía al 200%. c. Fotocopia del recibo del impuesto predial.
                d. El inmueble no podrá tener Afectación a Vivienda Familiar, Patrimonio de
                Familia o presentar Embargos. PARÁGRAFO: Cuando el crédito sea superior a 10
                (diez) SMLMV, se requiere un codeudor que posea una propiedad raíz y su avalúo
                catastral tenga un valor superior de diecisiete (17) SMLMV.
              </p>

              <button
                type="submit"
                className="mt-4 p-2 w-1/3 text-white rounded-full bg-color_primary_2_ligth flex justify-center mx-auto "
              >
                Siguiente
              </button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default HabbeasData
