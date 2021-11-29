import * as React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { dataForm, initialValueForm } from '../utils/dataForm'
import * as Yup from 'yup'

const Form232 = () => {
  return (
    <div>
      <h1> Form </h1>

      <Formik initialValues={initialValueForm} validationSchema={Yup.object({})} onSubmit={''}>
        {(formik, { isSubmitting }) => (
          <Form>
            {dataForm.map(item => (
              <div key={item.id}>
                <label>{item.labelName}</label>
                {item.type === 'select' ? (
                  <Field as="select" name={item.name}>
                    {item?.options.map(option => (
                      <option
                        key={option.id}
                        name={option.name}
                        value={option.name}
                        className={option.cName}
                      >
                        {option.name}
                      </option>
                    ))}
                  </Field>
                ) : (
                  <Field
                    id={item.id}
                    name={item.name}
                    type={item.type}
                    className={item.cName}
                  />
                )}
              </div>
            ))}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Form232
