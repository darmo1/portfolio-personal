import { Field, Form, Formik, useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { useFetch } from '../../../../utils/useFetch'
import FileUploader from '../../../FileUploader'

const FinancialReportApplicant = props => {
  const router = useRouter()
  const { paso, rol } = router.query
  const [cedula, solicitud] = router.query.usuario

  const [hide, setHide] = React.useState(false)

  const initialValues = {
    experiencia_crediticia: false,
    tiene_credito_vigente: false,
    entidad: '',
    monto_total: '',
    valor_adeudado: '',
  }

  const [financialReportvalues, setFinancialReportValues] = React.useState(initialValues)
  const [loading, setLoading] = React.useState(true)

  const hasExperience = React.useRef(null)

  React.useEffect(async () => {
    setLoading(true)
    try {
      const URL_GET_STEP_FORM = `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud/${solicitud}?seccion=${paso}`
      const response = await fetch(URL_GET_STEP_FORM)
      const info = await response.json()

      if (response.status === 404) {
        setFinancialReportValues(initialValues)
        setLoading(false)
      }

      if (response.status === 200) {
        setFinancialReportValues({ ...info })
        setLoading(false)
      }

      if (response.status === 400) {
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleBack = () => {
    router.push(
      `/individual/${cedula}/${props.solicitud_id || solicitud}?paso=FDE_8&rol=${rol}`,
    )
  }

  const handleChange = ({ target }) => {
    setFinancialReportValues({
      ...financialReportvalues,
      [target.name]: target.value,
    })
  }

  React.useEffect(() => {
    if (financialReportvalues.experiencia_crediticia === false) {
      setFinancialReportValues({ initialValues })
    }

    if (
      financialReportvalues.experiencia_crediticia === true &&
      financialReportvalues.tiene_credito_vigente === false
    ) {
      setFinancialReportValues({
        ...initialValues,
        experiencia_crediticia: true,
      })
    }
  }, [
    financialReportvalues.experiencia_crediticia,
    financialReportvalues.tiene_credito_vigente,
  ])

  const handleSubmit = async event => {
    event.preventDefault()

    props.setForm(prevState => ({
      ...prevState,
      formulario_individual: {
        ...prevState.formulario_individual,
        informe_financiero_solicitante: { ...financialReportvalues },
      },
    }))

    let {
      experiencia_crediticia,
      tiene_credito_vigente,
      monto_total,
      valor_adeudado,
      entidad,
      ...dataFinancial
    } = financialReportvalues

    const dataToSend = {
      seccion: 'FDE_9',
      solicitud_id: props.solicitud_id || solicitud,
      data: {
        entidad,
        experiencia_crediticia,
        tiene_credito_vigente,
        valor_adeudado: Boolean(monto_total) === false ? 0 : Number(monto_total),
        monto_total: Boolean(monto_total) === false ? 0 : Number(monto_total),
      },
    }

    try {
      const { responseComplete } = await useFetch(
        `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud`,
        dataToSend,
      )

      if (responseComplete) {
        props.setIsCompletedFinancialReportApplicant(true)
        props.setCurrent(props.current + 1)
        router.push(
          `/individual/${cedula}/${props.solicitud_id || solicitud}?paso=FDE_10&rol=${rol}`,
        )
        //setHide(true)
      } else {
        props.setIsCompletedFinancialReportApplicant(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(financialReportvalues)

  return loading ? (
    <div>Loading ...</div>
  ) : (
    <div className={`${hide && 'hidden'} mb-8`}>
      <h1 className="font-bold mb-4 text-center md:text-left text-3xl text-color_primary_1">
        Financial Report
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="text-center md:text-left mb-6">
          <label>¿Ha tenido experiencia de crédito?</label>

          <div role="group" aria-labelledby="my-radio-group">
            <label className="mr-4">
              <input
                type="radio"
                name="experiencia_crediticia"
                value={true}
                onChange={event =>
                  setFinancialReportValues({
                    ...financialReportvalues,
                    ['experiencia_crediticia']: true,
                  })
                }
                checked={true === financialReportvalues.experiencia_crediticia}
              />
              Si
            </label>

            <label>
              <input
                ref={hasExperience}
                type="radio"
                name="experiencia_crediticia"
                value={false}
                onChange={event => {
                  hasExperience.current.checked = true
                  setFinancialReportValues({
                    ...financialReportvalues,
                    ['experiencia_crediticia']: false,
                  })
                }}
              />
              No
            </label>
          </div>
        </div>

        {financialReportvalues.experiencia_crediticia === true ? (
          <React.Fragment>
            <div className="text-center md:text-left mb-6">
              <label>¿Tiene un crédito vigente?</label>
              <div role="group" aria-labelledby="my-radio-group">
                <label className="mr-4">
                  <input
                    type="radio"
                    value={true}
                    name="tiene_credito_vigente"
                    onChange={event =>
                      setFinancialReportValues({
                        ...financialReportvalues,
                        ['tiene_credito_vigente']: true,
                      })
                    }
                    checked={true === financialReportvalues.tiene_credito_vigente}
                  />
                  Si
                </label>

                <label>
                  <input
                    type="radio"
                    value={false}
                    name="tiene_credito_vigente"
                    onChange={event =>
                      setFinancialReportValues({
                        ...financialReportvalues,
                        ['tiene_credito_vigente']: false,
                      })
                    }
                    checked={false === financialReportvalues.tiene_credito_vigente}
                  />
                  No
                </label>
              </div>
            </div>
            {financialReportvalues.tiene_credito_vigente === true ? (
              <div>
                <div className="flex flex-col">
                  <label htmlFor="entidad">Entidad</label>
                  <input
                    type="text"
                    name="entidad"
                    id="entidad"
                    onChange={handleChange}
                    className="px-4 h-10 rounded-lg border border-gray-400 w-full mb-6"
                    value={financialReportvalues.entidad}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="monto_total">Monto total del crédito</label>
                  <input
                    type="number"
                    name="monto_total"
                    id="monto_total"
                    onChange={handleChange}
                    className="px-4 h-10 rounded-lg border border-gray-400 w-full mb-6"
                    value={financialReportvalues.monto_total}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="valor_adeudado">Valor adeudado a la fecha</label>
                  <input
                    type="number"
                    name="valor_adeudado"
                    id=" valor_adeudado"
                    onChange={handleChange}
                    className="px-4 h-10 rounded-lg border border-gray-400 w-full mb-6"
                    value={financialReportvalues.valor_adeudado}
                  />
                </div>
              </div>
            ) : null}
          </React.Fragment>
        ) : null}

        <FileUploader />
        <div className="flex justify-around">
          <button
            onClick={handleBack}
            className="mt-6 p-4 w-2/5 font-bold text-white rounded-full bg-red-500"
          >
            Anterior
          </button>

          <button
            onClick={handleSubmit}
            className="mt-6 p-4 w-2/5 font-bold text-white rounded-full bg-color_primary_2_ligth"
          >
            {' '}
            Finalizar{' '}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FinancialReportApplicant
