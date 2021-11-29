import { useRouter } from 'next/router'
import * as React from 'react'
import { useFetch } from './utils/useFetch'

export const AuthProvider = ({ children }) => {
  const { push } = useRouter()
  const [{ isAuth, status, mensaje, usuario, rol }, dispatch] = React.useReducer(reducer, {
    isAuth: false,
    status: STATUS.idle,
    mensaje: null,
    usuario: null,
    rol: null,
  })

  const [openModal, setOpenModal] = React.useState(false)

  const [ numberRegister , setNumberRegister ] = React.useState(10)
  const [ numberPage , setNumberPage ] = React.useState(0)



  React.useEffect(() => {
    dispatch({
      isAuth: getIsAuthenticated(),
      status: STATUS.resolved,
      rol: localStorage && localStorage.getItem('rol'),
      usuario: localStorage && localStorage.getItem('usuario'),
    })
  }, [])

  function logout() {
    dispatch({ isAuth: false })
    localStorage.clear()
    push('/login')
  }

  return (
    <authContext.Provider
      value={{
        isAuth,
        status,
        mensaje,
        usuario,
        rol,
        dispatch,
        logout,
        openModal,
        setOpenModal,
        numberRegister , 
        setNumberRegister,
        numberPage , 
        setNumberPage
      }}
    >
      {children}
    </authContext.Provider>
  )
}

const authContext = React.createContext({})

export function useAuthContext() {
  const ctx = React.useContext(authContext)
  return ctx
}

const reducer = (curr, updates) => ({ ...curr, ...updates })

export const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
}

export const ACTION = {
  REGISTRO_EXITOSO: 'REGISTRO EXITOSO',
  REGISTRO_ERROR: 'REGISTRO ERROR',
  OBTENER_USUARIO: 'OBTENER USUARIO',
  LOGIN_EXITOSO: 'LOGIN_EXITOSO',
  LOGIN_ERROR: 'LOGIN ERROR',
  ACTUALIZAR_CONTRASENA_EXITOSA: 'ACTUALIZAR CONTRASEÑA EXITOSA',
  ACTUALIZAR_CONTRASENA_ERROR: 'ACTUALIZAR CONTRASEÑA FALLÓ',
  CERRAR_SESION: 'CERRAR SESION',
}

function getIsAuthenticated() {
  return Boolean(localStorage && localStorage.getItem('isAuth'))
}
