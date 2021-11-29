import * as React from 'react'
import LineaCredito from '../components/SimularCredito.js/LineaCredito'
import { pmt } from '../utils/PMT'
import Banner from '../components/Banner'
import { separadorMillares } from '../utils/separadorMillares'
import SelectionInput from '../components/Forms/SelectionInput'
import CantidadYCuotasDePrestamos from '../components/SimularCredito.js/CantidadYCuotasDePrestamos'
import { createRows } from '../components/SimularCredito.js/Row'
import InputCredito from '../components/SimularCredito.js/InputCredito'
import BannerCredits from '../components/SimularCredito.js/bannerCredits'
import getTableValues from '../components/SimularCredito.js/getTableValues'
import Title from '../components/Title'

const SUCCESS_CLASS =
  'mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
const ERROR_CLASS =
  'mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'

function SimularCredito({ data, corriente }) {
  const { valor_tasa } = corriente
  const initialValuesSimulation = {
    monto: '',
    cuotas: '',
    linea_credito: '',
  }

  const [lineaCreditoSelected, setLineaCreditoSelected] = React.useState('')
  const [lineaCreditoInfo, setLineaCreditoInfo] = React.useState([])
  const [message, setMessage] = React.useState('')
  const [loadingTable, setLoadingTable] = React.useState(false)
  const [valoresSimulacion, setValoresSimulacion] = React.useState(initialValuesSimulation)
  const [simulationTable, setSimulationTable] = React.useState(null)
  const [valorCuota, setValorCuota] = React.useState('')
  const [selected, setSelected] = React.useState('')

  React.useEffect(() => {
    setValoresSimulacion(initialValuesSimulation)
    setSelected('')
    const filterCredit = data.filter(
      linea_credito => linea_credito.nombre === lineaCreditoSelected,
    )
    setLineaCreditoInfo({ ...filterCredit[0] })
  }, [lineaCreditoSelected])

  React.useEffect(() => {
    ;[valoresSimulacion.monto, valoresSimulacion.cuotas].includes('') &&
      setSimulationTable(null)
  }, [valoresSimulacion])

  const refMonto = React.useRef('')

  const handleSimulator = event => {
    event.preventDefault()

    if (
      refMonto?.current?.value &&
      (refMonto?.current?.value > lineaCreditoInfo.monto_total || refMonto?.current?.value < 0)
    ) {
      setMessage(
        `Hubo un error, Valor del prestamos sobrepasa el valor máximo de prestamo ${separadorMillares(
          lineaCreditoInfo.monto_total,
        )}`,
      )
      setSimulationTable(null)
      setTimeout(() => {
        setMessage('')
      }, 5000)
      return
    }

    if (valoresSimulacion.monto === '' || valoresSimulacion.cuotas === '') {
      setMessage('Hubo un error, Ingrese los campos de cuota y monto para simular el prestamo')
      setTimeout(() => {
        setMessage('')
      }, 5000)
      return
    }

    setLoadingTable(true)
    if (valoresSimulacion.monto !== '' && valoresSimulacion.cuotas !== '') {
      const arrayWithValues = []
      let cuotaMensual = calculateCuota(valoresSimulacion, valor_tasa)
      cuotaMensual = separadorMillares(cuotaMensual)
      setValorCuota(cuotaMensual)
      const getDynamicTable = getTableValues(valoresSimulacion, arrayWithValues, valor_tasa)
      setSimulationTable(getDynamicTable)
    }
    setLoadingTable(false)
  }

  return (
    <>
      <Banner title="Simula tu crédito" image_url="/simulador-banner.svg" />
      <section className="bg-color_gray_2 h-full py-24">
        <div className="main-wrapper">
          <div className="w-11/12 md:w-3/5 mx-auto">
            <Title>Elige una línea de crédito </Title>
            <Creditos
              lineaCreditos={data}
              lineaCreditoSelected={lineaCreditoSelected}
              setLineaCreditoSelected={setLineaCreditoSelected}
            />

            {lineaCreditoSelected !== '' ? (
              <div>
                <CantidadYCuotasDePrestamos lineaCreditoInfo={lineaCreditoInfo} />
                <InputCredito
                  lineaCreditoInfo={lineaCreditoInfo}
                  valoresSimulacion={valoresSimulacion}
                  setValoresSimulacion={setValoresSimulacion}
                  selected={selected}
                  refMonto={refMonto}
                />

                {message !== '' ? (
                  <div className={message.includes('error') ? ERROR_CLASS : SUCCESS_CLASS}>
                    {message}
                  </div>
                ) : null}
                <button
                  type="submit"
                  onClick={handleSimulator}
                  className="flex mx-auto py-2 mt-6 px-6 text-white text-sm font-semibold rounded-full bg-color_primary_1_ligth"
                >
                  SIMULAR MI CRÉDITO
                </button>
              </div>
            ) : null}

            {loadingTable ? (
              <div>Loading ...</div>
            ) : simulationTable ? (
              <div>
                <div className="text-center">
                  <p className="text-lg font-semibold">
                    Una cuota de : <span className="text-color_primary_1">${valorCuota}</span>
                  </p>
                </div>
                <Table>{createRows(simulationTable)}</Table>
              </div>
            ) : null}

            <BannerCredits />

            <hr />

            {/* <LineaCredito
            valoresSimulacion={valoresSimulacion}
            setValoresSimulacion={setValoresSimulacion}
            setValorCuota={setValorCuota}
            setSimulationTable={setSimulationTable}
          /> */}
          </div>
        </div>
      </section>
    </>
  )
}

