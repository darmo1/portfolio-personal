function TableHead({ children }) {
  return (
    <div className="table-responsive">
      <table className="mx-auto bg-white rounded-lg w-full">
        <thead className="border-b font-bold text-xs">
          <tr>
            <th className="p-4 text-center">Asignó solicitud</th>
            <th className="p-4 text-center">Solicitud</th>
            <th className="p-4 text-center">Nombre</th>
            <th className="p-4 text-center">Apellidos</th>
            <th className="p-4 text-center">C.C</th>
            <th className="p-4 text-center">Fecha</th>
            <th className="p-4 text-center">Estado</th>
            <th className="p-4 text-center">Ver</th>
          </tr>
        </thead>
        {children}
      </table>
    </div>
  )
}

export default TableHead
