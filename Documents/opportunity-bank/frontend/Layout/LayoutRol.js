import React from 'react'
import LayoutAdmin from './LayoutAdmin'
import LayoutAsesor from './LayoutAsesor'
import LayoutSuperAdmin from './LayoutSuperadmin'

const LayoutRol = props => {
  if (['ASESOR'].includes(props.rolUser)) {
    return <LayoutAsesor>{props.children}</LayoutAsesor>
  }

  if (['ADMINISTRADOR'].includes(props.rolUser)) {
    return <LayoutAdmin>{props.children}</LayoutAdmin>
  }

  if (['SUPERADMINISTRADOR'].includes(props.rolUser)) {
    return <LayoutSuperAdmin>{props.children}</LayoutSuperAdmin>
  }

  return <React.Fragment> {props.children} </React.Fragment>
}

export default LayoutRol
