const classInput = 'h-10 border border-gray-400 px-4'

export const DataMateForm = [
  {
    id: 20,
    name: 'nombre',
    fieldName: 'Nombre del cónyugue',
    type: 'text',
    className: `${classInput}`,
  },
  {
    id: 21,
    name: 'num_identificacion',
    fieldName: 'No. De identificación',
    type: 'number',
    className: `${classInput}`,
  },
  {
    id: 'conyugue-23',
    name: 'genero',
    fieldName: 'Sexo',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 'conyugue-23.01',
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 'conyugue-23.1',
        name: 'Masculino',
        fieldName: 'Masculino',
      },
      {
        id: 'conyugue-23.2',
        name: 'Femenino',
        fieldName: 'Femenino',
      },
      {
        id: 'conyugue-23.3',
        name: 'Otro',
        fieldName: 'Otro',
      },
      {
        id: 'conyugue-23.4',
        name: 'Prefiero no decir',
        fieldName: 'Prefiero no decir',
      },
    ],
  },
  {
    id: 22,
    name: 'telefono',
    fieldName: 'Teléfono del cónyugue o pareja',
    type: 'number',
    className: `${classInput}`,
  },
]
