import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newPerson => {
  return axios.post(baseUrl, newPerson)
}

const update = (id, person) => {
  return axios.put(`${baseUrl}/${id}`, person)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

// eslint-disable-next-line
export default { getAll, create, update, remove }