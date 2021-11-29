const classInput = 'h-10 border border-gray-400 px-4'
export const DataInfoBusiness = [
  {
    id: '42-name',
    name: 'nombre_negocio',
    fieldName: 'Nombre del negocio',
    type: 'text',
    className: `${classInput}`,
  },
  {
    id: 42,
    name: 'direccion',
    fieldName: 'Dirección del negocio',
    type: 'text',
    className: `${classInput}`,
  },
  {
    id: '42.a',
    name: 'fecha_creacion',
    fieldName: 'Fecha de creacion del negocio',
    type: 'date',
    className: `${classInput}`,
  },
  {
    id: '42.b',
    name: 'telefono',
    fieldName: 'Teléfono',
    type: 'number',
    className: `${classInput}`,
  },

  {
    id: 32,
    name: 'macrosector',
    fieldName: 'Macro-Sector',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 32.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 32.1,
        name: 'Comercio',
        fieldName: 'Comercio',
      },
      {
        id: 32.2,
        name: 'Producción',
        fieldName: 'Producción',
      },
      {
        id: 32.3,
        name: 'Servicios',
        fieldName: 'servicios',
      },
      {
        id: 32.4,
        name: 'Agropecuario',
        fieldName: 'Agropecuario',
      },
    ],
  },
  {
    id: 33,
    name: 'subsector',
    fieldName: 'Subsector',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 33.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 33.0011,
        name: 'Alimentos',
        fieldName: 'Alimentos',
      },
      {
        id: 33.2,
        name: 'Aseo',
        fieldName: 'Aseo',
      },
      {
        id: 33.3,
        name: 'Artesanos',
        fieldName: 'Artesanos',
      },
      {
        id: 33.4,
        name: 'Textil',
        fieldName: 'Textil',
      },
      {
        id: 33.5,
        name: 'Madera',
        fieldName: 'Madera',
      },
      {
        id: 33.6,
        name: 'Belleza',
        fieldName: 'Belleza',
      },
      {
        id: 33.7,
        name: 'Tecnología',
        fieldName: 'tecnología',
      },
      {
        id: 33.8,
        name: 'Mantenimiento y reparación',
        fieldName: 'Mantenimiento y Reparación',
      },
      {
        id: 33.9,
        name: 'Tiendas',
        fieldName: 'Tiendas',
      },
      {
        id: 33.1,
        name: 'Transporte',
        fieldName: 'Transporte',
      },
      {
        id: 33.11,
        name: 'Miscelaneas',
        fieldName: 'Miscelaneas',
      },
      {
        id: 33.12,
        name: 'Depositos y Ferretería',
        fieldName: 'depositos y ferreterías',
      },
      {
        id: 33.13,
        name: 'Licores',
        fieldName: 'Licores',
      },
      {
        id: 33.14,
        name: 'Ventas por Catalogo',
        fieldName: 'Ventas por catálogo',
      },
      {
        id: 33.15,
        name: 'Mensajería',
        fieldName: 'Mensajería',
      },
      {
        id: 33.16,
        name: 'Ventas Ambulantes',
        fieldName: 'Ventas Ambulantes',
      },
      {
        id: 33.17,
        name: 'Otros',
        fieldName: 'Otros',
      },
    ],
  },
  {
    id: 43,
    name: 'tipo_persona',
    fieldName: 'Tipo de persona',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 43.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },

      {
        id: 43.1,
        name: 'Natural',
        fieldName: 'Natural',
      },
      {
        id: 43.2,
        name: 'Juridica',
        fieldName: 'Jurídica',
      },
    ],
  },
  {
    id: 44,
    name: 'num_empl_permanentes',
    fieldName: 'Número de empleados permanentes',
    type: 'number',
    className: `${classInput}`,
  },
  {
    id: 45,
    name: 'num_empl_eventuales',
    fieldName: 'Número eventuales de empleados',
    type: 'number',
    className: `${classInput}`,
  },
  {
    id: 46,
    name: 'local',
    fieldName: 'Local',
    type: 'select',
    className: `${classInput}`,
    options: [
      // {
      //   id: 46.01,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      // },
      {
        id: 46.1,
        name: 'Propio',
        fieldName: 'Propio',
      },
      {
        id: 46.2,
        name: 'Arrendado',
        fieldName: 'Arrendado',
      },
    ],
  },
]
