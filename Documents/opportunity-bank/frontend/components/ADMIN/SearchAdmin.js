import React from 'react'

const SearchAdmin = ({ IdSearched, dispatch, setLoading }) => {
  const handleSearch = async () => {
    if (IdSearched) {
      setLoading(true)
      try {
        const url_get_user = `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/roles/listar-usuario-rol/${IdSearched}`
        const res = await fetch(url_get_user)
        const dataUser = await res.json()

        if (res.status === 400) {
          dispatch({
            messageRol: `Hubo un error, no ha iniciado sesión en el portal por primera vez :( `,
          })
          setTimeout(() => {
            dispatch({ messageRol: '' })
          }, 5000)
          setLoading(false)
        }

        if (res.status === 200) {
          const filterUsers = [dataUser].filter(({ rolID }) => rolID === 1 || rolID === 4)
          dispatch({
            dataUser: filterUsers || [],
            messageRol: '',
            statusRol: filterUsers[0]?.rolID || '',
          })
          setLoading(false)
        }
      } catch (err) {
        setLoading(false)
      }
    }
  }
  const handleClean = () => {
    dispatch({ IdSearched: '' })
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between md:flex-row mx-auto md:w-4/5">
        <div className="w-full mb-4 md:w-4/5 md:mb-0">
          <div className="flex relative items-center">
            <input
              type="text"
              className="w-full border rounded-full px-4 py-2 text-center"
              placeholder="Buscar por cédula"
              name="userId"
              value={IdSearched}
              onChange={event => dispatch({ IdSearched: event.target.value })}
            />
            <img src="/Search-Icon.svg" alt="search" className="absolute right-4" />
          </div>
        </div>
        <div className="flex h-12 mb-8 md:mb-0">
          <button
            type="submit"
            onClick={handleSearch}
            className="bg-color_primary_2_ligth text-white px-4 ml-2 font-bold rounded-full"
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
    </>
  )
}

export default SearchAdmin
