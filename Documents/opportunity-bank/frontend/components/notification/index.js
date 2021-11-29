import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUsuarioContext } from '../../pages/backoffice'
import { useNotificationContext } from '../../notification-context'
import { CardNotification } from './CardNotification'

export const Notification = () => {
  const { getDatabyAsesor, NumberNotification } = useNotificationContext()
  const [userAsesor, setUserAsesor] = React.useState([])
  const ctxDataUsuarios = useUsuarioContext()

  const router = useRouter()

  const [openBoxNotification, setOpenBoxNotification] = React.useState(false)
  const ref = React.useRef()

  React.useEffect(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/roles/listar-usuario-rol`,
      )

      if (response.status === 200) {
        const Asesores = await response.json()
        setUserAsesor(Asesores)
      } else {
        setUserAsesor([])
      }
    } catch (err) {
      setUserAsesor([])
    }
  }, [])

  React.useEffect(() => {
    if (getDatabyAsesor.length === 0) return
  }, [NumberNotification])

  React.useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openBoxNotification && ref.current && !ref.current.contains(e.target)) {
        setOpenBoxNotification(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [openBoxNotification])

  const handleBoxNotification = () => {
    setOpenBoxNotification(!openBoxNotification)
  }

  return (
    <div className="" ref={ref}>
      <div onClick={handleBoxNotification} className="relative">
        {getDatabyAsesor.length === 0 ? null : (
          <small className="bg-color_primary_1 p-2 rounded-full text-white font-small">
            {getDatabyAsesor.length}
          </small>
        )}
        <img src="/campana.svg" alt="notification-number" className="relative" />
      </div>

      {openBoxNotification ? (
        getDatabyAsesor.length > 0 ? (
          <div className=" border  w-1/2 rounded-lg p-2 w-full max-h-60 overflow-y-scroll  absolute right-12 z-30  bg-color_gray_2  ">
            <div className="flex justify-end ">
              <Link href="/backoffice/solicitudes-asignadas">
                <button className="border rounded-lg hover:bg-blue-200 p-2">Ver todo</button>
              </Link>
            </div>
            {getDatabyAsesor.map((notification, index) => {
              return (
                <React.Fragment key={index}>
                  <CardNotification
                    notification={notification}
                    ctxDataUsuarios={userAsesor || ctxDataUsuarios}
                  />
                </React.Fragment>
              )
            })}
          </div>
        ) : (
          <div className=" border  w-1/2 rounded-lg  w-full max-h-60  text-center absolute right-24 z-30   bg-white border  my-2 p-2 px-4">
            {' '}
            No hay notificaciones para mostrar. <br /> intenta más tarde{' '}
          </div>
        )
      ) : null}
    </div>
  )
}
