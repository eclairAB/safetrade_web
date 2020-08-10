import Vue from 'vue'
import { getApi, postApi } from '@/http'
import Console from 'console-browserify'

const initialState = () => {
  return {
    userWallet: {},
    userList: {},
    searchQuery: [],
    tradeMarket: {},
  }
}

const state = initialState()

const mutations = {
  SET_WALLET(state, payload) {
    state.userWallet = Object.assign({}, state.userWallet, payload[0])
  },
  SET_UPDATE_WALLET(state, payload) {
    payload = payload[0]
    Object.keys(payload).forEach((key) => {
      Vue.set(state.userWallet, key, payload[key])
    })
  },
  SET_USERS_LIST(state, payload) {
    state.userList = Object.assign({}, state.userList, {})
    state.userList = payload
  },
  SET_QUERY(state, payload) {
    Object.keys(payload).forEach((key) => {
      state.searchQuery.push(payload[key].username)
    })
    state.searchQuery = global._.uniq(state.searchQuery)
  },
  SET_MARKET(state, payload) {
    state.tradeMarket = Object.assign({}, state.tradeMarket, payload)
  },
  POP_TRADE(state, payload) {
    let index = global._.findKey(state.tradeMarket, ['id', payload])
    Vue.delete(state.tradeMarket, index)
  },
  FILTER_POP(state, payload) {
    let index = global._.findKey(state.tradeMarket, ['id', payload])
    Vue.delete(state.tradeMarket, index)
  },
  DUMY_COMMIT(state, payload) {
    Console.log('test', state.tradeMarket)
    Console.log('test', payload)
  },
  RESET_WALLET_STATE(state, payload) {
    Object.assign(state, initialState())
    Console.log('test', payload)
  },
}

const getters = {
  userWallet: (state) => state.userWallet,
  userList: (state) => state.userList,
  searchQuery: (state) => state.searchQuery,
  tradeMarket: (state) => state.tradeMarket,
}

const actions = {
  FETCH_WALLET: ({ commit }) => {
    return getApi(`my/currencies`).then((data) => {
      commit('SET_WALLET', data.data)
    })
  },
  UPDATE_WALLET: ({ commit }) => {
    return getApi(`my/currencies`).then((data) => {
      commit('SET_UPDATE_WALLET', data.data)
      Console.log()
    })
  },
  TRANSFER_SEARCH: ({ commit }, payload) => {
    // unused
    return postApi(`search/other/user`, payload).then((data) => {
      commit('DUMY_COMMIT', data)
      return data
    })
  },
  FETCH_TRADE: ({ commit }) => {
    return getApi(`trade/list`).then((data) => {
      commit('SET_MARKET', data)
      Console.log('FETCH_TRADE', data)
    })
  },
  POST_TRADE: ({ commit }, payload) => {
    return postApi(`user/trade`, payload)
      .then((data) => {
        commit('DUMY_COMMIT', data)
        return data
      })
      .catch((data) => {
        Console.log(data)
        return data.data.message
      })
  },
  ACCEPT_TRADE: ({ commit }, payload) => {
    return postApi(
      `getUser/trade/${payload.post_id}/${payload.poster_id}`,
      payload
    )
      .then((data) => {
        commit('DUMY_COMMIT', payload.index)
        Console.log(data)
        return data
      })
      .catch((data) => {
        Console.log(data)
        return data
      })
  },
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations,
}
