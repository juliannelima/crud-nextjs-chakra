import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://crud-chakra.netlify.app:3000/api'
})