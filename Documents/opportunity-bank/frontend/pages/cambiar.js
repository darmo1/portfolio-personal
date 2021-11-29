import * as React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextInput from '../components/Forms/TextInput'
import { useRouter } from 'next/router'
import { useFetch } from '../utils/useFetch'
import { STATUS, useAuthContext } from '../auth-context'

export default function RegisterPage() {
  const { push } = useRouter()
  const { isAuth, status } = useAuthContext()
  const [message, setMessage] = React.useState('')

  React.useEffect(() => {
    if (isAuth && status === STATUS.resolved) {
      push('/')
    }
  }, [isAuth, status, push])

  async function handleSubmit(userInfo) {
    const { res, responseComplete, error } = await useFetch(
      `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/auth/cambiocontra`,
      {
        info: {
          action: 'cambiarContra',
          contra: userInfo.contra,
          nuevaContra: userInfo.nuevaContra,
          usuario: userInfo.usuario,
        },
        autenticacion: {
          //TODO: put this in the env
          usuario: 'USR_UABI_UME',
          contra: '6tC8dvgfr@C',
          // usuario: process.env.NEXT_PUBLIC_USUARIO,
          // contra: process.env.NEXT_PUBLIC_CONTRA,
        },
      },
      false,
    )

    console.log(res)

    if (!res || !responseComplete || error) {
      setMessage(
        error || 'Hubo un error al recuperar tu contraseña, por favor intenta nuevamente',
      )
      return
    }

    setMessage('Contraseña cambiada correctamente.')
  }

  return (
    <div className="my-10">
      <main className="max-w-5xl mx-auto min-h-full flex-wrap px-8">
        <div className="w-full ">
          <div>
            <h1 className="text-3xl text-center font-medium mb-2">Cambia tu contraseña</h1>

            <Formik
              initialValues={INITIAL_REGISTER_FORM}
              validationSchema={Yup.object({
                usuario: Yup.string().required('requerido'),
              })}
              onSubmit={handleSubmit}
            >
              <Form className="flex flex-col">
                <TextInput
                  key="usuario"
                  label="Usuario"
                  name="usuario"
                  type="text"
                  className={classInput}
                  placeholder="Ingresa tu usuario"
                />

                <TextInput
                  key="contra"
                  label="Contraseña"
                  name="contra"
                  type="password"
                  className={classInput}
                  placeholder="Ingresa tu contraseña actual"
                />

                <TextInput
                  key="nuevaContra"
                  label="Nueva Contraseña"
                  name="nuevaContra"
                  type="password"
                  className={classInput}
                  placeholder="Ingresa tu nueva contraseña"
                />

                <p>{message}</p>

                <button
                  type="submit"
                  className="px-4 py-2  border-2 text-color_primary_2_ligth border-color_primary_2_ligth inline rounded-full mx-auto"
                >
                  Enviar
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </main>
    </div>
  )
}

const classInput = `w-full h-12 px-4 py-2 my-1 text-base border-2 placeholder-color_gray_4 rounded-2xl`

const INITIAL_REGISTER_FORM = {
  usuario: '',
  contra: '',
  nuevaContra: '',
}
