import { useAuthContext } from '../../../auth-context'

function TableUser({ children }) {
  const ROLES = ['ADMINISTRADOR', 'SUPERADMINISTRADOR']
  const { rol } = useAuthContext()

  return (
    <div className="table-responsive">
      <table className="mx-auto bg-white rounded-lg rounded-t-none w-full">
        <thead className="border-b font-bold text-xs">
          <tr>
            {ROLES.includes(rol) ? <td className="text-center p-4"> Check </td> : null}
            {ROLES.includes(rol) ? <td className="text-center p-4"> Asignado </td> : null}
            <th className="p-4 text-center">C.C</th>
            <th className="p-4 text-center">Nombres</th>
            <th className="p-4 text-center">Apellidos</th>
            <th className="p-4 text-center">Rol</th>
            <th className="p-4 text-center">Tipo de crédito</th>
            <th className="p-4 text-center">Estado</th>
            <th className="p-4 text-center">Acciones</th>
          </tr>
        </thead>
        {children}
      </table>
    </div>
  )
}

export default TableUser
