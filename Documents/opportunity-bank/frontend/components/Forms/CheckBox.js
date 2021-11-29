import React from 'react'
import { Field, useField } from 'formik'

const CheckBox = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  const renderFunc = props.children || props.render

  return (
    <React.Fragment key={props.key}>
      <div>
        <label>{label}</label>
        <div role="group" aria-labelledby="my-radio-group">
          {props.options.map(item => (
            <label key={item.id} {...props} {...field}>
              <Field
                type={item.type}
                value={item.value}
                name={item.referenceName}
                className={item.className}
              />
              {item.fieldName}
            </label>
          ))}
        </div>
        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
      </div>
    </React.Fragment>
  )
}

export default CheckBox
