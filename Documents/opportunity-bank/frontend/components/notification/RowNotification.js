import React from 'react'
import { getAdminName } from '../../utils/getAdminName'
import Link from 'next/link'

export const RowNotification = ({ ctxDataUsuarios, notification }) => {
  return (
    <tbody className="last:border-b-0 text-sm">
      <tr className="border-b font-section">
        <td className="text-center p-4">{`Admin ${getAdminName(
          ctxDataUsuarios,
          notification,
        )}`}</td>
        <td className="text-center p-4">{notification.id}</td>
        <td className="text-center p-4">{`${notification.deudor.persona.primer_nombre}`}</td>
        <td className="text-center p-4">{`${notification.deudor.persona.primer_apellido}`}</td>
        <td className="text-center p-4">{notification.deudor.persona.num_identificacion}</td>
        <td className="text-center p-4">{formatDate(notification.asesor.fecha_asignacion)}</td>
        <td className="text-center p-4">
          {notification.asesor.visto ? (
            <div className="w-4 h-4 rounded-full bg-blue-400"> </div>
          ) : (
            'visto'
          )}
        </td>

        <td className="text-center p-4">
          {
            <Link
              href={`/backoffice/${notification.deudor.persona.num_identificacion}?sid=${notification.id}`}
            >
              <a className="text-xs font-semibold hover:underline hover:text-blue-500">
                {' '}
                Haz clic aquí{' '}
              </a>
            </Link>
          }{' '}
        </td>
      </tr>
    </tbody>
  )
}

export const formatDate = date => new Date(date).toLocaleDateString('es', dateOptions)

export const dateOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
}
