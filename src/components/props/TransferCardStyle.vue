<template>
  <v-row>
    <v-card width="100%">
      <v-toolbar class="gradient" dark>
        <v-toolbar-title>Transfer</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- <v-btn
          class="text-none"
          rounded
          color="red"
          depressed
          @click.stop="">
          Cancel
        </v-btn> -->

        <v-btn
          class="text-none"
          rounded
          color="green darken-3"
          depressed
          :disabled="!formInput"
          @click.stop="transfer"
        >
          Transfer
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
            <v-col cols="12" class="pr-2">
              <v-row>
                <span class="caption grey--text">
                  Amount
                </span>

                <v-text-field
                  v-model="formData.amount"
                  @input="subtractToBalance"
                  flat
                  solo-inverted
                  class="text-none"
                  :rules="[rules.required, rules.decimalInput]"
                />
              </v-row>
            </v-col>

            <v-col cols="12" class="pr-2">
              <v-row>
                <span class="caption grey--text">
                  Receiver's Email
                </span>

                <v-text-field
                  v-model="formData.email"
                  flat
                  solo-inverted
                  class="text-none"
                  :rules="[rules.required, rules.emailrule]"
                />
              </v-row>
            </v-col>

            <v-col cols="12" class="pr-2">
              <v-row>
                <span class="caption grey--text">
                  Transaction Pin
                </span>

                <v-text-field
                  flat
                  :append-icon="show ? 'visibility_off' : 'visibility'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  v-model="formData.transaction_pin"
                  :rules="[rules.required, rules.digitonly]"
                  solo-inverted
                  @keyup.enter="transfer"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-form>

      <v-col>
        <v-row>
          <span class="ml-3 pb-3 caption grey--text">
            Current balance:
            <span class="orange--text">
              {{ balance }}
            </span>
          </span>

          <v-spacer></v-spacer>
        </v-row>
      </v-col>
    </v-card>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
import { postApi } from '@/http'
export default {
  props: ['img', 'balance', 'rid', 'curr'],
  data: () => ({
    snackBarPayload: {},
    formData: {},
    dummy: '',
    balance_after: '',
    show: false,
    errMsg: [
      'Insufficient Balance!',
      'Incorrect Credentials!',
      'Invalid Request Transfer!',
      'Invalid Request Transaction!',
      'Currently, you have an active trade, proceeding this transfer will exceed your balance.',
    ],
    formInput: false,
    rules: {
      required: (value) => !!value || 'Required.',
      textonly: (value) => {
        const pattern = /[0-9~`!@#$%^&*()_\\\-+={[\]}|;:'",<.>/?]/
        return pattern.test(value) ? 'Invalid Input.' : false
      },
      digitonly: (value) => {
        const pattern = /\D/
        return pattern.test(value) ? 'Invalid Input.' : false
      },
      decimalInput: (value) => {
        const pattern = /^(\d+)?(\.)?(\d+)$/
        return pattern.test(value) || 'Invalid input.'
      },
      emailrule: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    },
  }),
  methods: {
    ...mapActions('snackBar', ['showSnackBar']),
    ...mapActions('userWallet', ['UPDATE_WALLET']),
    select_a(item) {
      this.selecteda = item
    },
    select_b(item) {
      this.selectedb = item
    },
    transfer() {
      this.formData.transaction_option = 'transfer'
      this.formData.currency_trade = this.curr

      postApi(`user/transfer/${this.rid}`, this.formData)
        .then((data) => {
          this.setMessage(data.message)
        })
        .catch((data) => {
          this.dummy = data
          this.showPopup('error', 'Invalid transfer')
        })
    },
    subtractToBalance() {
      var difference = this.balance - this.formData.amount
      this.balance_after = difference ? difference : ''
    },
    showPopup(color, text) {
      this.snackBarPayload.color = color
      this.snackBarPayload.isShow = true
      this.snackBarPayload.text = text

      this.showSnackBar(this.snackBarPayload)
    },
    close: function () {
      this.$emit('close')
      this.formData = {}
    },
    setMessage(data) {
      switch (data) {
        case this.errMsg[0]:
          this.showPopup('error', 'Insufficient Balance')
          break
        case this.errMsg[1]:
          this.showPopup('error', 'Incorrect Credentials')
          break
        case this.errMsg[2]:
          this.showPopup('error', 'Insufficient Balance')
          break
        case this.errMsg[3]:
          this.showPopup('error', 'Invalid Request Transaction')
          break
        case this.errMsg[4]:
          this.showPopup(
            'error',
            'Insufficient Balance, Please check your trades'
          )
          break
        default:
          this.showPopup('success', 'Transfer successful')
          this.close()
      }
    },
  },
  created() {
    this.$echo.channel('channelwallet').listen('wallet', () => {
      this.UPDATE_WALLET()
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
</style>
