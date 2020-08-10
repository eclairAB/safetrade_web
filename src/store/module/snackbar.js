const state = {
  snackBar: {
    color: '',
    text: '',
    show: false,
  },
}

const mutations = {
  SET_SNACK_BAR: (state, payload) => {
    state.snackBar = payload
  },
}

const getters = {
  snackBar: (state) => state.snackBar,
}

const actions = {
  showSnackBar: ({ commit }, payload) => {
    commit('SET_SNACK_BAR', { ...payload, show: true })
  },
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations,
}
