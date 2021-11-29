import * as React from 'react'
import { useField } from 'formik'

const DateInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div key={props.key} className="mb-6">
      <label htmlFor={props.name}> {label} </label>
      <div className="md:flex h-10">
        <input
          id={props.name}
          name={props.name}
          {...field}
          {...props}
          className="border rounded-lg border-gray-400 h-10 w-full sm:w-1/3"
        />
        <div>
          {meta.touched && meta.error ? <div className="error">{`${meta.error}`}</div> : null}
        </div>
      </div>
    </div>
  )
}

export default DateInput
