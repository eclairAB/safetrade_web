<template>
  <v-col cols="12" class="mt-4">
    <v-toolbar class="gradient" dark dense>
      <v-icon>store</v-icon>

      <v-toolbar-title>Recent Trades</v-toolbar-title>
    </v-toolbar>

    <v-card>
      <v-row>
        <v-col
          class="pa-1"
          cols="12"
          v-for="(item, index) in tradeList"
          :key="index"
        >
          <v-divider class="mx-4" v-if="index != '0'" />

          <trade-card-style
            :img="item.img"
            :date="item.date"
            :time="item.time"
            :name="item.name"
            :trade_amount="item.trade_amount"
            :trade_currency="item.trade_currency"
            :request_amount="item.request_amount"
            :request_currency="item.request_currency"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script type="text/javascript">
import TradeCardStyle from '@/components/props/TradeCardStyle.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: { TradeCardStyle },
  data: () => ({
    tradeList: [
      {
        id: '',
        img:
          'https://cdn.the-scientist.com/assets/articleNo/65643/aImg/31219/miriam-merad-t.png',
        date: 'Feb 23, 2019',
        time: '14:59',
        name: 'Kate',
        trade_amount: '14',
        trade_currency: 'BTC',
        request_amount: '39.45',
        request_currency: 'ETC',
      },
      {
        id: '',
        img:
          'https://res.cloudinary.com/allamerican/image/fetch/t_face_s270/https://speakerdata2.s3.amazonaws.com/photo/image/901344/PewDiePie.jpg',
        date: 'Feb 21, 2019',
        time: '16:59',
        name: 'Felix',
        trade_amount: '5',
        trade_currency: 'BTC',
        request_amount: '60.1023',
        request_currency: 'XRP',
      },
      {
        id: '',
        img:
          'https://pbs.twimg.com/profile_images/720190606727774208/8k2FwRDp.jpg',
        date: 'Mar 19, 2019',
        time: '09:31',
        name: 'Ricardo',
        trade_amount: '43',
        trade_currency: 'XRP',
        request_amount: '3',
        request_currency: 'BTC',
      },
    ],
  }),
  methods: {
    ...mapActions('userWallet', ['FETCH_TRADE', 'ACCEPT_TRADE']),
    ...mapActions('snackBar', ['showSnackBar']),
  },
  computed: {
    ...mapGetters('userWallet', ['tradeMarket']),
  },
}
</script>
<style type="text/css"></style>
