import Vue from 'vue'
import VueEcho from 'vue-echo-laravel'
import config from '../config'

window.io = require('socket.io-client')

Vue.use(VueEcho, {
  broadcaster: 'socket.io',
  host: config.SOCKET_URL,
  auth: {
    headers: {
      Authorization: 'Bearer ' + config.SOCKET_KEY,
    },
  },
})
