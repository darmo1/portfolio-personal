const classInput = 'h-10 border border-gray-400 px-4'

export const DataPrerequisitos = [
  {
    id: 'pr-1',
    name: 'rango_edad',
    fieldName: '¿Tienes entre 18 y 75 años de edad?',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 'pr-1.1',
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 'pr-1.2',
        name: true,
        fieldName: 'Si',
      },
      {
        id: 'pr-1.3',
        name: 'no',
        fieldName: 'No',
      },
    ],
  },
  {
    id: 'pr-2',
    name: 'estrato_valido',
    fieldName: '¿Vives en los estratos 1, 2 y 3 de Medellín o sus corregimientos?',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 'pr-2.1',
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 'pr-2.2',
        name: true,
        fieldName: 'Si',
      },
      {
        id: 'pr-2.3',
        name: 'no',
        fieldName: 'No',
      },
    ],
  },
  {
    id: 'pr-3',
    name: 'no_central_riesgo',
    fieldName:
      'No estar reportado en centrales de riesgo por más de 2.5 SMLV, ¿Cumples este requisito?',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 'pr-3.1',
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 'pr-3.2',
        name: true,
        fieldName: 'Si',
      },
      {
        id: 'pr-3.3',
        name: 'no',
        fieldName: 'No',
      },
    ],
  },
  {
    id: 'pr-4',
    name: 'no_deudas_vigentes',
    fieldName:
      'No tener deudas vigentes ni tarjetas de crédito en entidades financieras. ¿Cumples este requisito?',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 'pr-4.1',
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 'pr-4.2',
        name: true,
        fieldName: 'Si',
      },
      {
        id: 'pr-4.3',
        name: 'no',
        fieldName: 'No',
      },
    ],
  },
  {
    id: 'pr-5',
    name: 'ubicacion_negocio',
    fieldName:
      '¿El negocio que vas a crear o a fortalecer está ubicado en Medellín o en sus corregimientos, en cualquier estrato?.',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 'p5-1.1',
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 'p5-1.2',
        name: true,
        fieldName: 'Si',
      },
      {
        id: 'p5-1.3',
        name: 'no',
        fieldName: 'No',
      },
    ],
  },
]
