export function MontoCredito(credit) {
  const SMLV = 908526
  let MAX_PRESTAMO

  switch (credit) {
    case 'Microempresarial':
      MAX_PRESTAMO = SMLV * 10
      return {
        max_prestamo: Number(MAX_PRESTAMO),
        label: 'mínimo 1 SMLV - hasta 10 SMLV',
      }

    case 'Capital Semilla':
      MAX_PRESTAMO = SMLV * 22
      return {
        max_prestamo: Number(MAX_PRESTAMO),
        label: 'mínimo 1 SMLV - hasta 22 SMLV',
      }

    case 'Agroindustrial':
      MAX_PRESTAMO = SMLV * 22
      return {
        max_prestamo: Number(MAX_PRESTAMO),
        label: 'mínimo 1 SMLV - hasta 22 SMLV',
      }

    case 'Venteros ambulantes':
      MAX_PRESTAMO = 5000000
      return {
        max_prestamo: Number(MAX_PRESTAMO),
        label: 'mínimo 1 SMLV - hasta  5.000.000',
      }

    case 'Egresados':
      MAX_PRESTAMO = SMLV * 22
      return {
        max_prestamo: Number(MAX_PRESTAMO),
        label: 'mínimo 1 SMLV - hasta 22 SMLV',
      }
  }
}
