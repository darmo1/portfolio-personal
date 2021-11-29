const classInput = 'h-10 border border-gray-400 px-4'

export const DataDestinationCreditForm = [
  {
    id: 1,
    name: 'tipo_solicitud',
    fieldName: 'Tipo de Solicitud',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 1.0,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 1.1,
        name: 'Creacion',
        fieldName: 'Creación',
      },
      {
        id: 1.2,
        name: 'Fortalecimiento',
        fieldName: 'Fortalecimiento',
      },
    ],
  },
  {
    id: 2,
    name: 'linea_credito',
    fieldName: 'Línea de crédito',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 2.0,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 2.1,
        name: 'Microempresarial',
        fieldName: 'Microempresarial',
      },
      {
        id: 2.2,
        name: 'Capital Semilla',
        fieldName: 'Capital Semilla',
      },
      {
        id: 2.3,
        name: 'Agroindustrial',
        fieldName: 'Agroindustrial',
      },
      {
        id: 2.4,
        name: 'Venteros ambulantes',
        fieldName: 'Venteros Ambulantes',
      },
      {
        id: 2.5,
        name: 'Egresados',
        fieldName: 'Egresados',
      },
    ],
  },
  {
    id: 3,
    name: 'tipo_credito',
    fieldName: 'Crédito',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 3.0,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 3.1,
        name: 'Nuevo',
        fieldName: 'Nuevo',
      },
      {
        id: 3.2,
        name: 'Renovación',
        fieldName: 'Renovación',
      },
    ],
  },
]

export const AmountCreditForm = [
  {
    id: 4,
    name: 'monto_solicitado',
    fieldName: 'Monto Solicitado',
    type: 'number',
    className: `${classInput}`,
  },
  {
    id: 5,
    name: 'plazo',
    fieldName: 'Plazo (meses)',
    type: 'number',
    className: `${classInput}`,
  },
]

export const DataDescriptionInversion = [
  {
    id: 8,
    name: 'descripcion',
    fieldName: 'Descripción de la inversión - ¿Cómo vas a invertir el capital de trabajo?',
    type: 'text-area',
    className: `h-18 border border-gray-400 min-h-18 p-4`,
  },
  // {
  //   id: 6,
  //   name: 'activos',
  //   fieldName: 'Activos - ¿Cuánto vas a invertir en equipos y máquinas?',
  //   type: 'number',
  //   className: `${classInput}`,
  //   min: 0
  // },
  // {
  //   id: 7,
  //   name: 'capital_trabajo',
  //   fieldName: 'Capital de trabajo - ¿Cuánto vas a invertir en insumos o materia prima?',
  //   type: 'number',
  //   className: `${classInput}`,
  //   min: 0
  // },
]
