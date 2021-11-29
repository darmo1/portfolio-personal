export const DataCreditInformation = [
  {
    id: 1,
    name: 'requestedmount',
    fieldName: 'Monto Solicitado',
    type: 'number',
    className: '',
  },
  {
    id: 2,
    name: 'moneyTerm',
    fieldName: 'Plazo (meses)',
    type: 'number',
    className: '',
  },
  {
    id: 3,
    name: '_type',
    fieldName: 'tipo',
    type: 'radio',
    className: '',
    options: [
      {
        id: 3.1,
        referenceName: '_type',
        name: 'nuevo',
        fieldName: 'Nuevo',
        type: 'radio',
        className: '',
      },
      {
        id: 3.2,
        referenceName: '_type',
        name: 'renovacion',
        fieldName: 'Renovación',
        type: 'radio',
        className: '',
      },
    ],
  },
  {
    id: 4,
    labelName: 'Pago',
    cName: '',
    type: 'select',
    options: [
      // {
      //   id: 4.1,
      //   name: '',
      //   fieldName: '--Selecciona un campo--',
      //   className: '',
      // },
      {
        id: 4.2,
        name: 'Semanal',
        type: 'option',
        cName: '',
      },
      {
        id: 4.3,
        name: 'Quincenal',
        type: 'option',
        cName: '',
      },
      {
        id: 4.4,
        name: 'Mensual',
        type: 'option',
        cName: '',
      },
    ],
  },
  {
    id: 5,
    name: 'businessType',
    fieldName: 'Subsector',
    type: 'select',
    className: '',
    options: [
      {
        id: 5.1,
        name: 'foods',
        fieldName: 'Alimentos',
        className: '',
      },
      {
        id: 5.2,
        name: 'cleanProducts',
        fieldName: 'Aseo',
        className: '',
      },
      {
        id: 5.3,
        name: 'crafts',
        fieldName: 'Artesano',
        className: '',
      },
      {
        id: 5.4,
        name: 'textile',
        fieldName: 'Textil',
        className: '',
      },
      {
        id: 5.5,
        name: 'wood',
        fieldName: 'Madera',
        className: '',
      },
      {
        id: 5.6,
        name: 'beauty',
        fieldName: 'Belleza',
        className: '',
      },
      {
        id: 5.7,
        name: 'tech',
        fieldName: 'tecnología',
        className: '',
      },
      {
        id: 5.8,
        name: 'maintenanceAndRepair',
        fieldName: 'Mantenimiento y Reparación',
        className: '',
      },
      {
        id: 5.9,
        name: 'stores',
        fieldName: 'Tiendas',
        className: '',
      },
      {
        id: 5.1,
        name: 'transport',
        fieldName: 'Transporte',
        className: '',
      },
      {
        id: 5.11,
        name: 'miscelanea',
        fieldName: 'Miscelanea',
        className: '',
      },
      {
        id: 5.12,
        name: 'depositos y ferreterias',
        fieldName: 'depositos y ferreterias',
        className: '',
      },
      {
        id: 5.13,
        name: 'liqueur',
        fieldName: 'Licores',
        className: '',
      },
      {
        id: 5.14,
        name: 'catalogSell',
        fieldName: 'Venta por catálogo',
        className: '',
      },
      {
        id: 5.15,
        name: 'delivery',
        fieldName: 'Mensajería',
        className: '',
      },
      {
        id: 5.16,
        name: 'informalSell',
        fieldName: 'Ventas Ambulantes',
        className: '',
      },
      {
        id: 5.16,
        name: 'other',
        fieldName: 'Otros',
        className: '',
      },
    ],
  },
]
