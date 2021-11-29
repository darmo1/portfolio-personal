const classInput = 'h-10 border border-gray-400 px-4'

export const DataBasicInformation = [
  {
    id: 63,
    name: 'tipo_identificacion',
    fieldName: 'Tipo de identificacion',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 63.1,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 63.2,
        name: 'C.C',
        fieldName: 'C.C',
      },
      {
        id: 63.3,
        name: 'C.E',
        fieldName: 'C.E',
      },
      {
        id: 63.4,
        name: 'P.E.P',
        fieldName: 'P.E.P',
      },
    ],
  },
  {
    id: 64,
    name: 'num_identificacion',
    fieldName: 'No. De identificación',
    type: 'number',
    className: `${classInput}`,
  },
  {
    id: 66,
    name: 'primer_nombre',
    fieldName: 'Primer Nombre',
    type: 'text',
    className: `${classInput}`,
  },
  {
    id: 67,
    name: 'segundo_nombre',
    fieldName: 'Segundo Nombre',
    type: 'text',
    className: `${classInput}`,
  },
  {
    id: 68,
    name: 'primer_apellido',
    fieldName: 'Primer Apellido',
    type: 'text',
    className: `${classInput}`,
  },
  {
    id: 69,
    name: 'segundo_apellido',
    fieldName: 'Segundo Apellido',
    type: 'text',
    className: `${classInput}`,
  },
  {
    id: 70,
    name: 'fecha_nacimiento',
    fieldName: 'Fecha de nacimiento',
    type: 'date',
    className: `${classInput}`,
  },

  {
    id: '70-a',
    name: 'seguridad_social',
    fieldName: 'Seguridad Social',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 11.1,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
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
    id: '70-b',
    name: 'num_identificacion_deudor',
    fieldName: 'No. De identificación del deudor',
    type: 'number',
    className: `${classInput}`,
  },
]

//   {
//     id: 65,
//     name: "genero",
//     fieldName: "Sexo",
//     type: "select",
//     className: `${classInput}`,
//     options: [
//       {
//         id: 65.1,
//         name: "",
//         fieldName: "--Selecciona un campo--",
//         className: `${classInput}`,
//       },
//       {
//         id: 65.2,
//         name: "Masculino",
//         fieldName: "Masculino",
//         className: `${classInput}`,
//       },
//       {
//         id: 65.3,
//         name: "Femenino",
//         fieldName: "Femenino",
//         className: `${classInput}`,
//       },
//       {
//         id: 65.4,
//         name: "N/a",
//         fieldName: "No aplica",
//         className: `${classInput}`,
//       },
//     ],
//   },

//   {
//     id: 71,
//     name: "vivienda",
//     fieldName: "Vivienda",
//     type: "select",
//     className: `${classInput}`,
//     options: [
//       {
//         id: 71.1,
//         name: "",
//         fieldName: "--Selecciona un campo--",
//       },
//       {
//         id: 71.2,
//         name: "propia",
//         fieldName: "Propia",
//       },
//       {
//         id: 71.3,
//         name: "familiar",
//         fieldName: "Familiar",
//       },
//       {
//         id: 71.4,
//         name: "arrendada",
//         fieldName: "Arrendada",
//       }
//     ],
//   },
// ];

// export const datacodeudor = [
//   {
//     id: 75,
//     name: "direccion",
//     fieldName: "Dirección",
//     type: "text",
//     className: `${classInput}`,
//   },
//   {
//     id: 79,
//     name: "celular",
//     fieldName: "Número Celular",
//     type: "number",
//     className: `${classInput}`,
//   },
//   {
//     id: 78,
//     name: "telefono",
//     fieldName: "Teléfono",
//     type: "number",
//     className: `${classInput}`,
//   },
//   {
//     id: 80,
//     name: "correo",
//     fieldName: "Correo electrónico",
//     type: "email",
//     className: `${classInput}`,
//   },
// ];
