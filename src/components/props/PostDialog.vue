<template>
  <v-card width="100%">
    <v-toolbar class="gradient" dark>
      <v-icon>local_atm</v-icon>

      <v-toolbar-title>Post</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        class="text-none"
        rounded
        :disabled="!formInput"
        color="rgba(55,55,55,0.4)"
        depressed
        @click.stop="tPin = true"
      >
        Publish Post
      </v-btn>

      <v-btn
        class="text-none"
        icon
        color="rgba(198,52,59,0.7)"
        depressed
        @click="close"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-form v-model="formInput">
      <v-col class="px-3 pt-3">
        <v-row justify="center">
          <v-col cols="12" md="9" class="pr-2">
            <v-row align="center">
              <span class="caption grey--text text-center">
                Request Amount
              </span>

              <v-col class="align">
                <v-text-field
                  flat
                  solo-inverted
                  v-model="formData.request_amount"
                  class="text-none align-center mt-6"
                  :rules="[rules.required, rules.decimalInput]"
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="2">
            <v-row>
              <v-col>
                <span class="ml-2 caption grey--text">
                  Request Currency
                </span>
              </v-col>

              <v-col>
                <v-row>
                  <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        dark
                        large
                        rounded
                        depressed
                        class="text-none"
                        color="red lighten-1"
                        v-on="on"
                      >
                        {{ request_currency }}
                        <v-icon dark>arrow_drop_down</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item
                        v-for="item in items"
                        :key="item"
                        @click="request_currency = item"
                      >
                        <v-list-item-title v-text="item"></v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-divider class="mx-3" />

      <v-col class="px-3 pt-3">
        <v-row justify="center">
          <v-col cols="12" md="9" class="pr-2">
            <v-row>
              <span class="caption grey--text">
                Trade Amount
              </span>

              <v-text-field
                flat
                solo-inverted
                v-model="formData.trade_amount"
                class="text-none"
                :rules="[rules.required, rules.decimalInput]"
              />
            </v-row>
          </v-col>

          <v-col cols="12" md="2">
            <v-row>
              <v-col>
                <span class="ml-2 caption grey--text">
                  Trade Currency
                </span>
              </v-col>

              <v-col>
                <v-row>
                  <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        dark
                        large
                        rounded
                        depressed
                        class="text-none"
                        color="red"
                        v-on="on"
                      >
                        {{ trade_currency }}
                        <v-icon dark>arrow_drop_down</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item
                        v-for="item in items"
                        :key="item"
                        @click="trade_currency = item"
                      >
                        <v-list-item-title v-text="item"></v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-form>

    <v-dialog v-model="tPin" :width="convertWidth" persistent>
      <v-card>
        <pin-card @close="tPin = false" @addPin="trade" />
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script type="text/javascript">
// import { reloadEvent } from '@/mixins/functions'
import Currencies from '@/components/common/currencies.js'
import PinCard from '@/components/props/PinCard.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    PinCard,
  },
  props: ['trade_currency', 'request_currency'],
  mixins: [Currencies],
  data: () => ({
    snackBarPayload: {},
    formData: {},
    dummy: '',
    tPin: false,
    errMsg: [
      'Incorrect Transaction Pin!',
      'Currently, you have a pending trade. It will exceed your balance with this transaction.',
      'Invalid Request Trade!',
    ],
    formInput: false,
    rules: {
      required: (value) => !!value || 'Required.',
      decimalInput: (value) => {
        const pattern = /^(\d+)?(\.)?(\d+)$/
        return pattern.test(value) || 'Invalid input.'
      },
    },
  }),
  methods: {
    ...mapActions('userWallet', ['POST_TRADE', 'FETCH_TRADE']),
    ...mapActions('snackBar', ['showSnackBar']),
    trade(pin) {
      this.formData.transaction_pin = pin

      if (this.trade_currency === this.request_currency) {
        this.showPopup(
          'error',
          'Requested currency cannot be the same as trade currency'
        )
      } else {
        this.formData.trade_currency = this.trade_currency
        this.formData.request_currency = this.request_currency
        this.POST_TRADE(this.formData)
          .then((data) => {
            this.setMessage(data)
          })
          .catch((data) => {
            this.dummy = data
          })
      }
    },
    setMessage(data) {
      switch (data.message) {
        case this.errMsg[0]:
          this.showPopup('error', 'Incorrect transaction pin')
          break
        case this.errMsg[1]:
          this.showPopup(
            'error',
            'Insufficient ' + this.trade_currency + ' balance for trade'
          )
          break
        case this.errMsg[2]:
          this.showPopup(
            'error',
            'Insufficient ' + this.trade_currency + ' balance for trade'
          )
          break
        default:
          this.showPopup('success', 'Post successful')
          this.FETCH_TRADE()
          this.close()
      }
    },
    close: function () {
      this.formData.trade_amount = ''
      this.formData.request_amount = ''
      this.$emit('close')
    },
    showPopup(color, text) {
      this.snackBarPayload.color = color
      this.snackBarPayload.isShow = true
      this.snackBarPayload.text = text

      this.showSnackBar(this.snackBarPayload)
    },
  },
  computed: {
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
    this.$echo.channel('channelmarket').listen('trademarket', () => {
      this.$emit('reload')
    })
  },
}
</script>
