<template>
  <v-card width="100%">
    <v-toolbar class="gradient" dark>
      <v-toolbar-title>
        {{ type === 'Reload' ? 'Reload' : 'Withdraw' }} {{ currency }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        class="text-none"
        rounded
        :disabled="!formInput"
        color="rgba(55,55,55,0.4)"
        depressed
        @click.stop="submit"
      >
        Send request
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
      <v-col cols="12">
        <v-row>
          <v-text-field
            class="mx-3"
            flat
            solo-inverted
            placeholder="Amount"
            v-model="formData.amount"
            :rules="[rules.required, rules.decimalInput]"
          />

          <v-text-field
            class="mx-3"
            @keyup.enter="submit"
            flat
            placeholder="Transaction pin"
            solo-inverted
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            v-model="formData.transaction_pin"
            :rules="[rules.required, rules.digitonly]"
          />
        </v-row>
      </v-col>
    </v-form>
  </v-card>
</template>
<script type="text/javascript">
import Console from 'console-browserify'
import Prefill from '@/assets/prefill.js'
import { mapGetters, mapActions } from 'vuex'
import { postApi } from '@/http'
export default {
  mixins: [Prefill],
  props: ['type', 'currency'],
  data: () => ({
    snackBarPayload: {},
    formData: {},
    show: false,
    errMsg: [
      'Incorrect Transaction Pin!',
      'Trades Pending',
      'Insufficient user balance',
    ],
    formInput: false,
    rules: {
      required: (value) => !!value || 'Required.',
      digitonly: (value) => {
        const pattern = /\D/
        return pattern.test(value) ? 'Invalid Input.' : false
      },
      decimalInput: (value) => {
        const pattern = /^(\d+)?(\.)?(\d+)$/
        return pattern.test(value) || 'Invalid input.'
      },
    },
  }),
  methods: {
    ...mapActions('snackBar', ['showSnackBar']),
    close: function () {
      this.formData = {}
      this.$emit('close')
    },
    submit() {
      if (this.formData.amount) {
        let payload = this.formData
        payload.user_id = this.user.id
        payload.type = this.type
        payload.currency = this.currency

        postApi(`wallet/create`, payload)
          .then((data) => {
            this.setMessage(data.message)
          })
          .catch((data) => {
            Console.log(data)
            this.showPopup('error', 'Server error')
          })
      } else this.showPopup('error', 'Please fill all fields')
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
          this.showPopup('error', 'Incorrect transaction pin')
          break
        case this.errMsg[1]:
          this.showPopup(
            'error',
            'Funds for withdraw used on trades or pending withdraw request already sent'
          )
          break
        case this.errMsg[2]:
          this.showPopup('error', 'You have insufficient balance')
          break
        default:
          this.showPopup('success', 'Request sent')
          this.close()
      }
    },
  },
  computed: {
    ...mapGetters('profile', ['user']),
  },
}
</script>
