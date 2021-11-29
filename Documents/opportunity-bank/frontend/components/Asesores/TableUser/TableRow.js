import React from 'react'
import { useAuthContext } from '../../../auth-context'
import { CheckedSolicitud } from '../../CheckedSolicitud'
import { ListAsesores } from '../../ListAsesores'
import Acciones from '../Acciones'
import BtnEstado from '../BtnEstado'

// ESTADOS  completado, faltan documentos, por validar, listo para enviar al operador

function TableRow(props) {
  const ROLES = ['ADMINISTRADOR', 'SUPERADMINISTRADOR']
  const { rol } = useAuthContext()

  return (
    <tbody className="last:border-b-0 text-sm">
      <tr className="border-b font-section">
        {ROLES.includes(rol) ? (
          <td className="text-center p-4">
            <CheckedSolicitud
              solicitudId={props.sid}
              solicitudPorAsesor={props.solicitudPorAsesor}
              setsolicitudPorAsesor={props.setsolicitudPorAsesor}
            />
          </td>
        ) : null}
        {ROLES.includes(rol) ? (
          <td className="text-center p-4">
            <ListAsesores
              usuarios={props.usuarios}
              asesor={props.asesor}
              solicitudId={props.sid}
              solicitudPorAsesor={props.solicitudPorAsesor}
              setsolicitudPorAsesor={props.setsolicitudPorAsesor}
            />
          </td>
        ) : null}
        <td className="text-center p-4">{props.cedula}</td>
        <td className="text-center p-4">{props.nombres}</td>
        <td className="text-center p-4">{props.apellidos}</td>
        <td className="text-center p-4">{props.rol}</td>
        <td className="text-center p-4">{props.credito}</td>
        <td className="text-center p-4">{<BtnEstado estado={props.estado_solicitud} />} </td>
        <td className="text-center p-4">
          <Acciones cedula={props.cedula} id={props.sid} />
        </td>
      </tr>
    </tbody>
  )
}

export default TableRow
