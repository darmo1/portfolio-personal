function TableAdmin({ children }) {
  return (
    <div className="table-responsive">
      <table className="w-full mx-auto bg-white rounded-lg">
        <thead className="border-b font-bold">
          <tr>
            <th className="p-4 text-center">C.C</th>
            <th className="p-4 text-center">Nombres</th>
            <th className="p-4 text-center">Apellidos</th>
            <th className="p-4 text-center">Email</th>
            <th className="p-4 text-center">Rol</th>
            <th className="p-4 text-center">Acciones</th>
          </tr>
        </thead>
        {children}
      </table>
    </div>
  )
}

export default TableAdmin
