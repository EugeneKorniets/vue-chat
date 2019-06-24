export const state = () => ({
  currentUser: {},

  messages: [],

  users: []
})

export const mutations = {
  setUser (state, user) {
    state.currentUser = user
  },

  clearData (state) {
    state.user = {}
    state.messages = []
    state.users = []
  },

  SOCKET_newMessage (state, message) {
    state.messages.push(message)
  },

  SOCKET_updateUsers (state, users) {
    state.users = users
  }
}

export const actions = {

}
