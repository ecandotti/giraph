import axios, { AxiosInstance } from 'axios'
import { API_BASE } from '@configs/env'

/**
 * @type { AxiosInstance }
 * Axios instance of Giraph API
 */
const api: AxiosInstance = axios.create({
    baseURL: API_BASE,
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default api
