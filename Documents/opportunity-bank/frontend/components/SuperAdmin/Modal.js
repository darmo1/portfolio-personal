import * as React from 'react'
import ReactDOM from 'react-dom'

function Modal(props) {
  return ReactDOM.createPortal(
    <div className={`${props.className}`}>{props.children}</div>,
    document.getElementById(`${props.nodo}`),
  )
}

export default Modal
