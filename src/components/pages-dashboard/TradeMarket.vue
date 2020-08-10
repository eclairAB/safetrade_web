<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col>
        <v-toolbar class="gradient" dark :height="convertHeight">
          <v-row class="align-center pl-3">
            <v-col cols="1" sm="5">
              <v-row>
                <v-icon>store</v-icon>

                <v-toolbar-title class="hidden-xs-only"
                  >Trade market</v-toolbar-title
                >
              </v-row>
            </v-col>

            <v-spacer class="hidden-sm-and-down" />

            <v-col cols="11" sm="7">
              <v-row class="align-center justify-end">
                <v-card flat color="transparent">
                  <v-switch
                    v-model="filterSwitch"
                    color="orange darken-4"
                    hide-details
                  ></v-switch>
                </v-card>

                <v-avatar size="37px">
                  <img
                    src="https://image.flaticon.com/icons/svg/603/603183.svg"
                  />
                </v-avatar>

                <v-card
                  flat
                  color="transparent"
                  class="ml-4"
                  v-show="!filterSwitch"
                >
                  <v-row class="align-center">
                    BUY
                    <v-menu transition="slide-y-transition">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          dark
                          fab
                          small
                          depressed
                          class="text-none"
                          color="rgba(51, 51, 51, 0.4)"
                          v-on="on"
                        >
                          <v-avatar size="32px">
                            <img :src="selected(1)" />
                          </v-avatar>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item
                          v-for="(item, index) in marketFilter"
                          :key="index"
                        >
                          <v-list-item-avatar>
                            <img :src="item" @click="changeFilter(index, 1)" />
                          </v-list-item-avatar>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    FOR
                    <v-menu transition="slide-y-transition">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          dark
                          fab
                          small
                          depressed
                          class="text-none"
                          color="rgba(51, 51, 51, 0.4)"
                          v-on="on"
                        >
                          <v-avatar size="32px">
                            <img :src="selected(2)" />
                          </v-avatar>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item
                          v-for="(item, index) in marketFilter"
                          :key="index"
                        >
                          <v-list-item-avatar>
                            <img :src="item" @click="changeFilter(index, 2)" />
                          </v-list-item-avatar>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-row>
                </v-card>

                <v-btn
                  class="text-none ml-5"
                  rounded
                  color="rgba(55,55,55,0.4)"
                  depressed
                  @click.stop="transfer = true"
                >
                  Post
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-toolbar>

        <v-list two-line>
          <!-- <v-text-field
            class="mx-4 mt-2"
            flat
            label="Search"
            prepend-inner-icon="search"
            solo-inverted
          ></v-text-field> -->

          <v-container
            id="scroll-target"
            style="max-height: 670px;"
            class="overflow-y-auto"
          >
            <v-col v-for="(item, index) in filteredList" :key="index">
              <!-- {{index}}---{{item.id}} -->
              <trade-card-style
                v-show="
                  filterSwitch
                    ? true
                    : isDisplaySwapped(item.user_id)
                    ? filtered(item.trade_currency, item.request_currency)
                    : filtered(item.request_currency, item.trade_currency)
                "
                :card_index="index"
                :post_id="item.id"
                :id="item.user_id"
                :img="
                  item.trader_info.user_display_pic
                    ? item.trader_info.user_display_pic
                    : require('@/assets/user.png')
                "
                :date="sliceDate(item.created_at)"
                :time="sliceTime(item.created_at)"
                :name="item.trader_info.username"
                :trade_amount="
                  isDisplaySwapped(item.user_id)
                    ? item.request_amount
                    : item.trade_amount
                "
                :trade_currency="
                  isDisplaySwapped(item.user_id)
                    ? item.request_currency
                    : item.trade_currency
                "
                :request_amount="
                  isDisplaySwapped(item.user_id)
                    ? item.trade_amount
                    : item.request_amount
                "
                :request_currency="
                  isDisplaySwapped(item.user_id)
                    ? item.trade_currency
                    : item.request_currency
                "
                @popitem="cardButton(item.id, item.trader_info.id)"
              />
            </v-col>
          </v-container>
        </v-list>
      </v-col>
    </v-row>

    <v-dialog v-model="transfer" :width="convertWidth" persistent>
      <v-card>
        <post-dialog
          @close="postDialogCloseEvent"
          @reload="populate"
          :request_currency="filterData.currencyFilterI"
          :trade_currency="filterData.currencyFilterII"
        />
      </v-card>
    </v-dialog>

    <v-dialog v-model="tPin" :width="convertWidth" persistent>
      <v-card>
        <pin-card @close="tPin = false" @addPin="trade" />
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script type="text/javascript">
// import Vue from 'vue'
import Console from 'console-browserify'
import Currencies from '@/components/common/currencies.js'
import Datasource from '@/components/common/dataSource.js'
import PinCard from '@/components/props/PinCard.vue'
import PostDialog from '@/components/props/PostDialog.vue'
import TradeCardStyle from '@/components/props/TradeCardStyle.vue'

