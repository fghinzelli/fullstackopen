import axios from 'axios';

const API_URL = 'http://localhost:3001';

const getAll = () => {
  return axios.get(`${API_URL}/persons`)
}

const create = newPerson => {
  return axios.post(`${API_URL}/persons`, newPerson)
}

// eslint-disable-next-line
export default { getAll, create }