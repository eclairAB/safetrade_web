import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import cors from 'cors'
import Croppa from 'vue-croppa'

import 'chart.js'
import 'hchs-vue-charts'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

import vuetify from './plugins/vuetify'
import './plugins/composition-api'
import './plugins/laravel-echo'

global._ = require('lodash')

export const bus = new Vue()

Vue.use(cors, window.VueCharts)
library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('croppa', Croppa.component)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
