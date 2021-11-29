const validForm = values => {
  const errors = {}
  for (var key of Object.keys(values)) {
    if (values[key]) {
    } else {
      errors[key] = 'Requerido'
    }
  }

  return errors
}

export default validForm
