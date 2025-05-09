import axios from 'axios'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const api = axios.create({
  baseURL: BASE_URL,
});