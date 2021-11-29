import * as React from 'react'
import CardControl from '../../../components/Asesores/CardControl'
import { ProcessForm } from '../../../utils/processForm'
import LayoutAsesor from '../../../Layout/LayoutAsesor'
import Link from 'next/link'
import { useAuthContext } from '../../../auth-context'
import getBlobsInContainer from '../../../components/get-blob-azure'
import { useRouter } from 'next/router'
import BoxPersonalInformation from '../../../components/Asesores/BoxDeudorInformation'
import BoxFormInformation from '../../../components/Asesores/BoxFormInformation'
import BoxDeudorInformation from '../../../components/Asesores/BoxDeudorInformation'
import BoxCodeudordelDeudor from '../../../components/Asesores/BoxPeerToPeer'
import BoxPeerToPeer from '../../../components/Asesores/BoxPeerToPeer'
import LayoutRol from '../../../Layout/LayoutRol'
import Modal from '../../../components/SuperAdmin/Modal'

const DashBoardBackOffice = ({ data, cedula }) => {
  const { rol } = useAuthContext()
  const [loadinLayout, setLoadingLayout] = React.useState(true)

  React.useEffect(() => {
    setLoadingLayout(true)
    if (rol) {
      setLoadingLayout(false)
      return
    }
    setLoadingLayout(false)
  }, [rol])

  function DashBoard() {
    return (
      <>
        <section>
          {data.map(({ deudor, tipo, codeudor, id }, index) => {
            if (deudor?.persona?.num_identificacion === Number(cedula)) {
              return (
                <div key={index}>
                  <BoxDeudorInformation
                    title={'Información Usuario - Deudor'}
                    usuario={deudor}
                  />

                  <BoxFormInformation
                    title={'Información del formulario - Deudor'}
                    usuario={deudor}
                    tipo={tipo}
                    id={id}
                    rol={rol}
                    form={'individual'}
                  />

                  <BoxPeerToPeer
                    title={'Información del Codeudor'}
                    nombre="Codeudor"
                    usuario={codeudor}
                    id={id}
                    rol={rol}
                  />

                  <VerifyDocuments data={data} />

                  <RequestStatus data={data} />
                </div>
              )
            }

            if (codeudor?.persona?.num_identificacion === Number(cedula)) {
              return (
                <div key={index}>
                  <BoxDeudorInformation
                    title={'Información Usuario - Codeudor'}
                    usuario={codeudor}
                  />

                  <BoxFormInformation
                    title={'Información del formulario - Codeudor'}
                    usuario={codeudor}
                    tipo={tipo}
                    id={id}
                    rol={rol}
                    form={'codeudor'}
                  />

                  <BoxPeerToPeer
                    title="Información del Deudor"
                    nombre="Deudor"
                    usuario={deudor}
                    id={id}
                    rol={rol}
                  />

                  <VerifyDocuments data={data} />
                  <RequestStatus data={data} />
                </div>
              )
            }
          })}
        </section>
      </>
    )
  }

  return loadinLayout ? (
    <div>Loading ...</div>
  ) : (
    <LayoutRol rolUser={rol}>{DashBoard()}</LayoutRol>
  )
}

export default DashBoardBackOffice

export async function getServerSideProps(context) {
  const { cedula } = context.params
  const { sid } = context.query
  const url_get_solicitud = `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud/usuario/${cedula}`
  let getSolicitud

  const response = await fetch(url_get_solicitud)
  const dataSolicitud = await response.json()

  if (!dataSolicitud.length) {
    getSolicitud = []
    return
  }

  getSolicitud = dataSolicitud.filter(sol => sol.id === sid)
  return { props: { data: getSolicitud, cedula } }
}

