import * as React from 'react'
import { useAuthContext } from './auth-context'

export const NotificationProvider = ({ children }) => {
  const { usuario,  numberRegister, numberPage } = useAuthContext()

  const MINUTES = 60000
  const [getDatabyAsesor, setDataByAsesor] = React.useState([])
  const [NumberNotification, setNumberNotification] = React.useState(null)

  async function doRequest() {
   
    try {
      const URL_GET_APPLICATION_BY_ASESOR = `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitudes?asesor=${usuario}&indice=${numberPage}&limite=${numberRegister}`
      //const URL_GET_APPLICATION_BY_ASESOR = `https://bancooprtunidadsolicitudcreditoqa.azurewebsites.net/api/v1/credito/solicitudes?asesor=${513}`
      const response = await fetch(URL_GET_APPLICATION_BY_ASESOR)

      if (response.status === 200) {
        const data = await response.json()
        const sortedApplication = data.sort(
          (a, b) => b.asesor.fecha_asignacion - a.asesor.fecha_asignacion,
        )

        setDataByAsesor(sortedApplication)
      } else {
        setDataByAsesor([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(async () => {
    await doRequest()
    const interval = setInterval(async () => {
      await doRequest()
    }, MINUTES)

    return () => clearInterval(interval)
  }, [usuario, numberRegister, numberPage])

  return (
    <notificationContext.Provider
      value={{
        getDatabyAsesor,
        setDataByAsesor,
        NumberNotification,
        setNumberNotification,
        doRequest,
      }}
    >
      {children}
    </notificationContext.Provider>
  )
}

const notificationContext = React.createContext([])

export function useNotificationContext() {
  const ctx = React.useContext(notificationContext)
  return ctx;
}
