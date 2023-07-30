import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const addPerson = (personToPost) => {
  return axios.post(baseUrl, personToPost).then((res) => res.data);
};

const updatePerson = (id, personToUpdate) => {
  return axios.put(`${baseUrl}/${id}`, personToUpdate).then((res) => res.data);
};
export default { getAll, addPerson, updatePerson };
