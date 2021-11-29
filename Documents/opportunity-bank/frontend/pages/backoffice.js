import * as React from 'react'
import { useAuthContext } from '../auth-context'
import Search from '../components/Asesores/Search'
import TableUser from '../components/Asesores/TableUser'
import TableRow from '../components/Asesores/TableUser/TableRow'
import { useRouter } from 'next/router'
import LayoutRol from '../Layout/LayoutRol'
import Modal from '../components/SuperAdmin/Modal'
import { useFetch } from '../utils/useFetch'
import moment from 'moment'
import { dateUtc } from '../utils/dateUtc'
import { NumeroRegistro } from '../components/Filtro/NumeroRegistro'

const SUCCESS_CLASS =
  'mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
const ERROR_CLASS =
  'mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'

const initialState = {
  userId: '',
  loading: false,
  data: [],
  error: '',
}

const BackOffice = ({ usuarios }) => {
  const router = useRouter()
  const { rol, usuario } = useAuthContext()
  const [loadinLayout, setLoadingLayout] = React.useState(true)
  const ROLES = ['ADMINISTRADOR', 'SUPERADMINISTRADOR']
  const [openBox, setOpenBox] = React.useState(false)
  const [solicitudPorAsesor, setsolicitudPorAsesor] = React.useState({})
  const [openMod, setOpenMod] = React.useState(false)
  const [applicationToSend, setApplicationToSend] = React.useState([])
  const [MensajeError, setErrorMensaje] = React.useState('')

  const [firstCallAPI, setFirsCallAPI] = React.useState(initialState)

  React.useEffect(() => {
    setLoadingLayout(true)
    if (rol) {
      setLoadingLayout(false)
      return
    }
    setLoadingLayout(false)
  }, [rol])

  const [search, setSearch] = React.useState({
    userId: '',
    loading: false,
    data: [],
    error: '',
  })

  React.useEffect(async () => {
    setSearch({
      ...search,
      loading: true,
      data: [],
      error: '',
    })

    if (rol && ROLES.includes(rol)) {
      try {
        const fetchCreditos = await fetch(
          `${
            process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1
          }/credito/solicitudes?indice=${0}&limite=${10}`,
        ) //&usuario={3000}&fecha={2021-11-21}

        if (fetchCreditos.status === 200) {
          const solicitudes = await fetchCreditos.json()
          solicitudes.map(({ id, asesor }) => {
            setsolicitudPorAsesor(prev => {
              return {
                ...prev,
                [id]: {
                  asesor: asesor ? asesor?.num_identificacion : '',
                  isChecked: false,
                  solicitud_id: id,
                },
              }
            })
          })

          setFirsCallAPI(solicitudes)
          setSearch({
            ...search,
            data: solicitudes,
            loading: false,
            error: '',
          })
        }

        if (fetchCreditos.status === 400) {
          setSearch({
            userId: '',
            loading: false,
            data: [],
            error: '',
          })
        }
      } catch (error) {
        console.log(error)
        setSearch({
          userId: '',
          loading: false,
          data: [],
          error: '',
        })
      }
    } else {
      setSearch({
        ...search,
        loading: false,
      })
    }
  }, [rol])

  const handleApplicationSelected = () => {
    let arrayFilteredByApplication = []
    for (const application in solicitudPorAsesor) {
      if (solicitudPorAsesor[application].isChecked === true) {
        arrayFilteredByApplication.push({
          ...solicitudPorAsesor[application],
          asesor: solicitudPorAsesor[application].asesor
            ? solicitudPorAsesor[application].asesor
            : null,
        })
      }
    }
    setApplicationToSend([...arrayFilteredByApplication])

    if (arrayFilteredByApplication.length > 0) setOpenMod(true)
    else {
      setOpenBox(false)
      setErrorMensaje('Hubo un error -  Debes seleccionar una solicitud de proceso')
      setTimeout(() => {
        setErrorMensaje('')
      }, 5000)
    }
  }

  const deleteApplicationSelected = () => {
    setOpenBox(false)
  }

  const sendSolicitud = async () => {
    try {
      const URL_ASIGNAR_ASESOR = `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud`

      const dataToSend = applicationToSend.map(({ asesor, solicitud_id }) => ({
        seccion: 'ASE',
        solicitud_id,
        data: {
          num_identificacion: Number(asesor),
          fecha_asignacion: dateUtc(),
          asignador: Number(usuario),
        },
      }))

      const dataPromise = dataToSend.map(application => {
        return useFetch(URL_ASIGNAR_ASESOR, application)
      })

      const responses = await Promise.all(dataPromise)
      const responseFail = responses.find(({ responseComplete }) => responseComplete === false)

      setOpenMod(false)

      if (responseFail) {
        setOpenBox(false)
        setErrorMensaje('Hubo un error - intenta más tarde')
        setTimeout(() => {
          setErrorMensaje('')
        }, 5000)
      } else {
        setOpenBox(false)
        setErrorMensaje('Proceso asignado exitosamente')
        setTimeout(() => {
          setErrorMensaje('')
          router.replace(router.asPath)
        }, 5000)
      }
    } catch (error) {
      console.log(error)
      setOpenMod(false)
      setOpenBox(false)
      setErrorMensaje('Hubo un error - intenta más tarde')
      setTimeout(() => {
        setErrorMensaje('')
      }, 5000)
    }
  }
  const handleCancel = () => {
    setOpenMod(false)
  }

  function User() {
    return (
      <>
        <div className="w-full">
          <Search search={search} setSearch={setSearch} firstCallAPI={firstCallAPI} />
        </div>

        <div>
          {search.loading ? (
            <div>Loading ... </div>
          ) : (
            <div>
              {ROLES.includes(rol) ? (
                <div className="flex flex-col items-end">
                  <div
                    type="button"
                    className="hover:cursor-pointer flex flex-end border border-black rounded-lg w-max px-4 py-2"
                    onClick={() => setOpenBox(!openBox)}
                  >
                    Acciones para selección{' '}
                  </div>
                  {openBox ? (
                    <ul className="border border-black flex flex-col w-1/2 my-2">
                      <li>
                        <button
                          onClick={handleApplicationSelected}
                          className="text-right  w-full px-4 py-2 hover:bg-color_primary_2_dark"
                        >
                          Asignar solicitudes seleccionadas
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={deleteApplicationSelected}
                          className="text-right  w-full px-4 py-2 hover:bg-color_primary_2_dark"
                        >
                          Eliminar solicitudes seleccionadas
                        </button>
                      </li>
                    </ul>
                  ) : null}
                </div>
              ) : null}

              <div
                id="handle-solicitud"
                className={
                  openMod &&
                  `fixed inset-5 backdrop-blur-sm  flex items-center justify-center z-50`
                }
              ></div>

              {openMod ? (
                <Modal nodo="handle-solicitud" className="flex items-center">
                  <div className="border rounded-lg p-4 flex flex-col bg-white ">
                    <h1>Esta seguro(a) que desea ejecutar esta acción</h1>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="mr-4 mt-6 p-2 w-2/5 font-bold text-white rounded-full bg-color_primary_2_ligth"
                        onClick={sendSolicitud}
                      >
                        Si
                      </button>

                      <button
                        type="submit"
                        className="mt-6 p-2 w-2/5 font-bold text-white rounded-full bg-red-500"
                        onClick={handleCancel}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </Modal>
              ) : null}

              {MensajeError !== '' ? (
                <div className={MensajeError.includes('error') ? ERROR_CLASS : SUCCESS_CLASS}>
                  {MensajeError}
                </div>
              ) : null}

              {search.error === '' ? (
                search.data.length > 0 ? (
                  <>
                  <TableUser>
                    {search.data.map(
                      ({ deudor, codeudor, estado_solicitud, tipo, id }, item, index) => {
                        if (deudor?.persona.num_identificacion === Number(search.userId)) {
                          return (
                            <TableRow
                              key={index}
                              nombres={`${deudor.persona.primer_nombre} ${
                                deudor.persona.seguno_nombre || ''
                              }`}
                              apellidos={`${deudor.persona.primer_apellido} ${
                                deudor.persona.seguno_apellido || ''
                              }`}
                              cedula={deudor.persona.num_identificacion}
                              rol={deudor.tipo}
                              credito={tipo}
                              estado_solicitud={estado_solicitud[estado_solicitud.length - 1]}
                              sid={id}
                              usuarios={usuarios}
                              asesor={item.asesor}
                              solicitudPorAsesor={solicitudPorAsesor}
                              setsolicitudPorAsesor={setsolicitudPorAsesor}
                            />
                          )
                        }

                        if (codeudor?.persona.num_identificacion === Number(search.userId)) {
                          return (
                            <TableRow
                              key={index}
                              nombres={`${codeudor.persona.primer_nombre} ${
                                codeudor.persona.seguno_nombre || ''
                              }`}
                              apellidos={`${codeudor.persona.primer_apellido} ${
                                codeudor.persona.seguno_apellido || ''
                              }`}
                              cedula={codeudor.persona.num_identificacion}
                              rol={codeudor.tipo}
                              credito={tipo}
                              estado_solicitud={estado_solicitud[estado_solicitud.length - 1]}
                              sid={id}
                              usuarios={usuarios}
                              asesor={item.asesor}
                              solicitudPorAsesor={solicitudPorAsesor}
                              setsolicitudPorAsesor={setsolicitudPorAsesor}
                            />
                          )
                        }

                        return (
                          <TableRow
                            key={index}
                            nombres={`${deudor.persona.primer_nombre} ${
                              deudor.persona.seguno_nombre || ''
                            }`}
                            apellidos={`${deudor.persona.primer_apellido} ${
                              deudor.persona.seguno_apellido || ''
                            }`}
                            cedula={deudor.persona.num_identificacion}
                            rol={deudor.tipo}
                            credito={tipo}
                            estado_solicitud={estado_solicitud[estado_solicitud.length - 1]}
                            sid={id}
                            usuarios={usuarios}
                            asesor={item.asesor}
                            solicitudPorAsesor={solicitudPorAsesor}
                            setsolicitudPorAsesor={setsolicitudPorAsesor}
                          />
                        )
                      },
                    )}
                  </TableUser>
                    {/* <NumeroRegistro /> */}
                  </>
                ) : (
                  <div>Ingresa la cédula de un usuario</div>
                )
              ) : (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {' '}
                  {search.error}{' '}
                </div>
              )}
            </div>
          )}
        </div>
      </>
    )
  }

  function renderLayout(rol) {
    return (
      <UsuariosProvider usuarios={usuarios}>
        <LayoutRol rolUser={rol}>{User()}</LayoutRol>
      </UsuariosProvider>
    )
  }

  return loadinLayout ? <div>Loading ...</div> : renderLayout(rol)
}

export default BackOffice

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

const usuarioContext = React.createContext({})

export function UsuariosProvider({ children, usuarios }) {

  return <usuarioContext.Provider value={usuarios}>{children}</usuarioContext.Provider>
}

export function useUsuarioContext() {
  const ctx = React.useContext(usuarioContext)

  return ctx
}
