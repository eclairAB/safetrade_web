<template>
  <div>
    <tool-bar @toggleNav="toggleNav" />
    <navigation-drawer :nav="nav" @setNav="setNav" />

    <v-content>
      <router-view />
    </v-content>
  </div>
</template>
<script>
import Console from 'console-browserify'
import { mapActions } from 'vuex'

import ToolBar from './dashboard_components/Toolbar.vue'
import NavigationDrawer from './dashboard_components/NavigationDrawer.vue'
export default {
  components: { ToolBar, NavigationDrawer },
  data: () => ({
    nav: false,
  }),
  methods: {
    ...mapActions('userWallet', ['FETCH_WALLET']),
    loadWallet() {
      this.FETCH_WALLET()
    },
    setNav(value) {
      this.nav = value
    },
    toggleNav() {
      this.setNav(!this.nav)
    },
  },
  created() {
    // -----------------------------------------------------------
    this.loadWallet()
    this.$echo.connector.socket.on('connect', () => Console.log('connected'))
  },
}
</script>
<style lang="scss">
.theme--light {
  &.v-btn {
    color: rgba(255, 255, 255);
  }

  &.v-toolbar {
    color: rgba(255, 255, 255);
  }

  &.v-navigation-drawer {
    background-color: #282828;
  }

  &.v-list {
    color: rgb(255, 255, 255);
  }
}

.circ {
  clip-path: circle();
}

.toolbar {
  z-index: 999;
}

.bottom-nav {
}

.h4 {
  font-size: 72px;
  background: -webkit-linear-gradient(#ce634a, #fab136);
  background: linear-gradient(#ce634a, #fab136);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
