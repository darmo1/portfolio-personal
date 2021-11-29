import React from 'react'
import { useField } from 'formik'

const TelInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="flex flex-col" key={props.key}>
      <label htmlFor={props.name}> {label} </label>
      <input
        // pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
        id={props.name}
        name={props.name}
        {...field}
        {...props}
        className={`${props.className} rounded-lg border-color_gray_2`}
      />
      {meta.touched && meta.error ? <div>{`${meta.error}`}</div> : null}
    </div>
  )
}

export default TelInput
