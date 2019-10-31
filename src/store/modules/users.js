import { getUsersQuery } from "./queries";

const state = {
  loadingUsers: false,
  users: []
};

const getters = {
  getterLoadingUsers: state => state.loadingUsers,
  getterUsers: state => state.users
};

const mutations = {
  setLoadingUsers: (state, payload) => (state.loadingUsers = payload),
  setUsers: (state, payload) => (state.users = payload)
};

const actions = {
  getUsers: async ({ commit }) => {
    commit("setLoadingUsers", true);
    const result = await getUsersQuery();
    if (result && result.data) {
      commit("setUsers", result.data);
    }
    commit("setLoadingUsers", false);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
