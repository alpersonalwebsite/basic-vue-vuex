import { getUsersQuery, readUsers } from "./queries";

const state = {
  loadingUsers: false,
  // A store that tracks "loading" and not "failed" can only ever show a spinner or an
  // empty list, so a dead endpoint looks identical to a working one with no rows.
  usersError: null,
  users: []
};

const getters = {
  getterLoadingUsers: state => state.loadingUsers,
  getterUsersError: state => state.usersError,
  getterUsers: state => state.users
};

const mutations = {
  setLoadingUsers: (state, payload) => (state.loadingUsers = payload),
  setUsersError: (state, payload) => (state.usersError = payload),
  setUsers: (state, payload) => (state.users = payload)
};

const actions = {
  // The previous version committed setLoadingUsers(false) only on the success path:
  //
  //   commit("setLoadingUsers", true);
  //   const result = await getUsersQuery();     // throws when the API is down
  //   if (result && result.data) { ... }
  //   commit("setLoadingUsers", false);         // never reached
  //
  // so a failed request left loadingUsers stuck at true and the UI showed
  // "Loading..." forever, while the rejection escaped to whoever dispatched the
  // action (nobody, so: an unhandled rejection in the console).
  //
  // try/catch/finally is what makes the flag mean what its name says. The action does
  // not rethrow: a component dispatches it and then reads the getters, which is the
  // Vuex way round, and it means a caller that forgets .catch cannot produce an
  // unhandled rejection.
  getUsers: async ({ commit }) => {
    commit("setLoadingUsers", true);
    commit("setUsersError", null);

    try {
      const result = await getUsersQuery();
      commit("setUsers", readUsers(result && result.data));
    } catch (err) {
      commit("setUsersError", err.message);
      commit("setUsers", []);
    } finally {
      commit("setLoadingUsers", false);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
