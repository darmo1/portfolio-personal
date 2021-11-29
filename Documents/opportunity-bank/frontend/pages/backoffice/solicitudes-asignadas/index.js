import React from 'react'
import { NumeroRegistro } from '../../../components/Filtro/NumeroRegistro'
import { CardNotification } from '../../../components/notification/CardNotification'
import { RowNotification } from '../../../components/notification/RowNotification'
import TableHead from '../../../components/notification/TableHead'
import LayoutAsesor from '../../../Layout/LayoutAsesor'
import { useNotificationContext } from '../../../notification-context'
import { useUsuarioContext } from '../../backoffice'

function solicitudesAsigandas({ usuarios }) {
  const { getDatabyAsesor } = useNotificationContext()

  return (
    <LayoutAsesor>
      {getDatabyAsesor.length > 0 ? (
        <div className=" border border-black w-full rounded-lg p-2  right-12 z-30  bg-color_gray_2 h-auto  ">
          <TableHead>
            {getDatabyAsesor.sort( ( a,b ) => { 
                if (a.asesor.fecha_asignacion > b.asesor.fecha_asignacion)    return -1;
                else if(a.asesor.fecha_asignacion < b.asesor.fecha_asignacion) return  1;
                else return  0;
            }).map((notification, index) => {
              return (
                <React.Fragment key={index}>
                  <RowNotification
                    notification={notification}
                    ctxDataUsuarios={usuarios || []}
                  />
                </React.Fragment>
              )
            })}
          </TableHead>
          <NumeroRegistro data={getDatabyAsesor} />
        </div>
      ) : (
        <div className=" border  w-1/2 rounded-lg  w-full max-h-60  text-center absolute right-24 z-30   bg-white border  my-2 p-2 px-4">
          {' '}
          No hay notificaciones para mostrar. <br /> intenta más tarde{' '}
        </div>
      )}
    </LayoutAsesor>
  )
}

export default solicitudesAsigandas

export async function getServerSideProps(context) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/roles/listar-usuario-rol`,
  )
  let usuarios = undefined

  if (!response) {
    usuarios = undefined
  } else {
    usuarios = await response.json()
  }

  return {
    props: {
      usuarios,
    },
  }
}
