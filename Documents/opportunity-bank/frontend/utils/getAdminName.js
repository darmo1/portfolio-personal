export function getAdminName(ctxDataUsuarios, notification) {
  const boss = ctxDataUsuarios.find(
    ctxUser => ctxUser.cedula === notification.asesor?.asignador,
  )
  return `${boss?.nombres || ''} ${boss?.apellidos || ''}`
}
