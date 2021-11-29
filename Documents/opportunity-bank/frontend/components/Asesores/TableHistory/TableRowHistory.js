import BtnEstado from '../BtnEstado'
import BtnHistory from './BtnHistory'

// ESTADOS  completado, faltan documentos, por validar, listo para enviar al operador

export const formatDate = date => new Date(date).toLocaleDateString('es', dateOptions)

export const dateOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
}

function TableRowHistory(props) {
  return (
    <tbody className="last:border-b-0 text-sm">
      <tr className="border-b font-section">
        <td className="text-center p-4">{props.cedula}</td>
        <td className="text-center p-4">{props.nombres}</td>
        <td className="text-center p-4">{props.apellidos}</td>
        <td className="text-center p-4">{props.rol}</td>
        <td className="text-center p-4">{props.credito}</td>
        <td className="text-center p-4">{formatDate(props.fecha)}</td>
        <td className="text-center p-4">{<BtnHistory estado={props.estado_solicitud} />} </td>
      </tr>
    </tbody>
  )
}

export default TableRowHistory
