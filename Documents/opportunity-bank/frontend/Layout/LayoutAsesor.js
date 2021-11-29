import React from 'react'
import Btn from '../components/Asesores/Btn'
import Link from 'next/link'
import Title from '../components/Title'
import { Notification } from '../components/notification'
import { NotificationProvider } from '../notification-context.js'

const LayoutAsesor = ({ children }) => {
  return (
    <section className="bg-gray-section">
      <div>
        <Title> Asesor </Title>
      </div>
      <div className="main-wrapper bg-dark-gray flex flex-col mx-auto my-4 justify-between md:flex-row">
        <div className="max-w-1/6 min-h-full bg-color_gray_2 px-4">
          <Btn
            href="/backoffice"
            name="Solicitudes de crédito"
            icon_url="/icon-solicitud-backoffice.svg"
          />
          {/* <Btn href="#" name="Administrador" icon_url="/icon-gestor-backoffice.svg" /> */}
          <Btn href="/switch" name="Crear solicitud" icon_url="/icon-config-backoffice.svg" />
          <Btn
            href="/backoffice/solicitudes-asignadas"
            name="Solicitudes Asignadas"
            icon_url="/icon-config-backoffice.svg"
          />
        </div>
        <div className="md:w-3/4 p-4">
          <nav className="flex justify-between bg-dark-gray items-center">
            <small className="font-semibold w-max">
              <Link href="/backoffice">
                <a className="hover:text-blue-500">{`>Backoffice`}</a>
              </Link>
            </small>
            <Notification />
          </nav>
          {children}
        </div>
      </div>
    </section>
  )
}

export default LayoutAsesor
