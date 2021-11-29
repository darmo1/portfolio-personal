import React from 'react'
import Link from 'next/link'
import { getAdminName } from '../../utils/getAdminName'

export const CardNotification = ({ notification, ctxDataUsuarios = [] }) => {
  const clickNotification = notification => {
    setOpenBoxNotification(false)
    router.push(
      `/backoffice/${notification.deudor.persona.num_identificacion}?sid=${notification.id}`,
    )
  }

  return (
    <div
      className=" bg-white border  my-2 p-2 px-4 flex hover:cursor-pointer hover:bg-blue-200"
      onClick={() => clickNotification(notification)}
    >
      <div>
        <label className="font-semibold text-sm">
          Admin {getAdminName(ctxDataUsuarios, notification)} te asignó una nueva solicitud de
          crédito
        </label>{' '}
        <br />
        <label>solicitud:</label> <small>{notification.id}</small>
        <br />
        <label>Nombre: </label>
        <small>{`${notification.deudor.persona.primer_nombre} ${notification.deudor.persona.primer_apellido}`}</small>
        <br />
        <label>cc:</label> <small>{notification.deudor.persona.num_identificacion}</small>{' '}
        <br />
        <Link
          href={`/backoffice/${notification.deudor.persona.num_identificacion}?sid=${notification.id}`}
        >
          <a className="text-xs font-semibold hover:underline hover:text-blue-500">
            {' '}
            Haz clic aquí para ir a verlo{' '}
          </a>
        </Link>
      </div>
      <div className="flex items-center">
        {notification.asesor.visto ? (
          <div className="w-4 h-4 rounded-full bg-blue-400"> </div>
        ) : null}
      </div>
    </div>
  )
}
