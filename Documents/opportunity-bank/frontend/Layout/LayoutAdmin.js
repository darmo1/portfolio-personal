import React from 'react'
import Btn from '../components/Asesores/Btn'
import Link from 'next/link'
import Title from '../components/Title'

const LayoutAdmin = ({ children }) => {
  return (
    <section className="bg-gray-section">
      <Title> Admin </Title>
      <div className="main-wrapper bg-dark-gray flex flex-col mx-auto my-4 justify-between md:flex-row">
        <div className="max-w-1/6 min-h-full bg-color_gray_2 px-4">
          <Btn
            href="/backoffice"
            name="Créditos usuarios"
            icon_url="/icon-solicitud-backoffice.svg"
          />
          <Btn
            href="/backoffice/roles-admin"
            name="Roles"
            icon_url="/icon-gestor-backoffice.svg"
          />
          <Btn href="/switch" name="Crear solicitud" icon_url="/icon-config-backoffice.svg" />
          <Btn href="/backoffice/#" name="Otro" icon_url="/icon-solicitud-backoffice.svg" />
        </div>
        <div className="md:w-3/4 p-4">
          <small className="font-semibold hover:text-blue-500">
            <Link href="/backoffice">
              <a>{`> Backoffice`}</a>
            </Link>
            <h2>Bienvenido Admin</h2>
          </small>
          {children}
        </div>
      </div>
    </section>
  )
}

export default LayoutAdmin
