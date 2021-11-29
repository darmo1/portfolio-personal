const classInput =
  'w-full h-12 px-4 py-2 my-1 text-base border border-color_gray_5 placeholder-color_gray_5 rounded-2xl mt-8'

export const dataLineaCredito = [
  {
    id: 'linea-credito 1',
    name: 'linea_credito',
    fieldName: 'Línea de crédito',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 'linea-credito 1.0',
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 'linea-credito 1.1',
        name: 'Microempresarial',
        fieldName: 'Microempresarial',
      },
      {
        id: 'linea-credito 1.2',
        name: 'Capital Semilla',
        fieldName: 'Capital Semilla',
      },
      {
        id: 'linea-credito 1.3',
        name: 'Agroindustrial',
        fieldName: 'Agroindustrial',
      },
      {
        id: 'linea-credito 1.4',
        name: 'Venteros ambulantes',
        fieldName: 'Venteros Ambulantes',
      },
      {
        id: 'linea-credito 1.5',
        name: 'Egresados',
        fieldName: 'Egresados',
      },
    ],
  },
]
