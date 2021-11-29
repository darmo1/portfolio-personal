import { useRouter } from 'next/router'
import Link from 'next/link'
import * as React from 'react'
import {
  BasicInformationForm,
  InfoMate,
  PopulationVariables,
  IncomeAndExpense,
  BienesRaices,
  PersonalReference,
  Contact,
  HabbeasData,
} from '../../components/Forms/FormCodeudor/index'
import Modal from '../../components/Modal'
import { ProtectedRoute } from '../../components/protected-route'
import Banner from '../../components/Banner'
import MultiStepIndicator from '../../components/MultiStepIndicator'

export default function codeudor({
  primer_nombre = '',
  segundo_nombre = '',
  primer_apellido = '',
  segundo_apellido = '',
  correo = '',
  num_identificacion = '',
}) {
  const router = useRouter()
  const { paso, rol, usuario } = router.query
  const [current, setCurrent] = React.useState(0)

  const sectionForm = {
    isCompletedBasicInformation: false,
    isCompletedInfoMate: false,
    isCompletedPopulationVariables: false,
    isCompletedIncomeAndExpense: false,
    isCompletedBienesRaices: false,
    isCompletedPersonalReference: false,
    isCompletedHabbeasData: false,
  }

  const [isCompletedContactCitizen, setIsCompletedContactCitizen] = React.useState(false)

  const reducer = (state, action) => {
    switch (action.type) {
      case 'update':
        return {
          ...state,
          [action.fieldName]: action.payload,
        }

      default:
        return state
    }
  }

  const [val, dispatch] = React.useReducer(reducer, sectionForm)
  const [form, setForm] = React.useState({ formulario_codeudor: {} })
  const [solicitud_id, setSolicitud_id] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const [showPreRequisitos, setShowPreRequisitos] = React.useState(true)

  React.useEffect(() => {
    if (['ASESOR', 'ADMINISTRADOR', 'SUPERADMINISTRADOR'].includes(rol)) {
      setShowModal(false)
      setShowPreRequisitos(false)
    }
  }, [rol])

  const handleBack = () => {
    router.push(`/codeudor/${usuario[0]}/${solicitud_id || usuario[1]}?paso=FCO_7&rol=${rol}`)
  }

  return (
    <ProtectedRoute>
      <>
        <Banner
          title="Estás a un paso de cumplir tus sueños"
          image_url="/solicitud-banner.svg"
        />

        <section className="bg-color_gray_2 pb-24">
          <div className="main-wrapper pt-14 px-4">
            <h1 className="text-center mb-6">
              <span className="text-color_primary_2_ligth text-3xl font-bold">
                Formulario de Codeudor
              </span>
            </h1>
            <div className="w-screen md:w-10/12 mx-auto mb-8">
              <MultiStepIndicator
                current={current}
                paso={paso}
                solicitud_id={solicitud_id}
                usuario={usuario}
                rol={rol}
                form_type="codeudor"
              />
            </div>
            {showModal && (
              <div
                id="modal-root"
                className="absolute inset-y-0 inset-x-0  m-auto h-3/4 
           backdrop-blur-md"
              />
            )}

            <Modal
              Component={() => <HabbeasData {...{ form, setForm, setShowModal }} />}
              modalProps={{ showModal, setShowModal }}
            />

            {['ASESOR', 'ADMINISTRADOR', 'SUPERADMINISTRADOR'].includes(rol) ? (
              <div className="w-full md:w-9/12 mx-auto mb-8">
                <Link href="/backoffice">
                  <a className="bg-color_primary_2_ligth text-white rounded-lg  px-6 py-2 border hover:bg-color_primary_2 font-semibold">
                    Volver a backoffice
                  </a>
                </Link>
              </div>
            ) : null}

            {/* //TODO: Agregar el multiplaso */}
            <div className="md:w-9/12 mx-auto">
              {paso === 'FCO_1' ? (
                <BasicInformationForm
                  dispatch={dispatch}
                  form={form}
                  setForm={setForm}
                  setSolicitud_id={setSolicitud_id}
                  setCurrent={setCurrent}
                  current={current}
                  userInfo={{
                    primer_nombre,
                    segundo_nombre,
                    primer_apellido,
                    segundo_apellido,
                    num_identificacion,
                  }}
                />
              ) : null}

              {paso === 'FCO_2' ? (
                <InfoMate
                  dispatch={dispatch}
                  form={form}
                  setForm={setForm}
                  solicitud_id={solicitud_id}
                  setCurrent={setCurrent}
                  current={current}
                />
              ) : null}

              {paso === 'FCO_3' ? (
                <PopulationVariables
                  dispatch={dispatch}
                  form={form}
                  setForm={setForm}
                  solicitud_id={solicitud_id}
                  setCurrent={setCurrent}
                  current={current}
                />
              ) : null}

              {paso === 'FCO_4' ? (
                <Contact
                  correo={correo}
                  setIsCompletedContactCitizen={setIsCompletedContactCitizen}
                  form={form}
                  setForm={setForm}
                  solicitud_id={solicitud_id}
                  setCurrent={setCurrent}
                  current={current}
                />
              ) : null}

              {paso === 'FCO_5' ? (
                <IncomeAndExpense
                  dispatch={dispatch}
                  form={form}
                  setForm={setForm}
                  solicitud_id={solicitud_id}
                  setCurrent={setCurrent}
                  current={current}
                />
              ) : null}

              {paso === 'FCO_6' ? (
                <BienesRaices
                  dispatch={dispatch}
                  form={form}
                  setForm={setForm}
                  solicitud_id={solicitud_id}
                  setCurrent={setCurrent}
                  current={current}
                />
              ) : null}

              {paso === 'FCO_7' ? (
                <PersonalReference
                  dispatch={dispatch}
                  form={form}
                  setForm={setForm}
                  solicitud_id={solicitud_id}
                  setCurrent={setCurrent}
                  current={current}
                />
              ) : null}

              {paso === 'FCO_8' ? (
                <div>
                  <p className="text-center text-lg font-semibold">
                    Felicidades. Formulario completado
                  </p>

                  <div className="flex justify-around">
                    <button
                      onClick={handleBack}
                      className="mt-6 p-4 w-2/5 font-bold text-white rounded-full bg-red-500"
                    >
                      Anterior
                    </button>

                    {rol === 'USUARIO' && (
                      <Link href="/">
                        <a className="w-2/5">
                          <input
                            type="button"
                            className="mt-6 p-4 w-full font-bold text-white rounded-full bg-color_primary_2_ligth"
                            value="home"
                          />
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </>
    </ProtectedRoute>
  )
}

export async function getServerSideProps(context) {
  const { params, query } = context
  const { rol } = query
  const [cedula, solicitud] = params.usuario

  if (rol === 'USUARIO') {
    const URL = `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/roles/listar-usuario-rol/${cedula}`
    const responseFetch = await fetch(URL)
    const dataUser = await responseFetch.json()

    var { nombres, apellidos, cedula: num_identificacion, correo } = dataUser

    var [primer_nombre, segundo_nombre] = nombres.split(' ')
    var [primer_apellido, segundo_apellido] = apellidos.split(' ')

    if (!primer_nombre) {
      primer_nombre = null
    }

    if (!segundo_nombre) {
      segundo_nombre = null
    }

    if (!primer_apellido) {
      primer_apellido = null
    }

    if (!segundo_apellido) {
      segundo_apellido = null
    }

    if (!num_identificacion) {
      num_identificacion = null
    }

    if (!correo) {
      correo = null
    }
  } else {
    var primer_nombre = null
    var segundo_nombre = null
    var primer_apellido = null
    var segundo_apellido = null
    var num_identificacion = null
    var correo = null
  }

  return {
    props: {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      num_identificacion,
      correo,
    },
  }
}
