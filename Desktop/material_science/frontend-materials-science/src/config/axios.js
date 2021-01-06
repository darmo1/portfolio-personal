import axios from 'axios'

export const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'  //El endpoint de la API process.env.REACT_APP_BACKEND_URL || y recuerde reemplazarla en en src de las imagenes en caso de que guarde las imagenes en la DB
})