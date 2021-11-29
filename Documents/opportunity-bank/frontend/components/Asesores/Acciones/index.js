import * as React from 'react'
import Link from 'next/link'
import useClickOutsideComponent from '../../../Hooks/useClickOutsideComponent'
import { useRouter } from 'next/router'

function Acciones(props) {
  const { push } = useRouter()
  const [showMenuActions, setShowMenuActions] = React.useState(false)
  const wrapperRef = React.useRef(null)

  const handleActions = () => {
    setShowMenuActions(!showMenuActions)
  }

  return (
    <div className="relative cursor-pointer">
      <div ref={wrapperRef} onClick={handleActions} className="text-3xl text-gray-500">
        ...
      </div>

      {showMenuActions ? (
        <div className="p-4 border rounded-lg bg-white absolute -right-10 z-10">
          <ul className="w-full h-full">
            <li
              className="bg-white h-1/2 hover:bg-blue-300 hover:text-white flex items-center justify-center px-4"
              //onClick={handleClick}
            >
              <Link href={`/backoffice/${props.cedula}?sid=${props.id}`}>
                <a> Ver </a>
              </Link>
            </li>

            <li
              className="bg-white h-1/2 hover:bg-blue-300 hover:text-white flex items-center justify-center px-4"
              //onClick={handleClick}
            >
              <Link href={`/backoffice/${props.cedula}/historial?sid=${props.id}`}>
                <a> Historial  </a>
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default Acciones