export default SimularCredito

function Table({ children }) {
  return (
    <React.Fragment>
      <h1 className="text-center my-8 text-xl font-semibold text-color_primary_2_ligth">
        Así sería el pago mensual de tu crédito
      </h1>
      <div className="table-responsive">
        <table className="mx-auto">
          <thead>
            <tr className="bg-color_primary_2_ligth">
              <th className="p-4 text-center text-white">periodo</th>
              <th className="p-4 text-center text-white">cuota</th>
              <th className="p-4 text-center text-white">interés</th>
              <th className="p-4 text-center text-white">capital</th>
              <th className="p-4 text-center text-white">saldo</th>
            </tr>
          </thead>

          {children}
        </table>
      </div>
    </React.Fragment>
  )
}

// const data = [
//   {
//     portafolio_id: 1,
//     nombre: 'microempresarial',
//     num_cuotas: 36,
//     num_salarios: 10,
//     monto_total: 9085260,
//   },
//   {
//     portafolio_id: 2,
//     nombre: 'capital semilla',
//     num_cuotas: 36,
//     num_salarios: 22,
//     monto_total: 19987572,
//   },
//   {
//     portafolio_id: 3,
//     nombre: 'agroindustrial',
//     num_cuotas: 48,
//     num_salarios: 22,
//     monto_total: 19987572,
//   },
//   {
//     portafolio_id: 4,
//     nombre: 'venteros ambulantes',
//     num_cuotas: 36,
//     num_salarios: null,
//     monto_total: 5000000,
//   },
//   {
//     portafolio_id: 5,
//     nombre: 'egresados',
//     num_cuotas: 48,
//     num_salarios: 22,
//     monto_total: 19987572,
//   },
// ]

export async function getServerSideProps() {
  const URL_PORTAFOLIO = `${process.env.NEXT_PUBLIC_CONFIG_SERVICES_V1}/config/credito/portafolio`
  const res_linea_creditos = await fetch(URL_PORTAFOLIO)
  const data_lineas_creditos = await res_linea_creditos.json()

  const URL_INTERES = `${process.env.NEXT_PUBLIC_CONFIG_SERVICES_V1}/config/credito/tasas`
  const response_mora = await fetch(URL_INTERES)
  const { corriente, mora } = await response_mora.json()
  // const  = data_mora

  return {
    props: { data: data_lineas_creditos, mora, corriente },
  }
}

const classInput =
  'w-full h-12 px-4 py-2 my-1 text-base border border-color_gray_5 placeholder-color_gray_5 rounded-2xl mt-8'

function Creditos({ lineaCreditos, setLineaCreditoSelected }) {
  const handleSelected = e => setLineaCreditoSelected(e.target.value)

  return (
    <React.Fragment>
      <select
        id="linea_creditos"
        name="linea_credito"
        onChange={handleSelected}
        className={classInput}
      >
        <option value=""> ---- Elige una linea de credito ---- </option>
        {lineaCreditos.map((linea_credito, index) => (
          <option key={linea_credito.portafolio_id} value={linea_credito.nombre}>
            {linea_credito.nombre}
          </option>
        ))}
      </select>
    </React.Fragment>
  )
}

function calculateCuota(valoresSimulacion, interesCorriente) {
  const cuota = Math.ceil(
    pmt(interesCorriente, Number(valoresSimulacion.cuotas), -Number(valoresSimulacion.monto)),
  )

  return cuota
}
