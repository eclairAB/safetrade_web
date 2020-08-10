import { asyncPostApi } from '@/http'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  async addBet({}, { assetId, ...payload }) {
    if (!assetId) {
      throw 'assetId is required'
    }
    const { data } = await asyncPostApi(`/assets/${assetId}/bets`, payload)
    return data
  },
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations,
}
