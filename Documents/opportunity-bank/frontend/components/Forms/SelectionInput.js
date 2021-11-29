import React from 'react'
import { useField } from 'formik'

const SelectionInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  const renderFunc = props.children || props.render

  return (
    <div key={props.id} className="flex flex-col mb-6">
      <label className="font-medium mb-2">{label}</label>
      <div className="md:flex">
        <select
          {...field}
          className={`${props.className} rounded-lg border border-gray-400 w-full`}
        >
          <option
            className="text-center"
            value={props.value || ''}
          >{`<---- Selecciona un campo ---->`}</option>
          {props.options.map(renderFunc)}
        </select>
        <div>
          {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </div>
      </div>
    </div>
  )
}

export default SelectionInput
