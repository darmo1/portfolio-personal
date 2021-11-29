// import Acciones from '../Acciones'
// import BtnEstado from '../BtnEstado'

function TableRowSuperAdmin(props) {
  return (
    <tbody className="last:border-b-0 text-sm">
      <tr className="border-b font-section">
        <td className="text-center p-4">{props.cedula}</td>
        <td className="text-center p-4">{props.nombres}</td>
        <td className="text-center p-4">{props.apellidos}</td>
        <td className="text-center p-4">{props.correo}</td>
        <td className="text-center p-4">
          {' '}
          {
            <RenderSelect
              dataRoles={props.rol.dataRoles}
              currentRolUser={props.rol.rolUser}
              dipatch={props.rol.dipatch}
              statusRol={props.rol.statusRol}
              setBoxConfirmChange={props.rol.setBoxConfirmChange}
              setRolValueSelected={props.rol.setRolValueSelected}
              cedula={props.cedula}
            />
          }
        </td>
        <td className="text-center p-4">{'Ver'}</td>
      </tr>
    </tbody>
  )
}

export default TableRowSuperAdmin

function RenderSelect({
  dataRoles,
  statusRol,
  setBoxConfirmChange,
  setRolValueSelected,
  cedula,
}) {
  const handleChangeRol = e => {
    setBoxConfirmChange(true)
    setRolValueSelected({
      [e.target.name]: e.target.value,
      cedula: e.target.name,
      valor: e.target.value,
    })
  }
  return (
    <select name={cedula} value={statusRol} onChange={handleChangeRol}>
      {dataRoles.map(opt => {
        return (
          <option value={opt.id} key={opt.id}>
            {' '}
            {opt.nombre}{' '}
          </option>
        )
      })}
    </select>
  )
}
