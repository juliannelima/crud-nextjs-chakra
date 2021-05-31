import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://crud-chakra.netlify.app/api'
})