import React from 'react'
import { Field, useField } from 'formik'

const RadioButtom = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  const renderFunc = props.children || props.render

  return (
    <React.Fragment key={props.key}>
      <div className="my-4 bg-red-600">
        <label>{label}</label>
        <div role="group" aria-labelledby="my-radio-group">
          {props.options.map(item => (
            <label key={item.id} {...props} {...field}>
              <Field type={item.type} value={item.name} name={item.referenceName} />
              {item.fieldName}
            </label>
          ))}
        </div>
        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
      </div>
    </React.Fragment>
  )
}

export default RadioButtom
