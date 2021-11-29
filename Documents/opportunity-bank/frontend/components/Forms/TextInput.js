import React from 'react'
import { useField } from 'formik'

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="flex flex-col my-1 text-color_black_1 w-full mb-6" key={props.key}>
      <label htmlFor={props.name}> {label} </label>
      <div className="md:flex h-10">
        <input
          id={props.name}
          name={props.name}
          {...field}
          {...props}
          className={`${props.className} rounded-lg border border-gray-400 w-full`}
        />
        <div>
          {meta.touched && meta.error ? <div className="error">{`${meta.error}`}</div> : null}
        </div>
      </div>
    </div>
  )
}

export default TextInput
