const routeRol = data => {
  switch (data) {
    case 'SUPERADMINISTRADOR':
      return '/backoffice?rol=SUPERADMIN'

    case 'ADMINISTRADOR':
      return '/backoffice?rol=ADMIN'

    case 'ASESOR':
      return '/backoffice?rol=ASESOR'

    case 'USUARIO':
      return '/'
  }
}

export default routeRol
