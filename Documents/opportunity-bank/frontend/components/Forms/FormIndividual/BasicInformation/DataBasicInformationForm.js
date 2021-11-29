const classInput = 'h-10 border border-gray-400 px-4 '

export const DataBasicInformationForm = [
  {
    id: 9,
    name: 'tipo_identificacion',
    fieldName: 'Tipo de identificacion',
    type: 'select',
    className: `${classInput}`,
    options: [
      {
        id: 9.2,
        name: 'C.C',
        fieldName: 'C.C',
      },
      {
        id: 9.3,
        name: 'C.E',
        fieldName: 'C.E',
        className: '',
      },
      {
        id: 9.4,
        name: 'P.E.P',
        fieldName: 'P.E.P',
      },
    ],
  },
  {
    id: 10,
    name: 'num_identificacion',
    fieldName: 'No. De identificación',
    type: 'number',
    className: `${classInput}`,
  },
  {
    id: 11,
    name: 'seguridad_social',
    fieldName: 'Seguridad Social',
    type: 'select',
    className: `${classInput}`,
    options: [
      {
        id: 11.2,
        name: 'EPS',
        fieldName: 'EPS',
      },
      {
        id: 11.3,
        name: 'Sisbén',
        fieldName: 'Sisbén',
      },
      {
        id: 11.4,
        name: 'N/a',
        fieldName: 'No Aplica',
      },
    ],
  },
  {
    id: 12,
    name: 'primer_nombre',
    fieldName: 'Primer Nombre',
    type: 'text',
    className: `${classInput}`,
  },
  {
    id: 13,
    name: 'segundo_nombre',
    fieldName: 'Segundo Nombre',
    type: 'text',
    className: `${classInput}`,
  },
  {
    id: 14,
    name: 'primer_apellido',
    fieldName: 'Primer Apellido',
    type: 'text',
    className: `${classInput}`,
  },
  {
    id: 15,
    name: 'segundo_apellido',
    fieldName: 'Segundo Apellido',
    type: 'text',
    className: `${classInput}`,
  },
  {
    id: 16,
    name: 'fecha_nacimiento',
    fieldName: 'Fecha de nacimiento',
    type: 'date',
    className: `${classInput}`,
  },
  {
    id: 17,
    name: 'razon_social',
    fieldName: `Razón Social`,
    type: 'text',
    className: `${classInput}`,
  },
  {
    id: 18,
    name: 'nit',
    fieldName: 'NIT',
    type: 'number',
    className: `${classInput}`,
  },
]
