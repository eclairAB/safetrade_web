import Vue from 'vue'
import Vuex from 'vuex'

import profile from './module/profile'
import snackBar from './module/snackbar'
import userWallet from './module/userWallet'
import assets from './module/assets'
import assetBets from './module/assetBets'
import chartData from './module/chartData'

Vue.use(Vuex)
const store = () => {
  return new Vuex.Store({
    modules: {
      chartData,
      assetBets,
      assets,
      profile,
      snackBar,
      userWallet,
    },
  })
}
export default store