import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  components: { PinCard, PostDialog, TradeCardStyle },
  mixins: [Datasource, Currencies],
  data: () => ({
    dummy: '',
    filterSwitch: true,
    transfer: false,
    tPin: false,
    formData: {
      transaction_option: 'trade',
    },
    filterData: {
      currencyFilterI: 'btc',
      currencyFilterII: 'eth',
    },
    snackBarPayload: {},
    err: '',
    errMsg: [
      'Incorrect Transaction Pin!',
      'Invalid Request Trade!',
      'The trader has not enough balance to proceed with this transaction.',
      'The trader has not enough balance to proceed with this transaction.',
      'You dont have enough balance to proceed this transaction.',
      'This trade is already acquired by other user.',
    ],
  }),
  methods: {
    ...mapActions('userWallet', [
      'ACCEPT_TRADE',
      'FETCH_TRADE',
      'UPDATE_WALLET',
    ]),
    ...mapActions('snackBar', ['showSnackBar']),
    ...mapMutations('userWallet', ['POP_TRADE']),
    populate() {
      this.FETCH_TRADE()
    },
    postDialogCloseEvent() {
      this.transfer = false
    },
    pop_tradeList(id) {
      this.POP_TRADE(id)
    },
    sliceTime(time) {
      return time.slice(11, 19)
    },
    sliceDate(date) {
      return date.slice(0, -17)
    },
    cardButton(post_id, poster_id) {
      this.formData.post_id = post_id
      this.formData.poster_id = poster_id
      this.tPin = true
    },
    trade(pin) {
      this.formData.transaction_pin = pin

      this.ACCEPT_TRADE(this.formData)
        .then((data) => {
          this.setMessage(data.message)
        })
        .catch((data) => {
          this.err = data
          Console.log(data)
          this.showPopup('error', 'Transaction error')
        })
    },
    showPopup(color, text) {
      this.snackBarPayload.color = color
      this.snackBarPayload.isShow = true
      this.snackBarPayload.text = text

      this.showSnackBar(this.snackBarPayload)
    },
    setMessage(data) {
      switch (data) {
        case this.errMsg[0]:
          this.showPopup('error', 'Incorrect Transaction Pin')
          break
        case this.errMsg[1]:
          this.showPopup('error', 'Invalid Request Trade')
          break
        case this.errMsg[2]:
          this.showPopup(
            'error',
            'Trader balance is currently lacking for this trade'
          )
          break
        case this.errMsg[3]:
          this.showPopup(
            'error',
            'Trader balance is currently lacking for this trade'
          )
          break
        case this.errMsg[4]:
          this.showPopup(
            'error',
            'You have insufficient balance for this trade'
          )
          break
        case this.errMsg[5]:
          this.showPopup(
            'error',
            'This trade is already acquired by other user'
          )
          break
        default:
          this.showPopup('success', 'Trade successful')
          this.pop_tradeList(this.formData.post_id)
      }
    },
    changeFilter(index, filter) {
      if (filter === 1) {
        this.filterData.currencyFilterI = index
      } else {
        this.filterData.currencyFilterII = index
      }
      this.populate()
    },
    selected(filter) {
      return global._.get(
        this.marketFilter,
        filter === 1
          ? this.filterData.currencyFilterI
          : this.filterData.currencyFilterII
      )
    },
    filtered(req_curr, trade_curr) {
      return (
        req_curr === this.filterData.currencyFilterI &&
        trade_curr === this.filterData.currencyFilterII
      )
    },
    isDisplaySwapped(id) {
      /* this fcn will swap if the buy & sell depends on user level's perspective
       *
       * returns true if the trade is not from the one who posts it
       *
       * Technical: compares both the trader id of the post and the id of the current user logged in
       *            if id matched then it will return false.
       */

      return id === this.user.id ? false : true
    },
  },
  computed: {
    ...mapGetters('userWallet', ['tradeMarket']),
    ...mapGetters('profile', ['user']),
    convertWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '100%'
        case 'sm':
          return '100%'
        case 'md':
          return '80%'
        case 'lg':
          return '50%'
        case 'xl':
          return '30%'
      }
      return null
    },
    convertHeight() {
      switch (window.innerWidth) {
        case '693':
          Console.log('k')
          break
      }
      return null
    },
    filteredList() {
      let obj = []
      for (let item in this.tradeMarket) {
        obj.push(this.tradeMarket[item])
      }
      return global._.uniqBy(obj, 'id')
    },
  },
  mounted() {
    this.$echo.channel('channeltraderemove').listen('traderemove', (e) => {
      this.pop_tradeList(global._.toNumber(e.data))
    })
    this.$echo.channel('channelwallet').listen('wallet', () => {
      this.UPDATE_WALLET().then((data) => {
        Console.log()
        this.dummy = data
      })
    })
  },
  created() {
    this.populate()
  },
}
export const igit = function (a) {
  Console.log(a)
}
</script>
<style type="text/css"></style>
