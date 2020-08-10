<template>
  <v-toolbar color="#282828" class="fluid white--text" :floating="disabled">
    <v-btn class="hamburger" icon @click="$emit('toggleNav')">
      <v-icon class="hamburger">menu</v-icon>
    </v-btn>

    <v-toolbar-title>User Friendly Exchange</v-toolbar-title>

    <!-- <v-col md="2" sm="8">
         <v-card-text class="text-right text-lg-left hidden-sm-and-down">
         <h4 class="title h4">User Friendly Exchange</h4>
         </v-card-text>

         <v-col class="hidden-md-and-up">
         <v-img
         class="shrink mt-3 mb-2 circ"
         contain
         height="40px"
         :src="require('@/assets/logo.png')"
         style="flex-basis: 65px"
         ></v-img>
         </v-col>
         </v-col> -->

    <v-spacer class="hidden-xs-only"></v-spacer>

    <!-- <v-flex md2 class="text-center hidden-sm-and-down">
      <v-layout row wrap>
        <span class="body-1 green--text mr-2">Cash credits:</span>

        <span> $ {{ userWallet.cash }} </span>
      </v-layout>
    </v-flex> -->

    <v-btn class="text-none" @click="logout()" rounded depressed text>
      <span>
        Log out
      </span>
    </v-btn>
  </v-toolbar>
</template>
<script>
// import {eut} from '@/mixins/functions'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    disabled: false,
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('profile/logout')
      this.$router.push({ name: 'login' })
    },
  },
  computed: {
    ...mapGetters('userWallet', ['userWallet']),
  },
}
</script>
<style type="scss" scoped>
.v-btn span,
.hamburger,
.v-toolbar__title {
  background: linear-gradient(#ce634a, #fab136);
  background: -webkit-linear-gradient(#ce634a, #fab136);
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
