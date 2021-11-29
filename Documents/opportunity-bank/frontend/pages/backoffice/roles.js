import React from 'react'
import LayoutSuperAdmin from '../../Layout/LayoutSuperadmin'
import Title from '../../components/Title'
import Search from '../../components/SuperAdmin/Search'
import { useAuthContext } from '../../auth-context'
import TableSuperAdmin from '../../components/SuperAdmin/TableSuperAdmin'
import Modal from '../../components/SuperAdmin/Modal'
import CrearUsuario from '../../components/SuperAdmin/CrearUsuario'
import { getDataFromPages } from '../../utils/getPages'
import TableRowSuperAdmin from '../../components/SuperAdmin/TableRowSuperAdmin'
import { useFetch } from '../../utils/useFetch'
import { data } from 'autoprefixer'

const INITIAL_PAGE = 0
const classModal = `fixed inset-5 backdrop-blur-sm  flex items-center justify-center z-50`
const SUCCESS_CLASS =
  'mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
const ERROR_CLASS =
  'mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'

const Roles = ({ user_admin_superadmin, roles }) => {
  const [page, setPage] = React.useState(INITIAL_PAGE)

  const initialValues = {}

  const { openModal, setOpenModal } = useAuthContext()
  const [showCreateUserBox, setShowCreateUserBox] = React.useState(false)
  const [valuesCreateUser, setValuesCreateUser] = React.useState(initialValues)
  const [message, setMessage] = React.useState('')
  const [rolValueSelected, setRolValueSelected] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const [render, setRender] = React.useState(false)

  const [dataAdminAsesores, setDataAdminAsesores] = React.useState([])

  const [boxConfirmChange, setBoxConfirmChange] = React.useState(false)
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

  //TODO: TRAERSE LOS USUARIO
  React.useEffect(async () => {
    setLoading(true)
    try {
      const URL_GET_ADMIN_ASESORES = `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/roles/administrador?page=1&limit=10`

      const response = await fetch(URL_GET_ADMIN_ASESORES)
      const dataAdminYAsesores = await response.json()

      if (response.status === 200) {
        dispatch({ dataUser: dataAdminYAsesores?.items || [] })
        setDataAdminAsesores(dataAdminYAsesores?.items || [])
        setLoading(false)
      }
    } catch (error) {}
  }, [IdSearched])

  const handleCrearRol = () => {
    setOpenModal(true)
  }

  const hanldeClose = () => {
    setOpenModal(false)
  }

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
      // const URL = 'https://oportunitybank-auth.azurewebsites.net/api/v1/roles/actualizar-usuario-rol'
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
    <LayoutSuperAdmin>
      <Title>Configuración de usuarios</Title>
      <div className="flex my-6 w-full justify-between flex-col-reverse md:flex-row">
        <div className="flex flex-row items-center justify-center">
          <p className="text-sm">Crear rol</p>
          <img
            src="/agregar-icono.svg"
            alt=""
            onClick={handleCrearRol}
            className="cursor-pointer w-7 ml-4 font-section"
          />
        </div>
        <Search
          {...{ IdSearched, statusRol, dispatch, dataUser, setLoading, dataAdminAsesores }}
        />
      </div>

      {messageRol !== '' ? (
        <div className={messageRol.includes('error') ? ERROR_CLASS : SUCCESS_CLASS}>
          {messageRol}
        </div>
      ) : null}

      {/* Carga de asesores y admin */}

      {!IdSearched ? (
        loading ? (
          <div>Loading .... </div>
        ) : dataAdminAsesores.length > 0 ? (
          <TableSuperAdmin>
            {dataAdminAsesores.map((user, index) => {
              return (
                <TableRowSuperAdmin
                  key={index}
                  cedula={user.cedula}
                  nombres={user.nombres}
                  apellidos={user.apellidos}
                  correo={user.correo}
                  rol={{
                    rolUser: user.rol,
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
          </TableSuperAdmin>
        ) : (
          'No se han encontrado resultados'
        )
      ) : loading ? (
        <div>Loading ... </div>
      ) : dataUser.length > 0 ? (
        <TableSuperAdmin>
          {dataUser.map((user, index) => {
            return (
              <TableRowSuperAdmin
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
        </TableSuperAdmin>
      ) : (
        'No se encontraron resultados'
      )}

      <div id="confirm-changes" className={boxConfirmChange && classModal}></div>
      {boxConfirmChange ? (
        <Modal nodo="confirm-changes">
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

      {/* <div id="crear-usuario-rol" className={openModal && classModal}></div>
      {openModal ? (
        <Modal
          nodo="crear-usuario-rol"
          className=" max-w-2xl overflow-x-auto h-4/5 border rounded-lg"
        >
          <div className="bg-white border p-4 ">
            <div className="flex justify-end">
              <button
                className="px-2 py-1 bg-red-500 rounded-lg text-white"
                onClick={hanldeClose}
              >
                close{' '}
              </button>
            </div>
            <CrearUsuario roles={roles} />
          </div>
        </Modal>
      ) : null} */}

      {/* 
      <button onClick={handleNextPage}>Next Page</button> */}
    </LayoutSuperAdmin>
  )
}

export default Roles

export async function getServerSideProps() {
  // const res = await fetch('https://oportunitybank-auth.azurewebsites.net/api/v1/roles/administrador?page=2&limit=1')
  // const Users = await res.json()
  // const user_admin_superadmin = Users.filter ( user =>
  //    (user.id === 'SUPERADMINISTRADOR' || user.id === 'ADMINISTRADOR')
  // )

  const fetchRoles = await fetch(`${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/roles/listar-roles`)
  const roles = await fetchRoles.json()

  const fetchUserAdminYAsesores = await fetch(
    `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/v1/roles/administrador?page=1&limit=1`,
  )
  const response = await fetchUserAdminYAsesores.json()

  return { props: { roles } }
}
