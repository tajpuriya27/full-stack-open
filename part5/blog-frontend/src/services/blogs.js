import axios from "axios";
const baseUrl = "api/blogs";

let token = null;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (title) => {
  const response = await axios.post(baseUrl, title);
  return response.data;
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export default { getAll, create, setToken };
