import * as React from 'react'
import { useAuthContext } from '../../../auth-context'

function Search(props) {
  const { isAuth, status, dispatch, rol } = useAuthContext()
  const ROLES = ['ADMINISTRADOR', 'SUPERADMINISTRADOR']

  const initialState = {
    userId: '',
    loading: false,
    data: [],
    error: '',
  }

  const handleChange = ({ target }) => {
    props.setSearch({
      ...props.search,
      [target.name]: target.value,
    })
  }

  const handleClean = event => {
    event.preventDefault()
    if (ROLES.includes(rol)) {
      props.setSearch({
        ...initialState,
        data: props.firstCallAPI,
      })
    } else {
      props.setSearch(initialState)
    }
  }

  const handleSearch = async event => {
    event.preventDefault()
    props.setSearch({
      ...props.search,
      loading: true,
    })

    if (props.search.userId === '') {
      props.setSearch({ ...initialState, data: props.firstCallAPI })
      return
    }

    if (!Number(props.search.userId)) {
      props.setSearch({
        ...initialState,
        data: props.firstCallAPI,
        error: 'Debes ingresar un documento',
      })

      setTimeout(() => {
        props.setSearch({
          ...initialState,
          data: props.firstCallAPI,
        })
      }, 3000)
      return
    }

    try {
      // const URL = `https://oportunitybank.azurewebsites.net/api/v1/credito/solicitud/usuario/${props.search.userId}`
      const URL = `${process.env.NEXT_PUBLIC_CREDITSOLICITATION_V1}/credito/solicitud/usuario/${props.search.userId}`
      const res = await fetch(URL)

      if (res.status === 200) {
        const data = await res.json()
        console.log(data, 'here 🧬🧬🧬🧬🧬🧬')
        props.setSearch({
          ...props.search,
          loading: false,
          data: data,
          error: '',
        })
      }

      if (res.status === 404) {
        const data = await res.json()
        props.setSearch({
          ...props.search,
          loading: false,
          data: [],
          error: `${data.message}, el usuario no ha empezado con el formulario`,
        })

        setTimeout(() => {
          props.setSearch({
            ...initialState,
            data: props.firstCallAPI,
          })
        }, 5000)
      }
    } catch (err) {
      props.setSearch({
        ...props.search,
        data: props.firstCallAPI,
        loading: false,
      })
    }
  }

  return (
    <div className="w-full my-8 items-center md:items-baseline justify-between  flex flex-col md:flex-row mx-auto md:w-4/5">
      <div className="w-full mb-4 md:w-3/4">
        <div className="flex relative items-center">
          <input
            type="text"
            className="w-full border rounded-full px-4 py-2 text-center"
            placeholder="Buscar por cédula"
            name="userId"
            value={props.search.userId}
            onChange={handleChange}
          />
          <img src="/Search-Icon.svg" alt="search" className="absolute right-4" />
        </div>
      </div>
      <div className="flex h-12 mb-8 md:mb-0">
        <button
          className="bg-color_primary_2_ligth text-white px-4 ml-2 font-bold rounded-full"
          type="submit"
          onClick={handleSearch}
        >
          Buscar
        </button>
        <button
          type="submit"
          onClick={handleClean}
          className="bg-color_primary_1 text-white px-4 font-bold rounded-full ml-2"
        >
          Limpiar
        </button>
      </div>
    </div>
  )
}

export default Search
