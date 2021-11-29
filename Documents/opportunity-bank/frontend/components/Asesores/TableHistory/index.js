function TableHistory({ children }) {
  return (
    <div className="table-responsive">
      <table className="mx-auto bg-white rounded-lg w-full">
        <thead className="border-b font-bold text-xs">
          <tr>
            <th className="p-4 text-center">C.C</th>
            <th className="p-4 text-center">Nombres</th>
            <th className="p-4 text-center">Apellidos</th>
            <th className="p-4 text-center">Rol</th>
            <th className="p-4 text-center">Tipo de crédito</th>
            <th className="p-4 text-center">Fecha</th>
            <th className="p-4 text-center">Estado</th>
          </tr>
        </thead>
        {children}
      </table>
    </div>
  )
}

export default TableHistory
