export function ProcessForm(seccion) {
  switch (seccion) {
    case 'FDE_2':
      return {
        paso: 'paso 1 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
        numero: 2,
      }
    case 'FDE_3':
      return {
        paso: 'paso 2 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
        numero: 3,
      }
    case 'FDE_4':
      return {
        paso: 'paso 3 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
        numero: 4,
      }
    case 'FDE_5':
      return {
        paso: 'paso 4 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
        numero: 5,
      }
    case 'FDE_6':
      return {
        paso: 'paso 5 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
        numero: 6,
      }
    case 'FDE_7':
      return {
        paso: 'paso 6 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
        numero: 7,
      }
    case 'FDE_8':
      return {
        paso: 'paso 7 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
        numero: 8,
      }
    case 'FDE_9':
      return {
        paso: 'paso 8 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
        numero: 9,
      }

    case 'FCO_1':
      return {
        paso: 'paso 1 de 8',
        showHabeasData: true,
        showPrerrequisitosData: true,
      }

    case 'FCO_2':
      return {
        paso: 'paso 2 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
      }
    case 'FCO_3':
      return {
        paso: 'paso 3 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
      }
    case 'FCO_4':
      return {
        paso: 'paso 4 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
      }
    case 'FCO_5':
      return {
        paso: 'paso 5 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
      }
    case 'FCO_6':
      return {
        paso: 'paso 6 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
      }
    case 'FCO_7':
      return {
        paso: 'paso 7 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
      }
    case 'FCO_8':
      return {
        paso: 'paso 7 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
      }
    case 'FCO_9':
      return {
        paso: 'paso 8 de 8',
        showHabeasData: false,
        showPrerrequisitosData: false,
      }

    default:
      return {
        paso: 'paso 1 de 8',
        showHabeasData: true,
        showPrerrequisitosData: true,
        numero: 1,
      }
  }
}
