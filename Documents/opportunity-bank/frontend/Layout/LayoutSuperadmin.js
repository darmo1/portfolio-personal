import React from 'react'
import Btn from '../components/Asesores/Btn'
import Link from 'next/link'
import Title from '../components/Title'

const LayoutSuperAdmin = ({ children }) => {
  return (
    <section className="bg-gray-section">
      <Title> SuperAdmin </Title>
      <div className="main-wrapper bg-dark-gray flex flex-col mx-auto my-4 justify-between md:flex-row">
        <div className="max-w-1/6 min-h-full bg-color_gray_2 px-4">
          <Btn
            href="/backoffice"
            name="Créditos usuarios"
            icon_url="/icon-solicitud-backoffice.svg"
          />
          <Btn href="/backoffice/roles" name="Roles" icon_url="/icon-gestor-backoffice.svg" />
          <Btn
            href="/backoffice/configuracion-interes"
            name="Configuracion interés"
            icon_url="/icon-interes-backoffice.svg"
          />
          <Btn href="/switch" name="Crear solicitud" icon_url="/icon-config-backoffice.svg" />
        </div>
        <div className="md:w-3/4 p-4">
          <small className="font-semibold hover:text-blue-500">
            <Link href="/backoffice">
              <a>{`> Backoffice`}</a>
            </Link>
            <h2>Bienvenido superadmin</h2>
          </small>
          {children}
        </div>
      </div>
    </section>
  )
}

export default LayoutSuperAdmin
