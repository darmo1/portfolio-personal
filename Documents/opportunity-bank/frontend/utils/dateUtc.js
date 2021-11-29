export function dateUtc() {
  return new Date(
    new Date()
      .toLocaleString('en-US', {
        timeZone: 'America/Bogota',
      })
      .split('GMT')[0] + ' UTC',
  ).toISOString()
}
