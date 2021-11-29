import * as React from 'react'

import { useAuthContext } from '../auth-context'
import { useFetch } from '../utils/useFetch'
import { useRouter } from 'next/router'

const SUCCESS_CLASS =
  'mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
const ERROR_CLASS =
  'mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
const classInput = `w-full h-12 px-4 py-2 my-1 text-base border border-color_gray_4 placeholder-color_gray_5 rounded-2xl`
const URL_CAMBIO_CONTRASENA = `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/auth/cambio-contra`

function cambiarContrasena() {
  const { isAuth, status, dispatch, mensaje } = useAuthContext()
  const { push } = useRouter()

  const [password, setPassword] = React.useState({
    currentPassword: '',
    newPassword: '',
  })

  const [errorMessage, setErrorMessage] = React.useState('')
  const { currentPassword, newPassword } = password

  const handleChange = ({ target }) => {
    setPassword({
      ...password,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const dataUptadePassword = {
      usuario: Number(localStorage.getItem('usuario')),
      contra: currentPassword,
      nuevaContra: newPassword,
    }

    try {
      const { res, responseComplete } = await useFetch(
        URL_CAMBIO_CONTRASENA,
        dataUptadePassword,
        false,
      )

      console.log(res)

      if (res.statusCode === 400) {
        setErrorMessage(`Hubo un error ${res.message}`)
        setTimeout(() => {
          setErrorMessage('')
        }, 10000)
      }

      if (res.statusCode === 404) {
        setErrorMessage(`Hubo un error ${res.message}` || 'Hubo un error ')
        setTimeout(() => {
          setErrorMessage('')
        }, 10000)
      }

      if (res.code === '200' && res.success === '1') {
        setErrorMessage(res.message)
        dispatch({ isAuth: false })
        localStorage.clear()
        setTimeout(() => {
          setErrorMessage('')
          push('/login')
        }, 3000)
      }
    } catch (error) {
      console.log(error)
      setErrorMessage('Hubo un error al cambiar la contraseña, por favor intenta nuevamente')
    }
  }

  return (
    <section className="main-wrapper pt-16 px-8">
      {mensaje ? (
        <div className="pb-8">
          Es tu primer inicio de sesión, debes cambiar la contraseña. Revisa el correo asociado
          con la contraseña preestablecida.
        </div>
      ) : null}
      <aside>
        <form onSubmit={handleSubmit}>
          <label>
            Contraseña actual
            <input
              type="password"
              autoComplete="off"
              onChange={handleChange}
              name="currentPassword"
              value={currentPassword}
              className={classInput}
              placeholder="Ingrese su contraseña actual"
            />
          </label>

          <label>
            Nueva contraseña
            <input
              type="password"
              autoComplete="off"
              onChange={handleChange}
              name="newPassword"
              value={newPassword}
              className={classInput}
              placeholder="Ingrese la nueva contraseña"
            />
          </label>

          {errorMessage !== '' ? (
            <div className={errorMessage.includes('error') ? ERROR_CLASS : SUCCESS_CLASS}>
              {errorMessage}
            </div>
          ) : null}

          <button
            type="submit"
            className="my-4 px-4 py-2 text-color_primary_2_ligth inline rounded-full hove:text-white mx-auto border-2 hover:bg-color_primary_2_ligth border-color_primary_2_ligth"
          >
            Cambiar
          </button>
        </form>
      </aside>
    </section>
  )
}

export default cambiarContrasena
