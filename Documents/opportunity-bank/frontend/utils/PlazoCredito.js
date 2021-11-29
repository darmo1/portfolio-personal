export function PlazoCredito(creditName) {
  switch (creditName) {
    case 'Microempresarial':
      return {
        max_prestamo: 36,
        label: 'hasta 36 cuotas',
      }

    case 'Capital Semilla':
      return {
        max_prestamo: 36,
        label: 'hasta 36 cuotas',
      }

    case 'Agroindustrial':
      return {
        max_prestamo: 48,
        label: 'hasta 48 cuotas',
      }

    case 'Venteros ambulantes':
      return {
        max_prestamo: 36,
        label: 'hasta  36cuotas',
      }

    case 'Egresados':
      return {
        max_prestamo: 48,
        label: 'hasta 48 cuotas',
      }
  }
}
