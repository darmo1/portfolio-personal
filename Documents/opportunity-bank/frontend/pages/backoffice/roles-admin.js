import * as React from 'react'
import SearchAdmin from '../../components/ADMIN/SearchAdmin'
import TableAdmin from '../../components/ADMIN/TableAdmin'
import TableRowAdmin from '../../components/ADMIN/TableRowAdmin'
import TableRow from '../../components/Asesores/TableUser/TableRow'
import Modal from '../../components/SuperAdmin/Modal'
import Search from '../../components/SuperAdmin/Search'
import TableRowSuperAdmin from '../../components/SuperAdmin/TableRowSuperAdmin'
import TableSuperAdmin from '../../components/SuperAdmin/TableSuperAdmin'
import Title from '../../components/Title'
import LayoutAdmin from '../../Layout/LayoutAdmin'
import LayoutSuperAdmin from '../../Layout/LayoutSuperadmin'
import { useFetch } from '../../utils/useFetch'

const INITIAL_PAGE = 0
const classModal = `fixed inset-5 backdrop-blur-sm  flex items-center justify-center z-50`
const SUCCESS_CLASS =
  'mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
const ERROR_CLASS =
  'mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'

function RolesAdmin({ asesores, roles }) {
  const [dataAdminAsesores, setDataAdminAsesores] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const reducer = (current, upt) => ({ ...current, ...upt })
  const [{ IdSearched, statusRol, dataUser, messageRol }, dispatch] = React.useReducer(
    reducer,
    {
      IdSearched: '',
      statusRol: '',
      dataUser: [],
      messageRol: '',
    },
  )
  const [message, setMessage] = React.useState('')
  const [rolValueSelected, setRolValueSelected] = React.useState('')
  const [boxConfirmChange, setBoxConfirmChange] = React.useState(false)

  //TODO: TRAERSE LOS USUARIO
  React.useEffect(() => {
    setLoading(true)
    dispatch({ dataUser: asesores || [] })
    setDataAdminAsesores(asesores || [])
    setLoading(false)
  }, [IdSearched, asesores])

  const handleModifyRol = async () => {
    dispatch({ statusRol: rolValueSelected?.valor })
    const ChangeField = dataUser.filter(
      field => Number(field?.cedula) === Number(rolValueSelected?.cedula),
    )
    const { telefono, celular, cedula, ...infoUser } = ChangeField[0]
    const dataToSend = {
      ...infoUser,
      cedula: Number(cedula),
      telefono: Number(telefono),
      celular: Number(celular),
      rolID: Number(rolValueSelected?.valor),
    }

    //TODO: CAMBIAR EL STATUS DEL DROPDOWN
    try {
      const URL = `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/roles/actualizar-usuario-rol`
      const { res, responseComplete } = await useFetch(URL, dataToSend)

      if (responseComplete) {
        setBoxConfirmChange(false)
        setMessage('Proceso exitoso, el Usuario ha sido actualizado.')
        setTimeout(() => {
          setMessage('')
        }, 5000)
        setLoading(true)
        setLoading(false)
      } else {
        setBoxConfirmChange(false)
        setMessage('Hubo un error, intentalo más tarde o comunicate con server.')
        setTimeout(() => {
          setMessage('')
        }, 5000)
      }
    } catch (error) {
      setBoxConfirmChange(false)
      setMessage('Hubo un error, intentalo más tarde o comunicate con server.')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const handleCancelProcess = () => {
    setBoxConfirmChange(false)
  }

  return (
    <LayoutAdmin>
      <Title> Configuración de usuarios </Title>
      <div className="w-full">
        <SearchAdmin
          {...{ IdSearched, statusRol, dispatch, dataUser, setLoading, dataAdminAsesores }}
        />
      </div>
      {!IdSearched ? (
        loading ? (
          <div>Loading .... </div>
        ) : asesores.length > 0 ? (
          <TableAdmin>
            {asesores.map((user, index) => {
              return (
                <TableRowAdmin
                  key={index}
                  cedula={user.cedula}
                  nombres={user.nombres}
                  apellidos={user.apellidos}
                  correo={user.correo}
                  rol={{
                    rolUser: user.rol || undefined,
                    dataRoles: roles,
                    dispatch,
                    statusRol: user.rolID,
                    setBoxConfirmChange,
                    setRolValueSelected,
                  }}
                  acciones={'ACCIONES'}
                />
              )
            })}
          </TableAdmin>
        ) : (
          'No se han encontrado resultados'
        )
      ) : loading ? (
        <div>Loading ... </div>
      ) : dataUser.length > 0 ? (
        <TableAdmin>
          {dataUser.map((user, index) => {
            return (
              <TableRowAdmin
                key={index}
                cedula={user.cedula}
                nombres={user.nombres}
                apellidos={user.apellidos}
                correo={user.correo}
                rol={{
                  rolUser: user.rol,
                  dataRoles: roles,
                  dispatch,
                  statusRol,
                  setBoxConfirmChange,
                  setRolValueSelected,
                }}
                acciones={'ACCIONES'}
              />
            )
          })}
        </TableAdmin>
      ) : (
        'No se encontraron resultados'
      )}

      <div id="confirm-changes-ADMIN" className={boxConfirmChange && classModal}></div>

      {boxConfirmChange ? (
        <Modal nodo="confirm-changes-ADMIN">
          <div className="border rounded-lg p-4 flex flex-col bg-white ">
            <h1>Estás seguro deseas cambiar el rol de este usuario </h1>
            <div className="flex justify-center">
              <button
                type="submit"
                className="mr-4 mt-6 p-2 w-2/5 font-bold text-white rounded-full bg-color_primary_2_ligth"
                onClick={handleModifyRol}
              >
                Si
              </button>
              <button
                type="submit"
                className="mt-6 p-2 w-2/5 font-bold text-white rounded-full bg-red-500"
                onClick={handleCancelProcess}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
      {message !== '' ? (
        <div className={message.includes('error') ? ERROR_CLASS : SUCCESS_CLASS}>{message}</div>
      ) : null}
    </LayoutAdmin>
  )
}

export default RolesAdmin

export async function getServerSideProps() {
  const [fetchRoles, fetchUserAdminYAsesores] = await Promise.all([
    await fetch(`${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/roles/listar-roles`),
    await fetch(
      `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/roles/administrador?page=1&limit=10`,
    ),
  ])

  const roles = await fetchRoles.json()
  const responseAdminAsesores = await fetchUserAdminYAsesores.json()
  const filterAsesores = responseAdminAsesores.items.filter(user => user.rolID === 4)
  const filterRoles = roles.filter(rol => rol.id === 1 || rol.id === 4)
  return {
    props: { asesores: filterAsesores, roles: filterRoles },
  }
}
