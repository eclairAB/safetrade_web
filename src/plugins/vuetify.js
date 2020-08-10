import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '../styles/main.scss'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    primary: '#FFFFFF',
    secondary: '#333333',
    accent: '#F44336',
    error: '#a03605',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#a00606',
  },
  icons: {
    inconfot: 'md',
  },
})
