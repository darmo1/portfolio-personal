const classInput = 'h-10 border border-gray-400 px-4'

export const DataPopulationVariables = [
  {
    id: '83-a.b',
    name: 'genero',
    fieldName: 'Sexo',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 83.1,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 83.2,
        name: 'Masculino',
        fieldName: 'Masculino',
      },
      {
        id: 83.3,
        name: 'Femenino',
        fieldName: 'Femenino',
      },
      {
        id: 83.4,
        name: 'N/a',
        fieldName: 'No aplica',
      },
    ],
  },
  {
    id: 86,
    name: 'estado_civil',
    fieldName: 'Estado Civíl',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 86.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 86.1,
        name: 'Soltero',
        fieldName: 'Soltero',
      },
      {
        id: 86.2,
        name: 'Casado',
        fieldName: 'Casado',
      },
      {
        id: 86.3,
        name: 'Viudo',
        fieldName: 'Viudo',
      },
      {
        id: 86.4,
        name: 'Union Libre',
        fieldName: 'Unión libre',
      },
      {
        id: 86.5,
        name: 'Divorciado',
        fieldName: 'Divorciado',
      },
    ],
  },

  {
    id: 88,
    name: 'nivel_escolaridad',
    fieldName: 'Nivel de escolaridad',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 88.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 88.1,
        name: 'Ninguno',
        fieldName: 'Ninguno',
      },
      {
        id: 88.2,
        name: 'Primaria',
        fieldName: 'Primaria',
      },
      {
        id: 88.3,
        name: 'Bachiller',
        fieldName: 'Bachiller',
      },
      {
        id: 88.4,
        name: 'Tecnico',
        fieldName: 'Técnico',
      },
      {
        id: 88.5,
        name: 'Tecnologo',
        fieldName: 'Tecnólogo',
      },
      {
        id: 88.6,
        name: 'Profesional',
        fieldName: 'Profesional',
      },
      {
        id: 88.7,
        name: 'Especialista',
        fieldName: 'Especialista',
      },
      {
        id: 88.8,
        name: 'Magister',
        fieldName: 'Magister',
      },
      {
        id: 88.9,
        name: 'Doctorado',
        fieldName: 'Doctorado',
      },
    ],
  },

  {
    id: 87,
    name: 'personas_a_cargo',
    fieldName: 'Numero de personas a cargo',
    type: 'number',
    className: `${classInput}`,
  },

  {
    id: 89,
    name: 'estado_laboral',
    fieldName: 'Estado Laboral',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 89.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 89.1,
        name: 'Empleado',
        fieldName: 'Empleado',
      },
      {
        id: 89.2,
        name: 'Desempleado',
        fieldName: 'Desempleado',
      },
    ],
  },
]
