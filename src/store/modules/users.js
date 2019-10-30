import { getUsersQuery } from './queries'

const state = {
  loadingUsers: false,
  users: []
}

const getters = {
  getterLoadingUsers: state => state.loadingUsers,
  getterUsers: state => state.users
}

const mutations = {
  setLoadingUsers: (state, payload) => state.setLoadingUsers = payload,
  setUsers: (state, payload) => state.users = payload
}

const actions = {
  getUsers: async ({ commit }) => {
    commit('setLoadingUsers', true)
    const result = apolloClient.query({
      query: getUsersQuery
    })
    if (result) {
      commit('setUsers', data.data.getUsers)
    }
    commit('setLoadingUsers', false)
      
  }
}