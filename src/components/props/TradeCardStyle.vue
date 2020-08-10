<template>
  <v-col lg="12" md="12" sm="12" cols="12">
    <v-divider class="mx-4" />
    <v-card flat>
      <v-col cols="12">
        <v-row justify="space-between" align="center">
          <v-col cols="2" md="2">
            <v-row justify="space-between" align="center">
              <v-col cols="12">
                <v-img
                  class="shrink mx-3 mt-3 mb-2 circ"
                  contain
                  height="50px"
                  :src="img"
                  style="flex-basis: 65px;"
                ></v-img>
              </v-col>

              <v-col cols="12" class="text-center mb-2">
                {{ name }}
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="10" md="10" class="px-2">
            <v-row justify="space-between" align="center">
              <v-col order-sm="1" md="3">
                {{ date }}
                <br class="hidden-xs-and-down" />
                {{ time }}
              </v-col>

              <v-col
                order-sm="3"
                class="px-3 hidden-md-and-up sm-6"
                v-if="!ifUserIsTrader"
              >
                <v-btn
                  class="text-none gradient black--text"
                  block
                  small
                  color="rgba(55,55,55,0.6)"
                  @click="$emit('popitem')"
                >
                  Trade
                </v-btn>
              </v-col>

              <v-col
                order-sm="3"
                md="5"
                class="px-3 hidden-sm-and-down sm-6"
                v-if="!ifUserIsTrader"
              >
                <v-btn
                  class="text-none gradient black--text"
                  block
                  large
                  color="rgba(55,55,55,0.6)"
                  @click="$emit('popitem')"
                >
                  Trade
                </v-btn>
              </v-col>

              <!-- BUTTONS -->

              <v-col
                order-sm="3"
                class="px-3 hidden-md-and-up sm-6"
                v-if="ifUserIsTrader"
              >
                <v-btn
                  class="text-none deletegrad white--text"
                  block
                  small
                  color="rgba(55,55,55,0.6)"
                  @click="tPin = true"
                >
                  Delete Trade
                </v-btn>
              </v-col>

              <v-col
                order-sm="3"
                md="5"
                class="px-3 hidden-sm-and-down sm-6"
                v-if="ifUserIsTrader"
              >
                <v-btn
                  class="text-none deletegrad white--text"
                  block
                  large
                  color="rgba(55,55,55,0.6)"
                  @click="tPin = true"
                >
                  Delete Trade
                </v-btn>
              </v-col>

              <v-col order-sm="2" md="4">
                <v-row justify="space-between" align="center" class="px-4">
                  <v-tooltip bottom :disabled="ifUserIsTrader">
                    <template v-slot:activator="{ on }">
                      <v-col cols="12" v-on="on">
                        <h3>Buy</h3>
                        <h3 style="text-transform: capitalize;">
                          {{ request_amount }} {{ request_currency }}
                        </h3>
                      </v-col>

                      <!-- <v-col cols="4" class="pl-5"> -->
                      <!-- <v-icon class="white--text">swap_horiz</v-icon> -->
                      <!-- </v-col> -->

                      <v-col cols="12" v-on="on">
                        <h3>For</h3>
                        <h3 style="text-transform: capitalize;">
                          {{ trade_amount }} {{ trade_currency }}
                        </h3>
                      </v-col>
                    </template>
                    <span style="text-transform: capitalize;"
                      >Trade your {{ trade_amount }} {{ trade_currency }} for
                      {{ request_amount }} {{ request_currency }}</span
                    >
                  </v-tooltip>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-card>

    <v-dialog v-model="tPin" :width="convertWidth" persistent>
      <v-card>
        <pin-card @close="tPin = false" @addPin="deleteTrade" />
      </v-card>
    </v-dialog>
  </v-col>
</template>
<script>
import PinCard from '@/components/props/PinCard.vue'

import { useSnackBar } from '@/compositions'
import { mapGetters, mapMutations } from 'vuex'
import { postApi } from '@/http'

export default {
  setup(_props, context) {
    const { showSnackBar } = useSnackBar(context)
    return { showSnackBar }
  },
  components: {
    PinCard,
  },
  props: [
    'card_index',
    'post_id',
    'id',
    'img',
    'date',
    'time',
    'name',
    'trade_amount',
    'trade_currency',
    'request_amount',
    'request_currency',
  ],
  data: () => ({
    transfer: false,
    tPin: false,
    formData: {},
    snackBarPayload: {},
    errMsg: ['Incorrect Transaction Pin!'],
  }),
  methods: {
    ...mapMutations('userWallet', ['POP_TRADE']),
    deleteTrade(pin) {
      let obj = this.formData
      obj.transaction_pin = pin

      postApi(`delete/myTrade/${this.post_id}`, obj).then((data) => {
        this.setMessage(data.message)
      })
    },
    setMessage(data) {
      switch (data) {
        case this.errMsg[0]:
          this.showSnackBar('error', 'Incorrect Transaction Pin')
          break
        default:
          this.showSnackBar('success', 'Post deleted')
          this.pop_tradeList(this.post_id)
      }
    },
    pop_tradeList(id) {
      this.POP_TRADE(id)
    },
  },
  computed: {
    ...mapGetters('profile', ['user']),
    ifUserIsTrader() {
      return this.id === this.user.id ? true : false
    },
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
  },
  mounted() {
    this.$echo.channel('channeltraderemove').listen('traderemove', (e) => {
      this.pop_tradeList(global._.toNumber(e.data.id))
    })
  },
}
</script>
<style type="text/css">
.shape {
  clip-path: polygon(10px 20px, 100% 0, 100% 100%, 0 100%);
}

.circ {
  clip-path: circle();
}

.borders {
  border: red 1px solid;
}
</style>
