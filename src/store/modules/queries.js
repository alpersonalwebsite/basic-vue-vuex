import axios from "axios";

// The API used to be hardcoded to https://node-express-postgre.herokuapp.com/users,
// which no longer exists: Heroku retired its free dynos and the host answers 404 with
// "No such app". A Vuex demo that fetches from nothing is not much of a demo.
//
// Vue CLI exposes only VUE_APP_-prefixed variables to client code, and inlines them at
// BUILD time, so a value here lands in dist/js/app.*.js in plain sight. Fine for an
// endpoint, not for a key or token.
//
// The default is the local API from
// https://github.com/alpersonalwebsite/node-express-postgresql, the project the dead
// Heroku app was running. See the README for starting it.
const API = process.env.VUE_APP_API_URL || "http://localhost:3333/api/users";
const limitQuery = "limit=";
const limitUserResults = 10;

// Deliberately does NOT catch. A query's job is to fetch or throw; deciding what a
// failure means to the UI belongs to the action, which is the layer that owns the
// store's state. Swallowing it here is how you end up with a store that cannot tell
// "no users" from "the request failed".
export const getUsersQuery = async () => {
  const result = await axios.get(`${API}?${limitQuery}${limitUserResults}`);
  return result;
};

// node-express-postgresql answers { "data": [ ... ] }. The dead Heroku endpoint
// returned a bare array, and so do plenty of other APIs, so both are accepted: the
// first thing a reader does with this repo is point it somewhere else. Anything
// unrecognised becomes an empty list rather than a render error.
export const readUsers = body => {
  if (Array.isArray(body)) return body;
  if (body && Array.isArray(body.data)) return body.data;
  return [];
};
