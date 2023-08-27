import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export default { getAll, setToken };
