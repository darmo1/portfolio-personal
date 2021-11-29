import * as React from 'react'
import Link from 'next/link'
import { ProtectedRoute } from '../components/protected-route'
import { useAuthContext } from '../auth-context'
import LayoutRol from '../Layout/LayoutRol'

const Switch = () => {
  const { usuario, rol } = useAuthContext()

  const [solicitud_id, setSolicitud_id] = React.useState(undefined)

  //Tipos de formularios y el paso donde empiezan
  const [FDE, setFDE] = React.useState('FDE_2')
  const [FCO, setFCO] = React.useState('FCO_1')
  const [loading, setLoading] = React.useState(true)

  React.useEffect(async () => {
    if (['ASESOR', 'ADMINISTRADOR', 'SUPERADMINISTRADOR'].includes(rol)) {
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      //const URL = `https://oportunitybank.azurewebsites.net/api/v1/credito/solicitud/usuario/${usuario}`
      const URL = `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud/usuario/${usuario}`
      const res = await fetch(URL)
      const data = await res.json()

      //TODO: ¿Qué pasa si la solicitud está en otra posición? hay que hacer un filter pero debemos crear otra pantalla para saber el numero de solicitudes del usuario

      if (res.status === 200) {
        setFDE(data[0].deudor.seccion)
        setSolicitud_id(data[0].id)
        setLoading(false)
      }

      if (res.status === 404) {
        setFDE('FDE_0')
        setSolicitud_id('')
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
    }
  }, [usuario])

  return (
    <ProtectedRoute>
      <LayoutRol rolUser={rol}>
        {loading ? (
          <div>Loading .... </div>
        ) : (
          <section className="bg-color_gray_2 h-96 flex pt-16">
            <div className="main-wrapper px-4 h-56 flex">
              <div className="md:w-2/4 w-full  mx-auto flex flex-col justify-around">
                <Link
                  href={`/individual/${usuario}/${solicitud_id || ''}?paso=${FDE}&rol=${rol}`}
                >
                  <a>
                    <div className="text-2xl font-medium py-3 text-color_primary_2_ligth text-center  rounded-full border-2 border-color_primary_2_ligth hover:bg-color_primary_2_ligth hover:text-white">
                      ¿Eres deudor?
                    </div>
                  </a>
                </Link>

                <Link
                  href={`/codeudor/${usuario}/${solicitud_id || ''}?paso=${FCO}&rol=${rol}`}
                >
                  <a>
                    <div className="text-2xl font-medium py-3 text-color_primary_2_ligth text-center  rounded-full border-2 border-color_primary_2_ligth hover:bg-color_primary_2_ligth hover:text-white">
                      ¿Eres Codeudor?
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </section>
        )}
      </LayoutRol>
    </ProtectedRoute>
  )
}

export default Switch
