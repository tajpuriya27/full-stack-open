import axios from "axios";
const baseUrl = "api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const addPerson = (personToPost) => {
  return axios.post(baseUrl, personToPost).then((res) => res.data);
};

const updatePerson = (id, personToUpdate) => {
  return axios.put(`${baseUrl}/${id}`, personToUpdate).then((res) => res.data);
};

const delPerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

export default { getAll, addPerson, updatePerson, delPerson };
