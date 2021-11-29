import * as React from 'react'
import Link from 'next/link'
import { Form, Formik, Field } from 'formik'
import * as Yup from 'yup'
import TextInput from '../components/Forms/TextInput'
import { useRouter } from 'next/router'
import { STATUS, useAuthContext } from '../auth-context'
import routeRol from '../utils/routeRol'
import Image from 'next/image'

const classInput = `w-full h-12 px-4 py-2 my-1 text-base border border-color_gray_5 placeholder-color_gray_5 rounded-2xl`
const SUCCESS_CLASS =
  'mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
const ERROR_CLASS =
  'mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'

const INITIAL_LOGIN_FORM = {
  usuario: '',
  contra: '',
}

export default function Login() {
  const { push } = useRouter()
  const { isAuth, status, mensaje, usuario, rol, dispatch } = useAuthContext()
  const [message, setMessage] = React.useState('')

  // React.useEffect(() => {
  //   if (isAuth && status === STATUS.resolved) {
  //     push('/')
  //   }
  // }, [isAuth, status, push])

  async function handleSubmit(userInfo) {
    try {
      const headers = {
        'Content-Type': 'application/json',
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/auth/autenticacion`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          usuario: Number(userInfo.usuario),
          contra: userInfo.contra,
        }),
      })

      const dataresponse = await res.json()

      if (res.status === 400) {
        setMessage(
          `Hubo un error, ${dataresponse.message}` ||
            'Hubo un error al iniciar sesión, por favor intenta nuevamente',
        )
        dispatch({ isAuth: false })
        setTimeout(() => {
          setMessage('')
        }, 10000)
      }

      if (res.status === 403) {
        localStorage.setItem('usuario', userInfo.usuario)
        dispatch({ isAuth: false })
        setMessage(`${dataresponse.message}`)
        setTimeout(() => {
          push('/cambiar-contrasena')
        }, 3000)
      }

      if (res.status === 201) {
        const { access_token, data, refreshToken } = dataresponse
        localStorage.setItem('isAuth', true)
        localStorage.setItem('rol', data.rol)
        localStorage.setItem('usuario', userInfo.usuario)
        dispatch({
          rol: data.rol,
          isAuth: true,
          status: STATUS.resolved,
          usuario: Number(userInfo.usuario),
        })

        //TODO: AQUI PONGO ESTO ASI PARA HACER PRUEBAS, HASTA AHORA BACKEND DEBE ENVIARME EL ROL
        const rol = data.rol

        // localStorage.setItem('access_token', access_token)
        // localStorage.setItem('refresh_token', refreshToken)
        // localStorage.setItem('usuario', userInfo.usuario )

        const redirect = routeRol(rol)
        push(redirect)
      }
    } catch (error) {
      console.log(error)
      setMessage('Hubo un error al iniciar sesión, por favor intenta nuevamente')
    }
  }

  return (
    <div className="my-10">
      <main className="max-w-5xl mx-auto min-h-full flex flex-wrap justify-center">
        <div className="relative w-2/5 h-6/12 object-cover">
          <Image className="object-cover" src={'/login.png'} layout="fill" />
        </div>
        <div className="w-full lg:w-1/2">
          <div className="w-4/5 mx-auto">
            <img
              src="/LogoBanco.svg"
              alt="banco_de_las_opotunidades"
              className="mx-auto my-4"
            />
            <h1 className="text-3xl text-center font-medium mb-4">Inicia sesión</h1>

            <Formik
              initialValues={INITIAL_LOGIN_FORM}
              validationSchema={Yup.object({
                usuario: Yup.string().required('requerido'),
                contra: Yup.string()
                  .required('requerido')
                  .min(6, 'La contraseña debe tener al menos 6 caracteres'),
              })}
              onSubmit={handleSubmit}
            >
              <Form className="flex flex-col">
                <TextInput
                  label="Documento de identidad"
                  key="usuario"
                  name="usuario"
                  type="number"
                  className={classInput}
                  placeholder="Escribe aquí el número de tu documento"
                />

                <TextInput
                  label="Contraseña"
                  key="contra"
                  type="password"
                  name="contra"
                  placeholder="Escribe aquí tu contraseña"
                  className={classInput}
                />

                <Link href="/recuperar">
                  <a className="text-color_primary_2_ligth text-lg font-semibold md:text-xl underline text-center mb-8">
                    Olvidé mi contraseña
                  </a>
                </Link>
                <label className="flex gap-2 justify-center font-section font-semibold text-lg">
                  <input className="w-4 h-4 mr-1 mb-1 mt-1 inline-block" type="checkbox" />
                  <span className="inline-block font-medium">Recuérdame</span>
                </label>

                {message !== '' && (
                  <p className={message.includes('error') ? ERROR_CLASS : SUCCESS_CLASS}>
                    {message}{' '}
                  </p>
                )}

                <button
                  type="submit"
                  className="text-lg md:text-2xl font-medium my-4 py-3 bg-color_primary_2_ligth text-center rounded-full text-white"
                >
                  Siguiente
                </button>
                <Link href="/crear-cuenta">
                  <a className="text-lg md:text-2xl font-medium py-3 text-color_primary_2_ligth text-center  rounded-full border-2 border-color_primary_2_ligth">
                    Soy nuevo, quiero registrarme
                  </a>
                </Link>
              </Form>
            </Formik>
          </div>
        </div>
      </main>
    </div>
  )
}
