import React from 'react'
import { useField } from 'formik'

export const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="flex flex-col mb-6" key={props.key}>
      <label htmlFor={props.name}>{label}</label>
      <textarea
        id={props.name}
        name={props.name}
        {...field}
        {...props}
        className={`${props.className} rounded-lg border border-gray-400`}
      />
      <div>{meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}</div>
    </div>
  )
}
