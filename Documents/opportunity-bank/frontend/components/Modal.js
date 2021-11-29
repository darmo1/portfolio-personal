import * as React from 'react'
import ReactDOM from 'react-dom'
import { useRouter } from 'next/router'

const Modal = ({ Component, modalProps }) => {
  const [isBrowser, setIsBrowser] = React.useState(false)

  React.useEffect(() => {
    setIsBrowser(true)
  }, [])

  React.useEffect(() => {
    if (!modalProps.showModal) {
      setIsBrowser(false)
    }
  }, [modalProps, modalProps.showModal])

  if (isBrowser) {
    return ReactDOM.createPortal(<Component />, document.getElementById('modal-root'))
  } else {
    return null
  }
}

export default Modal
