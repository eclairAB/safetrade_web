import {
  asyncGetApi
} from '@/http'

const state = {
  assets: [],
  assetPrices: [],
  isFetchingPrices: true,
  oldestTime: null,
}

const getters = {
  assets: (state) => state.assets,
  assetPrices: (state) => state.assetPrices,
  oldestTime: (state) => state.oldestTime,
  isFetchingPrices: (state) => state.isFetchingPrices,
}

const mutations = {
  SET_ASSETS: (state, payload) => {
    state.assets = payload
  },
  SET_ASSET_PRICES: (state, payload) => {
    state.assetPrices = payload
  },
  ADD_ASSET_PRICES: (state, payload) => {
    state.assetPrices = [...state.assetPrices, ...payload]
  },
  UPDATE_OLDEST_TIME: (state, payload) => {
    const length = payload.length
    if (length === 0) {
      return
    }
    const payloadOldestTime = payload[length - 1].timestamp
    state.oldestTime = state.oldestTime ?
      Math.min(payloadOldestTime, state.oldestTime) :
      payloadOldestTime
  },
  SET_IS_FETCHING_PRICES: (state, payload) => {
    state.isFetchingPrices = payload
  },
}

const actions = {
  async fetchAssets({
    commit
  }) {
    const {
      data
    } = await asyncGetApi('assets')
    commit('SET_ASSETS', data)
  },
  async setIsFetchingPrices({
    commit
  }, payload) {
    commit('SET_IS_FETCHING_PRICES', payload)
  },
  async addAssetPrices({
    commit
  }, payload) {
    //console.log(payload)
    commit('UPDATE_OLDEST_TIME', payload)
    commit('ADD_ASSET_PRICES', payload)
  },
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations,
}