const RequestStatus = ({ data }) => {
  const solicitudId = data[0].id
  const [requestStatus, setRequestStatus] = React.useState({
    estado: 'COLOCADO',
    observaciones: 'Falta informacion',
  })
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSendingData, setIsSendingData] = React.useState(false)
  const [message, setMessage] = React.useState('')

  React.useEffect(() => {
    async function getRequestStatus() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud/${solicitudId}?seccion=EST`,
      )

      if (res.status === 200) {
        const requestStatus = await res.json()
        setRequestStatus({
          estado: requestStatus.estado,
          observaciones: requestStatus.observaciones,
        })
        setIsLoading(false)
      }
    }
    getRequestStatus()
  }, [])

  function handleChange(e) {
    setRequestStatus({
      ...requestStatus,
      [e.target.name]: e.target.value,
    })
  }

  async function sendDocuments(e) {
    e.preventDefault()
    if (isSendingData) return

    setIsSendingData(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud`,
        {
          method: 'POST',
          body: JSON.stringify({
            seccion: 'EST',
            solicitud_id: solicitudId,
            data: requestStatus,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.status === 201) {
        setMessage('Estado actualizado correctamente')
      } else {
        setMessage('Error al actualizar el estado')
      }
    } catch {
      setMessage('Error al actualizar el estado')
    }

    setIsSendingData(false)
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  return (
    <div className="my-4 bg-white border border-gray-200 rounded-lg p-4">
      <h2 className="font-bold text-lg">Estado de la solicitud</h2>

      {message ? (
        <div className={message.includes('Error') ? ERROR_CLASS : SUCCESS_CLASS} role="alert">
          {message}
        </div>
      ) : null}

      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <div className="font-section">
          <form onSubmit={sendDocuments}>
            <div className="mb-2">
              <label className="block font-medium">Observaciones:</label>
              <textarea
                name="observaciones"
                id="observaciones"
                defaultValue={requestStatus.observaciones ?? ''}
                className="block border border-gray-400 px-4 w-full form-textarea pt-2 rounded-lg"
                rows="5"
                onInput={handleChange}
                style={{ resize: 'none' }}
                placeholder="Ingrese las observaciones"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block font-medium">Estado: </label>
              <select
                value={requestStatus.estado}
                onChange={handleChange}
                name="estado"
                className="h-10 border border-gray-400 px-4 w-full rounded-lg"
              >
                <option value="COMPLETADO">Completado</option>
                <option value="INCOMPLETO">Incompleto</option>
                <option value="FALTA_DOCUMENTOS">Faltan documentos</option>
                <option value="POR_VALIDAR">Por validar</option>
                <option value="PREPARADO_ENVIO">Listo para enviar al operador</option>
                <option value="APROBADO">Aprobado</option>
                <option value="RECHAZADO">Rechazado</option>
                <option value="COLOCADO">Colocado</option>
              </select>
            </div>

            <div className="flex justify-center">
              <button className="mt-2 w-full md:w-44 text-center py-2 md:border border-white bg-color_primary_1 text-white md:py-2 md:px-1 rounded-full border-t-2">
                {isSendingData ? 'Enviando...' : 'Guardar cambios'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

const SUCCESS_CLASS =
  'mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
const ERROR_CLASS =
  'mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'

const VerifyDocuments = ({ data }) => {
  const solicitudId = data[0].id
  const [document, setDocument] = React.useState({
    cedula: false,
    servicios_publicos: false,
    cifin: false,
    codeudor: false,
    modelo_negocio: false,
    certificado_tradicion: false,
    vista_agropecuaria: false,
    firma: false,
    otros: false,
  })
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSendingData, setIsSendingData] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [openModalImage, setOpenModalImage] = React.useState(false)
  const [renderImage, setRenderImage] = React.useState('')

  const classModal = `fixed inset-5 backdrop-blur-sm  flex items-center justify-center z-50`

  const handleOpenModal = urlImage => {
    setOpenModalImage(true)
    setRenderImage(urlImage)
  }

  const router = useRouter()
  const usuario = router.query.cedula

  const [documentsOfUser, setDocumentsOfUser] = React.useState([])

  React.useEffect(async () => {
    const documents = await getBlobsInContainer()
    const filterDocuments = documents.filter(document => document.usuario === usuario)
    setDocumentsOfUser(filterDocuments)
  }, [])

  React.useEffect(() => {
    async function getDocumentsData() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud/${solicitudId}?seccion=DOC`,
      )

      if (res.status === 200) {
        setDocument(await res.json())
        setIsLoading(false)
      }

      if (res.status === 404) {
        setIsLoading(false)
      }
    }
    getDocumentsData()
  }, [])

  function handleChange(e) {
    setDocument({
      ...document,
      [e.target.name]: e.target.checked,
    })
  }

  async function sendDocuments(e) {
    e.preventDefault()
    if (isSendingData) return

    setIsSendingData(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud?seccion=DOC`,
        {
          method: 'POST',
          body: JSON.stringify({
            seccion: 'DOC',
            solicitud_id: solicitudId,
            data: document,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.status === 201) {
        setMessage('Documentos enviados correctamente')
      } else {
        setMessage('Error al enviar documentos')
      }
    } catch {
      setMessage('Error al enviar documentos')
    }

    setIsSendingData(false)
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  return (
    <div className="my-4 bg-white border border-gray-200 rounded-lg p-4">
      <h2 className="font-bold text-lg">Verificar documentos</h2>

      {message ? (
        <div className={message.includes('Error') ? ERROR_CLASS : SUCCESS_CLASS} role="alert">
          {message}
        </div>
      ) : null}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={sendDocuments} className="font-section">
          <div className="d-f">
            <input
              type="checkbox"
              name="cedula"
              onChange={handleChange}
              defaultChecked={document.cedula}
            />
            <label htmlFor="cedula" className="ml-2">
              Cédula
            </label>
          </div>

          <div className="d-f">
            <input
              type="checkbox"
              name="certificado_tradicion"
              onChange={handleChange}
              defaultChecked={document.certificado_tradicion}
            />
            <label htmlFor="certificado_tradicion" className="ml-2">
              Certificado de tradición
            </label>
          </div>

          <div className="d-f">
            <input
              type="checkbox"
              name="cifin"
              onChange={handleChange}
              defaultChecked={document.cifin}
            />
            <label htmlFor="cifin" className="ml-2">
              Cifín
            </label>
          </div>

          <div className="d-f">
            <input
              type="checkbox"
              name="codeudor"
              onChange={handleChange}
              defaultChecked={document.codeudor}
            />
            <label htmlFor="codeudor" className="ml-2">
              Codeudor
            </label>
          </div>

          <div className="d-f">
            <input
              type="checkbox"
              name="modelo_negocio"
              onChange={handleChange}
              defaultChecked={document.modelo_negocio}
            />
            <label htmlFor="modelo_negocio" className="ml-2">
              Modelo de negocio
            </label>
          </div>

          <div className="d-f">
            <input
              type="checkbox"
              name="servicios_publicos"
              onChange={handleChange}
              defaultChecked={document.servicios_publicos}
            />
            <label htmlFor="servicios_publicos" className="ml-2">
              Servicios públicos
            </label>
          </div>

          <div className="d-f">
            <input
              type="checkbox"
              name="vista_agropecuaria"
              onChange={handleChange}
              defaultChecked={document.vista_agropecuaria}
            />
            <label htmlFor="vista_agropecuaria" className="ml-2">
              Vista agropecuaria
            </label>
          </div>

          <div className="d-f">
            <input
              type="checkbox"
              name="otros"
              onChange={handleChange}
              defaultChecked={document.otros}
            />
            <label htmlFor="otros" className="ml-2">
              Otros
            </label>
          </div>

          <section className="overflow-hidden">
            <div className="flex overflow-x-auto">
              {documentsOfUser.length > 0
                ? documentsOfUser.map(document => {
                    return (
                      <div
                        className=""
                        key={document.name}
                        onClick={() => handleOpenModal(document.url)}
                      >
                        <img
                          className=""
                          src={document.url}
                          alt={document.name}
                          className="h-12"
                        />
                      </div>
                    )
                  })
                : 'No hay documentos para mostrar'}

              <div id="render-image-full" className={openModalImage && classModal}></div>

              {openModalImage ? (
                <Modal nodo="render-image-full" className=" h-full w-full">
                  <div className="border rounded-lg p-4 flex flex-col  bg-white w-1/2 mx-auto  h-full relative flex items-center justify-center">
                    <button
                      onClick={() => setOpenModalImage(false)}
                      className="bg-red-500 text-white p-4 rounded-lg flex mr-0 m-auto mb-4 w-min absolute right-0 top-0"
                    >
                      {' '}
                      Close{' '}
                    </button>
                    <div className="flex items-center justify-center">
                      <img
                        src={renderImage}
                        alt={'render Image'}
                        className=" max-w-full m-auto"
                      />
                    </div>
                  </div>
                </Modal>
              ) : null}
            </div>
          </section>

          <div className="flex justify-center">
            <button className="mt-2 w-full md:w-44 text-center py-2 md:border border-white bg-color_primary_1 text-white md:py-2 md:px-1 rounded-full border-t-2">
              {isSendingData ? 'Enviando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
