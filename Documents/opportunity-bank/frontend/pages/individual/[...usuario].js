import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {
  BasicInformationForm,
  ContactCitizenForm,
  CreditDestinationForm,
  FinancialReportApplicant,
  InfoBusiness,
  InfoMate,
  PopulationVariables,
  ReferencesForm,
  HabbeasData,
} from '/components/Forms/FormIndividual/index.js'

import MultiStepIndicator from '../../components/MultiStepIndicator'
import Modal from '../../components/Modal'

import FormPrerequisitos from '../../components/Forms/FormPrerequisitos/index'
import { ProtectedRoute } from '../../components/protected-route'
import { useAuthContext } from '../../auth-context'
import { useRouter } from 'next/router'
import { ProcessForm } from '../../utils/processForm'
import Banner from '../../components/Banner'

export default function Individual({
  primer_nombre = '',
  segundo_nombre = '',
  primer_apellido = '',
  segundo_apellido = '',
  num_identificacion = '',
  correo = '',
}) {
  //Call query params
  const router = useRouter()
  const { paso, rol, usuario } = router.query

  const [isCompletedCreditDestination, setIsCompletedCreditDestination] = React.useState(false)
  const [isCompletedBasicInformation, setIsCompletedBasicInformation] = React.useState(false)
  const [isCompletedInfoMate, setIsCompletedInfoMate] = React.useState(false)
  const [isCompletedPopulationVariables, setIsCompletedPopulationVariables] =
    React.useState(false)
  const [isCompletedContactCitizen, setIsCompletedContactCitizen] = React.useState(false)
  const [isCompletedInfoBusiness, setIsCompletedInfoBusiness] = React.useState(false)
  const [isCompletedReferenceForm, setIsCompletedReferenceForm] = React.useState(false)

  const [isCompletedFinancialReportApplicant, setIsCompletedFinancialReportApplicant] =
    React.useState(false)
  const [_, setIsCompletedHabbeasData] = React.useState(false)

  const [form, setForm] = React.useState({ formulario_individual: {} })
  const [showModal, setShowModal] = React.useState(true)
  const [showPreRequistos, setShowPreRequisitos] = React.useState(true)
  const [solicitud_id, setSolicitud_id] = React.useState('')
  const [current, setCurrent] = React.useState(2)

  React.useEffect(() => {
    if (['ASESOR', 'ADMINISTRADOR', 'SUPERADMINISTRADOR'].includes(rol)) {
      setShowModal(false)
      setShowPreRequisitos(false)
    }
  }, [rol])

  const handleBack = () => {
    router.push(`/individual/${usuario[0]}/${solicitud_id || usuario[1]}?paso=FDE_9&rol=${rol}`)
  }

  // TODO: Aqui consultará los datos que se pueden reutilizar que llenó el usuario en el formulario de registro-login
  // React.useEffect( async () => {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '
  //   }
  //   try{
  //    const response = await fetch(`https://oportunitybank-auth.azurewebsites.net/api/v1/auth/${cedula}`, {
  //      method: 'GET',
  //      headers
  //    })
  //    const d = await response.json()
  //    console.log( d , 'from individual')

  //   }catch(err){

  //   }
  // })

  return (
    <ProtectedRoute>
      <>
        <Banner
          title="Estás a un paso de cumplir tus sueños"
          image_url="/solicitud-banner.svg"
        />

        <section className="bg-color_gray_2 pb-24">
          <div className="main-wrapper pt-14 px-4">
            <Head>
              <title>Banco de las oportunidades</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1 className="text-center mb-6">
              <span className="text-color_primary_2_ligth text-3xl font-bold">
                Solicitud de crédito
              </span>{' '}
            </h1>
            <div className="w-screen md:w-10/12 mx-auto mb-8">
              {['FDE_0', 'FDE_1'].includes(paso) ? null : (
                <MultiStepIndicator
                  current={current}
                  paso={paso}
                  solicitud_id={solicitud_id}
                  usuario={usuario}
                  rol={rol}
                  form_type="deudor"
                />
              )}
            </div>

            {paso === 'FDE_0' ? (
              <div
                id="modal-root"
                className="absolute inset-y-0 inset-x-0  m-auto h-3/4 backdrop-blur-md"
              />
            ) : null}
            {paso === 'FDE_0' ? (
              <Modal
                Component={() => (
                  <HabbeasData
                    {...{ form, setForm, setIsCompletedHabbeasData, setShowModal }}
                  />
                )}
                modalProps={{ showModal, setShowModal }}
              />
            ) : null}

            {['ASESOR', 'ADMINISTRADOR', 'SUPERADMINISTRADOR'].includes(rol) ? (
              <div className="w-full md:w-9/12 mx-auto mb-8">
                <Link href="/backoffice">
                  <a className="bg-color_primary_2_ligth text-white rounded-lg  px-6 py-2 border hover:bg-color_primary_2 font-semibold">
                    Volver a backoffice
                  </a>
                </Link>
              </div>
            ) : null}

            <div className="md:w-9/12 mx-auto">
              {paso === 'FDE_1' ? (
                <FormPrerequisitos
                  setShowPreRequisitos={setShowPreRequisitos}
                  form={form}
                  setForm={setForm}
                  //setSolicitud_id={setSolicitud_id}
                />
              ) : null}

              <React.Fragment>
                {paso === 'FDE_2' ? (
                  <BasicInformationForm
                    setIsCompletedBasicInformation={setIsCompletedBasicInformation}
                    setCurrent={setCurrent}
                    current={current}
                    form={form}
                    setForm={setForm}
                    setSolicitud_id={setSolicitud_id}
                    userInfo={{
                      primer_nombre,
                      segundo_nombre,
                      primer_apellido,
                      segundo_apellido,
                      num_identificacion,
                    }}
                  />
                ) : null}

                {
                  //isCompletedBasicInformation &&
                  paso === 'FDE_3' ? (
                    <CreditDestinationForm
                      setIsCompletedCreditDestination={setIsCompletedCreditDestination}
                      setCurrent={setCurrent}
                      current={current}
                      form={form}
                      setForm={setForm}
                      solicitud_id={solicitud_id}
                    />
                  ) : null
                }

                {
                  //isCompletedCreditDestination &&
                  paso === 'FDE_4' ? (
                    <InfoMate
                      setIsCompletedInfoMate={setIsCompletedInfoMate}
                      setCurrent={setCurrent}
                      current={current}
                      form={form}
                      setForm={setForm}
                      solicitud_id={solicitud_id}
                    />
                  ) : null
                }

                {
                  //isCompletedInfoMate &&
                  paso === 'FDE_5' ? (
                    <PopulationVariables
                      setIsCompletedPopulationVariables={setIsCompletedPopulationVariables}
                      setCurrent={setCurrent}
                      current={current}
                      form={form}
                      setForm={setForm}
                      solicitud_id={solicitud_id}
                    />
                  ) : null
                }

                {
                  //isCompletedPopulationVariables &&
                  paso === 'FDE_6' ? (
                    <ContactCitizenForm
                      setIsCompletedContactCitizen={setIsCompletedContactCitizen}
                      setCurrent={setCurrent}
                      current={current}
                      form={form}
                      setForm={setForm}
                      solicitud_id={solicitud_id}
                      correo={correo}
                    />
                  ) : null
                }

                {
                  //isCompletedContactCitizen &&
                  paso === 'FDE_7' ? (
                    <InfoBusiness
                      setIsCompletedInfoBusiness={setIsCompletedInfoBusiness}
                      setCurrent={setCurrent}
                      current={current}
                      form={form}
                      setForm={setForm}
                      solicitud_id={solicitud_id}
                    />
                  ) : null
                }

                {
                  //isCompletedInfoBusiness &&
                  paso === 'FDE_8' ? (
                    <ReferencesForm
                      setIsCompletedReferenceForm={setIsCompletedReferenceForm}
                      setCurrent={setCurrent}
                      current={current}
                      form={form}
                      setForm={setForm}
                      solicitud_id={solicitud_id}
                    />
                  ) : null
                }

                {
                  //isCompletedReferenceForm &&
                  paso === 'FDE_9' ? (
                    <FinancialReportApplicant
                      setIsCompletedFinancialReportApplicant={
                        setIsCompletedFinancialReportApplicant
                      }
                      setCurrent={setCurrent}
                      current={current}
                      solicitud_id={solicitud_id}
                      form={form}
                      setForm={setForm}
                    />
                  ) : null
                }

                {
                  //isCompletedFinancialReportApplicant &&
                  paso === 'FDE_10' ? (
                    <div>
                      <p className="font-bold text-2xl text-gray-700">
                        "Recibimos tu información, la solicitud está en proceso de estudio."
                      </p>

                      <button
                        onClick={handleBack}
                        className="mt-4 p-2 w-1/2 text-white rounded-full bg-red-500"
                      >
                        Anterior
                      </button>
                      {rol === 'USUARIO' && (
                        <Link href="/">
                          <a>
                            <input
                              type="button"
                              className='className="mt-4 p-2 w-1/2 text-white rounded-full bg-color_primary_2_ligth'
                              value="home"
                            />
                          </a>
                        </Link>
                      )}
                    </div>
                  ) : null
                }
              </React.Fragment>
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
