import axios from 'axios'

const API = 'https://node-express-postgre.herokuapp.com/users'
const limitQuery = 'limit='
const limitUserResults = 10
const offsetQuery = 'offset='


const getUsersQuery = async () => {
  const result = axios.get(`${API}?${limitQuery}${limitUserResults}`)
  if (result) {
    return result
  } else {
    //
  }
}

export default {
  getUsersQuery
}