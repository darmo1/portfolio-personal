const classInput = 'h-10 border border-gray-400 px-4'

export const DataInfoMate = [
  {
    id: 81,
    name: 'nombre',
    fieldName: 'Nombre completo del cónyugue',
    type: 'text',
    className: `${classInput}`,
  },
  {
    id: '81-a',
    name: 'num_identificacion',
    fieldName: 'No. De identificación',
    type: 'number',
    className: `${classInput}`,
  },
  {
    id: 83,
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
    id: 84,
    name: 'telefono',
    fieldName: 'Teléfono del cónyugue o pareja',
    type: 'number',
    className: `${classInput}`,
  },
  {
    id: '84-a',
    name: 'lugar_trabajo',
    fieldName: 'Lugar de trabajo de trabajo',
    type: 'text',
    className: `${classInput}`,
  },
  {
    id: 85,
    name: 'telefono_trabajo',
    fieldName: 'Telefono de lugar de trabajo',
    type: 'number',
    className: `${classInput}`,
  },
]
