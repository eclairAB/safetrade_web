<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="hidden-md-and-up">
        <v-container>
          <v-card class="elevation-5 card" dark>
            <v-row justify="space-between">
              <!-- <v-flex class="pl-3">
                <v-img
                  class="shrink mx-2 mt-4 circ"
                  contain
                  height="45px"
                  :src="require('@/assets/usd.png')"
                  style="flex-basis: 125px"
                ></v-img>
              </v-flex> -->

              <!-- <v-flex xs8 pa-3>
                <v-layout justify-space-between top pb-2>
                  <span class="body-1">Cash credits</span>

                  <v-icon color="rgba(255,255,255,0.6)">help_outline</v-icon>
                </v-layout>
                <v-divider class="padding"/>

                <div class="headline1 mt-2">
                  $ {{ userWallet.cash }}
                </div>
              </v-flex> -->
            </v-row>
          </v-card>
        </v-container>
      </v-col>

      <!-- BTC wallet -->
      <wallet-card-style
        :img="curr.btc"
        currency="BTC"
        :balance="userWallet.btc"
      />

      <!-- ETH wallet -->
      <wallet-card-style
        :img="curr.eth"
        currency="ETH"
        :balance="userWallet.eth"
      />

      <!-- XRP wallet -->
      <wallet-card-style
        :img="curr.xrp"
        currency="XRP"
        :balance="userWallet.xrp"
      />

      <!-- LTC wallet -->
      <wallet-card-style
        :img="curr.ltc"
        currency="LTC"
        :balance="userWallet.ltc"
      />

      <!-- BCH wallet -->
      <wallet-card-style
        :img="curr.bch"
        currency="BCH"
        :balance="userWallet.bch"
      />

      <!-- EOS wallet -->
      <wallet-card-style
        :img="curr.eos"
        currency="EOS"
        :balance="userWallet.eos"
      />

      <!-- BNB wallet -->
      <wallet-card-style
        :img="curr.bnb"
        currency="BNB"
        :balance="userWallet.bnb"
      />

      <!-- USDT wallet -->
      <wallet-card-style
        :img="curr.usdt"
        currency="USDT"
        :balance="userWallet.usdt"
      />

      <!-- BSV wallet -->
      <wallet-card-style
        :img="curr.bsv"
        currency="BSV"
        :balance="userWallet.bsv"
      />

      <!-- TRX wallet -->
      <wallet-card-style
        :img="curr.trx"
        currency="TRX"
        :balance="userWallet.trx"
      />
    </v-row>
  </v-container>
</template>
<script type="text/javascript">
import WalletCardStyle from '@/components/props/WalletCardStyle.vue'
import Currencies from '@/components/common/currencies.js'

import { mapGetters } from 'vuex'

export default {
  components: {
    WalletCardStyle,
  },
  mixins: [Currencies],
  data: () => ({
    wallet: {
      _btc: '',
      _eth: '',
      _xrp: '',
      _ltc: '',
      _bch: '',
      _eos: '',
      _bnb: '',
      _usdt: '',
      _bsv: '',
      _trx: '',
    },
  }),
  computed: {
    ...mapGetters('userWallet', ['userWallet']),
  },
}
</script>
<style type="text/css"></style>
