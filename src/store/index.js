import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    users: []
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user
    },
    setUsers(state, users) {
      state.users = users
    },
    toggleFriend(state, id) {
      const index = state.currentUser.friends.indexOf(id)
      if (index === -1) {
        state.currentUser.friends.push(id)
      } else {
        state.currentUser.friends.splice(index, 1)
      }
    }
  },
  actions: {
    fetchUsers({ commit }) {
      return axios.get('http://localhost:3000/users').then(res => {
        commit('setUsers', res.data)
      })
    },
    saveCurrentUser({ state }) {
      return axios.patch(`http://localhost:3000/users/${state.currentUser.id}`, state.currentUser)
    }
  },
  getters: {
    currentUser: state => state.currentUser,
    users: state => state.users.filter(u => !state.currentUser || u.id !== state.currentUser.id)
  }
})