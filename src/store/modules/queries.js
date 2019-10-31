import axios from "axios";

const API = "https://node-express-postgre.herokuapp.com/users";
const limitQuery = "limit=";
const limitUserResults = 10;
//const offsetQuery = 'offset='

export const getUsersQuery = async () => {
  const result = await axios.get(`${API}?${limitQuery}${limitUserResults}`);
  return result;
};
