const classInput = 'h-10 border border-gray-400 px-4 '

export const dataPopulationVariables = [
  {
    id: 23,
    name: 'genero',
    fieldName: 'Sexo',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 23.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 23.1,
        name: 'Masculino',
        fieldName: 'Masculino',
      },
      {
        id: 23.2,
        name: 'Femenino',
        fieldName: 'Femenino',
      },
      ,
      {
        id: 23.3,
        name: 'Otro',
        fieldName: 'Otro',
      },
      {
        id: 23.4,
        name: 'Prefiero no decir',
        fieldName: 'Prefiero no decir',
      },
    ],
  },
  {
    id: 24,
    name: 'orientacion_sexual',
    fieldName: 'Orientación sexual',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 24.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 24.1,
        name: 'LGBTI',
        fieldName: 'LGBTI',
      },
      {
        id: 24.2,
        name: 'OTRO',
        fieldName: 'Otro',
      },
      {
        id: 24.3,
        name: 'Heterosexual',
        fieldName: 'Heterosexual',
      },
    ],
  },
  {
    id: 25,
    name: 'etnia',
    fieldName: 'Etnia',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 25.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 25.1,
        name: 'Afrocolombiano',
        fieldName: 'AfroColombiano',
      },
      {
        id: 25.2,
        name: 'Indigena',
        fieldName: 'Indígena',
      },
      {
        id: 25.3,
        name: 'Otro',
        fieldName: 'Otro',
      },
      {
        id: 25.4,
        name: 'No aplica',
        fieldName: 'No aplica',
      },
    ],
  },

  {
    id: 26,
    name: 'discapacidad',
    fieldName: 'Discapacidad',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 26.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 26.1,
        name: 'SI',
        fieldName: 'SI',
      },
      {
        id: 26.2,
        name: 'NO',
        fieldName: 'NO',
      },
    ],
  },
  {
    id: 27,
    name: 'victima',
    fieldName: 'Victima',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 27.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 27.1,
        name: 'SI',
        fieldName: 'SI',
      },
      {
        id: 27.2,
        name: 'NO',
        fieldName: 'NO',
      },
    ],
  },
  {
    id: 28,
    name: 'poblacion_campesina',
    fieldName: 'Población campesina',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 28.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 28.1,
        name: 'SI',
        fieldName: 'SI',
      },
      {
        id: 28.2,
        name: 'NO',
        fieldName: 'NO',
      },
    ],
  },
  {
    id: 29,
    name: 'estado_civil',
    fieldName: 'Estado Civíl',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 29.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 29.1,
        name: 'Soltero',
        fieldName: 'Soltero',
      },
      {
        id: 29.2,
        name: 'Casado',
        fieldName: 'Casado',
      },
      {
        id: 29.3,
        name: 'Viudo',
        fieldName: 'Viudo',
      },
      {
        id: 29.4,
        name: 'Union Libre',
        fieldName: 'Unión libre',
      },
      {
        id: 29.5,
        name: 'Divorciado',
        fieldName: 'Divorciado',
      },
    ],
  },
  {
    id: 30,
    name: 'nivel_escolaridad',
    fieldName: 'Nivel de escolaridad',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 30.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 30.1,
        name: 'Ninguno',
        fieldName: 'Ninguno',
      },
      {
        id: 30.2,
        name: 'Primaria',
        fieldName: 'Primaria',
      },
      {
        id: 30.3,
        name: 'Bachiller',
        fieldName: 'Bachiller',
      },
      {
        id: 30.4,
        name: 'Tecnico',
        fieldName: 'Técnico',
      },
      {
        id: 30.5,
        name: 'Tecnologo',
        fieldName: 'Tecnólogo',
      },
      {
        id: 30.6,
        name: 'Profesional',
        fieldName: 'Profesional',
      },
      {
        id: 30.7,
        name: 'Especialista',
        fieldName: 'Especialista',
      },
    ],
  },
  {
    id: 31,
    name: 'rol_hogar',
    fieldName: 'Rol en el hogar',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 31.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 31.1,
        name: 'Cabeza Hogar',
        fieldName: 'Cabeza de Hogar',
      },
      {
        id: 31.2,
        name: 'Aporta economicamente',
        fieldName: 'Aporta economicamente',
      },
      {
        id: 31.3,
        name: 'No aporta',
        fieldName: 'No aporta ',
      },
    ],
  },
]
