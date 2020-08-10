import Vue from 'vue'
import { asyncPostApi, getApi } from '@/http'

const initialState = () => {
  return {
    user: JSON.parse(localStorage.getItem('user') || '{}'),
  }
}

const state = initialState()

const mutations = {
  LOGOUT(state) {
    localStorage.clear()
    state.user = {}
  },
  SET_USER(state, user) {
    state.user = user
    localStorage.setItem('token', user.token)
    localStorage.setItem('user', JSON.stringify(user))
  },
  SET_DP(state, payload) {
    Vue.set(state.user, 'user_display_pic', payload)
  },
  SET_BASIC(state, payload) {
    Object.keys(payload).forEach((key) => {
      Vue.set(state.user, key, payload[key])
    })
  },
  SET_INFO(state, payload) {
    Object.keys(payload).forEach((key) => {
      Vue.set(state.user, key, payload[key])
    })
  },
  RESET_USER_STATE(state) {
    Object.assign(state, initialState())
  },
}

const getters = {
  user: (state) => state.user,
}

const actions = {
  FETCH_USERS: (payload) => {
    return getApi(`getProfile/${payload}`)
  },
  async signup({ commit }, payload) {
    const response = await asyncPostApi('register', payload)
    commit('SET_USER', response.data)
  },
  async login({ commit }, payload) {
    const response = await asyncPostApi('login', payload)
    commit('SET_USER', response.data)
  },
  async logout({ commit }) {
    commit('LOGOUT')
  },
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations,
}
