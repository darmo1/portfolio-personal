import * as React from 'react'
import { useAuthContext } from '../../auth-context'
import BoxIntereses from '../../components/SuperAdmin/BoxIntereses'
import EditCredit from '../../components/SuperAdmin/EditCredit'
import Title from '../../components/Title'
import LayoutSuperAdmin from '../../Layout/LayoutSuperadmin'
import ConfigurarInteres from './configuracion-tasa-interes'

function ConfiguracionInteres({ dataLineaCredito }) {
  const [lineaCreditoSelected, setLineaCreditoSelected] = React.useState('')
  const [loadingBox, setLoadingBox] = React.useState(false)
  const [lineaCreditoInfo, setLineaCreditoInfo] = React.useState({})
  const [salarioMinimo, setSalarioMinimo] = React.useState('')

  React.useEffect(() => {
    setLoadingBox(true)
    const filterCredit = dataLineaCredito.filter(
      linea_credito => linea_credito.nombre === lineaCreditoSelected,
    )
    setLineaCreditoInfo({ ...filterCredit[0] })
    setLoadingBox(false)
  }, [lineaCreditoSelected])

  return (
    <LayoutSuperAdmin>
      <div className="relative flex flex-col justify-center items-center">
        <Title> Configuración créditos</Title>

        <div className="flex flex-col border my-4 p-4 rounded-lg bg-white w-full">
          <h2 className="text-lg text-color_primary_2_ligth font-semibold text-center">
            Configurar interés
          </h2>
          <BoxIntereses setSalarioMinimo={setSalarioMinimo} />
        </div>

        <div className="flex flex-col border my-4 p-4 rounded-lg bg-white w-full">
          <label className="text-lg text-color_primary_2_ligth font-semibold text-center">
            Editar créditos
          </label>
          <LineaDeCreditos
            lineaDeCreditos={dataLineaCredito}
            lineaCreditoSelected={lineaCreditoSelected}
            setLineaCreditoSelected={setLineaCreditoSelected}
          />
          {lineaCreditoSelected !== '' ? (
            loadingBox ? (
              <div>Loading ... </div>
            ) : (
              <div>
                <EditCredit
                  lineaCreditoSelected={lineaCreditoSelected}
                  lineaDeCredito={lineaCreditoInfo}
                  setLineaCreditoSelected={setLineaCreditoSelected}
                />
              </div>
            )
          ) : null}
        </div>
        <div className="flex flex-col border my-4 p-4 rounded-lg bg-white w-full">
          <label className="text-lg text-color_primary_2_ligth font-semibold text-center">
            Agregar línea de créditos
          </label>
          <hr className="mt-8 border-color_gray_3" />
          <ConfigurarInteres salarioMinimo={salarioMinimo} />
        </div>
      </div>
    </LayoutSuperAdmin>
  )
}

export default ConfiguracionInteres

function LineaDeCreditos({ lineaDeCreditos, lineaCreditoSelected, setLineaCreditoSelected }) {
  const classInput =
    'mx-auto h-12 px-4 py-2 text-base border border-color_gray_5 placeholder-color_gray_5 rounded-2xl my-4 w-full md:w-1/2'
  const handleSelected = e => setLineaCreditoSelected(e.target.value)
  return (
    <React.Fragment>
      <select
        id="linea_creditos"
        name="linea_credito"
        onChange={handleSelected}
        value={lineaCreditoSelected}
        className={classInput}
      >
        <option value=""> ---- Elige una linea de credito para configurar ---- </option>
        {lineaDeCreditos.map(linea_credito => (
          <option key={linea_credito.portafolio_id} value={linea_credito.nombre}>
            {linea_credito.nombre}
          </option>
        ))}
      </select>
    </React.Fragment>
  )
}

export async function getServerSideProps() {
  const URL_PORTAFOLIO = `${process.env.NEXT_PUBLIC_CONFIG_SERVICES_V1}/config/credito/portafolio`
  const res = await fetch(URL_PORTAFOLIO)
  let dataLineaCredito = await res.json()

  if (res.statusCode === 404) {
    dataLineaCredito = []
  }

  return {
    props: {
      dataLineaCredito,
    },
  }
}
