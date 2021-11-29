import React from 'react'

const INITIAL_PAGE = 0

const UsePagination = ({ loading = false }) => {
  const [page, setPage] = React.useState(INITIAL_PAGE)

  React.useEffect(() => {
    if (page === INITIAL_PAGE) return
  }, [page])

  return { setPage }
}

export default UsePagination
