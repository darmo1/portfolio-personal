import * as React from 'react'
import Layout from '.'
import LayoutAsesor from './LayoutAsesor'

const ManagerLayout = ({ children, rol }) => {
  // React.useEffect(() => {
  //   const rol = localStorage.getItem('rol')
  //   setRolUser(rol)
  // })

  return <Layout>{children}</Layout>
}

export default ManagerLayout
