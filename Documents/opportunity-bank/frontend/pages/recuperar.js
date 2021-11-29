import * as React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextInput from '../components/Forms/TextInput'
import { useRouter } from 'next/router'
import { STATUS, useAuthContext } from '../auth-context'
import { useFetch } from '../utils/useFetch'

const SUCCESS_CLASS =
  'mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
const ERROR_CLASS =
  'mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'

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
    try {
      const headers = {
        'Content-Type': 'application/json',
      }

      const dataToSend = {
        correo: userInfo.correo,
        usuario: Number(userInfo.usuario),
      }

      const { res } = await useFetch(
        `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/auth/recuperar-contra`,
        dataToSend,
      )

      if (res.code === '200') {
        setMessage('Las instrucciones fueron enviadas a tu correo.')
        setTimeout(() => {
          push('/login')
        }, 3000)
        return
      }

      if (res.statusCode === 400) {
        setMessage(
          'Hubo un error, el correo electrónico suministrado no corresponde al que está registrado en el sistema',
        )
        setTimeout(() => {
          setMessage('')
        }, 10000)
      }

      if (res.code === 404) {
        setMessage(
          res.message ||
            'Hubo un error al recuperar tu contraseña, por favor intenta nuevamente',
        )
        setTimeout(() => {
          setMessage('')
        }, 10000)
      }
    } catch (error) {
      console.log(error)
      setMessage('Hubo un error al recuperar tu contraseña, por favor intenta nuevamente')
    }
  }

  return (
    <div className="my-10">
      <main className="max-w-2xl mx-auto min-h-full flex-wrap">
        <div className="w-full">
          <div>
            <img
              src="/LogoBanco.svg"
              alt="banco_de_las_opotunidades"
              className="mx-auto my-4"
            />
            <h1 className="text-3xl text-center font-medium mb-4">Recupera tu contraseña</h1>

            <Formik
              initialValues={INITIAL_REGISTER_FORM}
              validationSchema={Yup.object({
                usuario: Yup.number().required('requerido'),
                correo: Yup.string().required('requerido').email(),
              })}
              onSubmit={handleSubmit}
            >
              <Form className="flex flex-col px-8">
                <TextInput
                  key="usuario"
                  name="usuario"
                  label="Usuario"
                  type="number"
                  min={0}
                  className={classInput}
                  placeholder="Ingresa aquí tu usuario"
                />

                <TextInput
                  label="Correo"
                  key="correo"
                  name="correo"
                  type="text"
                  className={classInput}
                  placeholder="Ingresa aquí tu correo"
                />

                {message !== '' && (
                  <p className={message.includes('error') ? ERROR_CLASS : SUCCESS_CLASS}>
                    {' '}
                    {message}{' '}
                  </p>
                )}

                <button
                  type="submit"
                  className="text-2xl font-medium py-3 text-color_primary_2_ligth text-center  rounded-full border-2 border-color_primary_2_ligth"
                >
                  Recuperar
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </main>
    </div>
  )
}

const classInput = `w-full h-12 px-4 py-2 my-1 text-base border border-color_gray_4 placeholder-color_gray_5 rounded-2xl`

const INITIAL_REGISTER_FORM = {
  correo: '',
  usuario: '',
}
