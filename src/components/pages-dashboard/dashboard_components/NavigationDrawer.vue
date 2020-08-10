<template>
  <v-navigation-drawer
    :value="nav"
    :mini-variant="mini"
    @input="$emit('setNav')"
    class="theme--light.v-navigation-drawer bottom-nav"
    absolute
    dark
    temporary
  >
    <v-container class="gradient">
      <v-row justify="center" align="center">
        <v-col lg="3">
          <v-avatar size="60px">
            <img
              :src="user.user_display_pic ? user.user_display_pic : prefill"
            />
          </v-avatar>
        </v-col>

        <v-col lg="9">
          <v-card-text class="ml-2 white--text headline">
            {{ user.username }}
          </v-card-text>
        </v-col>

        <v-btn
          text
          depressed
          rounded
          class="body-1 text-none"
          :to="{ name: 'profile' }"
        >
          View Profile
        </v-btn>
      </v-row>
    </v-container>

    <v-list class="theme--light.v-list">
      <v-list-item :to="{ name: 'wallet' }">
        <v-list-item-action>
          <v-icon class="pl-3">credit_card</v-icon>
        </v-list-item-action>
        <v-list-item-title class="pl-4">My Wallet</v-list-item-title>
      </v-list-item>

      <v-list-item :to="{ name: 'trade-market' }">
        <v-list-item-action>
          <v-icon class="pl-3">store</v-icon>
        </v-list-item-action>
        <v-list-item-title class="pl-4">Trade market</v-list-item-title>
      </v-list-item>

      <v-list-item :to="{ name: 'transactions' }">
        <v-list-item-action>
          <v-icon class="pl-3">assignment</v-icon>
        </v-list-item-action>
        <v-list-item-title class="pl-4">Transactions</v-list-item-title>
      </v-list-item>

      <v-list-item :to="{ name: 'contact' }">
        <v-list-item-action>
          <v-icon class="pl-3">contact_mail</v-icon>
        </v-list-item-action>
        <v-list-item-title class="pl-4">Contact</v-list-item-title>
      </v-list-item>

      <v-list-item :to="{ name: 'chart-page' }">
        <v-list-item-action>
          <v-icon class="pl-3">show_chart</v-icon>
        </v-list-item-action>
        <v-list-item-title class="pl-4">Chart</v-list-item-title>
      </v-list-item>

      <v-list-item
        v-if="user.is_staff || user.is_superuser"
        :to="{ name: 'requests' }"
      >
        <v-list-item-action>
          <v-icon class="pl-3">mail</v-icon>
        </v-list-item-action>
        <v-list-item-title class="pl-4">Requests</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script type="text/javascript">
import Prefill from '@/assets/prefill.js'
import { mapGetters } from 'vuex'

export default {
  props: ['nav'],
  mixins: [Prefill],
  data: () => ({
    drawer: null,
    mini: false,
  }),
  computed: {
    ...mapGetters('profile', ['user']),
  },
}
</script>
