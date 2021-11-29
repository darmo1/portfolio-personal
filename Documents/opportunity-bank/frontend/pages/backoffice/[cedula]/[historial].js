import React from 'react'
import TableHistory from '../../../components/Asesores/TableHistory'
import TableRowHistory from '../../../components/Asesores/TableHistory/TableRowHistory'
import Title from '../../../components/Title'
import LayoutAsesor from '../../../Layout/LayoutAsesor'

const Historial = ({ getHistorialSolicitudes, cedula }) => {
  const nombres =
    getHistorialSolicitudes[0]?.codeudor?.persona.num_identificacion === Number(cedula)
      ? `${getHistorialSolicitudes[0]?.codeudor?.persona.primer_nombre} ${
          getHistorialSolicitudes[0]?.codeudor?.persona.segundo_nombre || ''
        }`
      : getHistorialSolicitudes[0]?.deudor?.persona.num_identificacion === Number(cedula)
      ? `${getHistorialSolicitudes[0]?.deudor?.persona.primer_nombre} ${
          getHistorialSolicitudes[0]?.deudor?.persona.segundo_nombre || ''
        }`
      : ''

  const apellidos =
    getHistorialSolicitudes[0]?.codeudor?.persona.num_identificacion === Number(cedula)
      ? `${getHistorialSolicitudes[0]?.codeudor?.persona.primer_apellido} ${
          getHistorialSolicitudes[0]?.codeudor?.persona.segundo_apellido || ''
        }`
      : getHistorialSolicitudes[0]?.deudor?.persona.num_identificacion === Number(cedula)
      ? `${getHistorialSolicitudes[0]?.deudor?.persona.primer_apellido} ${
          getHistorialSolicitudes[0]?.deudor?.persona.segundo_apellido || ''
        }`
      : ''

  const rol =
    getHistorialSolicitudes[0]?.codeudor?.persona.num_identificacion === Number(cedula)
      ? `${getHistorialSolicitudes[0]?.codeudor?.tipo}`
      : getHistorialSolicitudes[0]?.deudor?.persona.num_identificacion === Number(cedula)
      ? `${getHistorialSolicitudes[0]?.deudor?.tipo}`
      : ''

  const credito = getHistorialSolicitudes[0]?.tipo

  return (
    <LayoutAsesor>
      <div>
        <Title>Historial</Title>
        <br />

        {getHistorialSolicitudes.length > 0 ? (
          <>
            <TableHistory>
              {getHistorialSolicitudes[0]?.estado_solicitud
                .map((sol, index) => {
                  return (
                    <TableRowHistory
                      key={index}
                      cedula={cedula}
                      nombres={nombres}
                      apellidos={apellidos}
                      rol={rol}
                      credito={credito}
                      fecha={sol.fecha_actualizacion}
                      estado_solicitud={sol}
                    />
                  )
                })
                .reverse()}
            </TableHistory>
          </>
        ) : (
          <div>No hay historial para mostrar, intenta más tarde</div>
        )}
      </div>
    </LayoutAsesor>
  )
}

export default Historial

export async function getServerSideProps(context) {
  const { cedula } = context.params
  const { sid } = context.query
  // const url_get_solicitud =  `https://oportunitybank.azurewebsites.net/api/v1/credito/solicitud/usuario/${cedula}`
  const url_get_solicitud = `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud/usuario/${cedula}`
  let getHistorialSolicitudes
  try {
    const response = await fetch(url_get_solicitud)
    const dataSolicitud = await response.json()

    if (!dataSolicitud.length) {
      getHistorialSolicitudes = []
      return
    }

    getHistorialSolicitudes = dataSolicitud.filter(sol => sol.id === sid)
  } catch (error) {}

  return {
    props: {
      getHistorialSolicitudes,
      cedula,
    },
  }
}
