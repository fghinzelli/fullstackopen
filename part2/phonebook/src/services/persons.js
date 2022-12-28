import axios from 'axios';

const API_URL = 'http://localhost:3001';

const getAll = () => {
  return axios.get(`${API_URL}/persons`)
}

const create = newPerson => {
  return axios.post(`${API_URL}/persons`, newPerson)
}

const update = (id, person) => {
  return axios.put(`${API_URL}/persons/${id}`, person)
}

const remove = id => {
  return axios.delete(`${API_URL}/persons/${id}`)
}

// eslint-disable-next-line
export default { getAll, create, update, remove }