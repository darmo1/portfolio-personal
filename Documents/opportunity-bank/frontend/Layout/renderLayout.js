export function renderLayout(rol) {
  switch (rol) {
    case 'ASESOR':
      return renderLayoutAsesor()

    case 'ADMINISTRADOR':
      return renderLayoutAdmin()

    case 'SUPERADMINISTRADOR':
      return renderLayoutSuperAdmin()

    default:
      break
  }
}
