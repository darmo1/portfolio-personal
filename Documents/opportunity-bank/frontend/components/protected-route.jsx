import * as React from 'react'
import { useRouter } from 'next/router'
import { STATUS, useAuthContext } from '../auth-context'

export const ProtectedRoute = ({ children, preventRedirect }) => {
  const { push } = useRouter()
  const { isAuth, status } = useAuthContext()

  React.useEffect(() => {
    if (!isAuth && !preventRedirect && status === STATUS.resolved) push('/login')
  }, [isAuth, preventRedirect, push, status])

  return <>{children}</>
}
