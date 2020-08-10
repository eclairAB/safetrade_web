<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col>
        <v-toolbar class="gradient" dark>
          <v-icon>assignment</v-icon>

          <v-toolbar-title>Transaction Logs</v-toolbar-title>

          <v-spacer></v-spacer>

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
                  <img :src="selected" />
                </v-avatar>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(item, index) in curr" :key="index">
                <v-list-item-avatar>
                  <img :src="item" @click="changeFilter(index)" />
                </v-list-item-avatar>
              </v-list-item>
            </v-list>
          </v-menu>
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
            <v-col
              class="pa-1"
              v-for="(item, index) in transactionList"
              :key="index"
            >
              <v-divider class="mx-3" v-if="index != 0" />

              <transaction-card-style
                :img_i="
                  item.sender_dp ? item.sender_dp : require('@/assets/user.png')
                "
                :type="item.transaction_option"
                :img_ii="
                  item.receiver_dp
                    ? item.receiver_dp
                    : require('@/assets/user.png')
                "
                :transfer_img="getSrc(item.currency_trade)"
                :request_img="getSrc(item.currency_request)"
                :transfer_txt="
                  transferText(
                    item.amount,
                    item.amount_two,
                    item.currency_request,
                    item.currency_trade,
                    item.sender_name,
                    item.receiver_name,
                    item.transaction_option
                  )
                "
                :time="sliceTime(item.created_at)"
                :date="sliceDate(item.created_at)"
              />
            </v-col>
          </v-container>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script type="text/javascript">
import TransactionCardStyle from '@/components/props/TransactionCardStyle.vue'
import Currencies from '@/components/common/currencies.js'
import { postApi } from '@/http'
import { mapGetters } from 'vuex'
export default {
  components: { TransactionCardStyle },
  mixins: [Currencies],
  data: () => ({
    transactionList: [],
    formData: {
      currencyFilter: 'all',
    },
  }),
  methods: {
    getSrc(currency) {
      return global._.get(this.curr, currency)
    },
    transferText(
      amount,
      amount2,
      request_cur,
      transfer_cur,
      sender_username,
      receiver_username,
      type
    ) {
      if (request_cur) {
        request_cur =
          request_cur.charAt(0).toUpperCase() + request_cur.substring(1)
      }
      if (transfer_cur) {
        transfer_cur =
          transfer_cur.charAt(0).toUpperCase() + transfer_cur.substring(1)
      }

      if (type === 'transfer') {
        if (sender_username === this.user.username) {
          return `You transfered ${amount} ${transfer_cur} to ${receiver_username}`
        } else {
          return `You received ${amount} ${transfer_cur} from ${sender_username}`
        }
      } else if (type === 'trade') {
        if (sender_username === this.user.username) {
          return `You traded your ${amount2} ${transfer_cur} for ${amount} ${request_cur} with ${receiver_username}`
        } else {
          return `You traded ${amount} ${request_cur} for your ${amount2} ${transfer_cur} with ${sender_username}`
        }
      } else if (type === 'Reload') {
        if (sender_username === this.user.username) {
          return `You successfully reloaded ${amount} ${request_cur} to ${receiver_username}`
        } else {
          return `You successfully reloaded ${amount} ${request_cur}`
        }
      } else if (type === 'Withdraw') {
        if (sender_username === this.user.username) {
          return `${receiver_username} successfully withdrawn ${amount} ${request_cur}`
        } else {
          return `You successfully withdrawn ${amount} ${request_cur}`
        }
      }
    },
    sliceTime(time) {
      return time.slice(11, 19)
    },
    sliceDate(date) {
      return date.slice(0, -17)
    },
    changeFilter(index) {
      this.formData.currencyFilter = index
      this.populate()
    },
    populate() {
      this.transactionList = []
      postApi(`filter/byCurrency`, this.formData).then((data) => {
        this.transactionList = Object.assign(
          {},
          this.transactionList,
          data.results
        )
      })
    },
  },
  computed: {
    ...mapGetters('userWallet', ['transactionLog']),
    ...mapGetters('profile', ['user']),
    selected() {
      return global._.get(this.curr, this.formData.currencyFilter)
    },
  },
  created() {
    this.populate()
  },
}
</script>
<style>
.circ {
  clip-path: circle();
}

.v-list__tile__content {
  text-align: right;
}
</style>
