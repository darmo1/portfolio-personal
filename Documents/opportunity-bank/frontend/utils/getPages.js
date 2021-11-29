export async function getDataFromPages({ limit = 10, page = 0 } = {}) {
  try {
    const url = `${process.env.NEXT_PUBLIC_AUTHSERVICE_V1}/roles/administrador?page=${page}&limit=${limit}`
    return fetch(url).then(res => res.json())
  } catch (err) {
    console.log(err)
  }
}
