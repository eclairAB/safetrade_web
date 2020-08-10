<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-toolbar class="gradient" dark>
          <v-toolbar-title>Requests</v-toolbar-title>

          <v-spacer />

          <v-col cols="7" md="3" class="mt-5">
            <v-overflow-btn
              v-model="selected"
              @change="populate"
              solo-inverted
              flat
              class="mt-2"
              :items="listItem"
              label="All"
            ></v-overflow-btn>
          </v-col>
        </v-toolbar>

        <v-list two-line>
          <v-container
            id="scroll-target"
            style="max-height: 670px;"
            class="overflow-y-auto"
          >
            <v-row class="justify-center grey--text" v-if="isNull">
              No request at this moment
            </v-row>

            <v-col v-for="(item, index) in withdrawList" :key="index">
              <v-divider class="mx-2" />

              <request-card
                :img="
                  item.user_data.user_display_pic
                    ? item.user_data.user_display_pic
                    : require('@/assets/user.png')
                "
                :username="item.user_data.username"
                :type="item.type"
                :amount="item.amount"
                :currency="item.currency"
                :dateTime="item.created_at"
                @cardBtn="
                  cardBtn(
                    index,
                    item.id,
                    item.user_id,
                    item.currency,
                    item.amount,
                    item.type
                  )
                "
                @cardDel="cardDel(index, item.id)"
              />
            </v-col>
          </v-container>
        </v-list>
      </v-col>
    </v-row>

    <v-dialog v-model="tPin" :width="convertWidth" persistent>
      <v-card>
        <pin-card @close="tPin = false" @addPin="approve" />
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script type="text/javascript">
import PinCard from '@/components/props/PinCard.vue'
import DataSource from '@/components/common/dataSource.js'
import RequestCard from './RequestCard'
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { postApi } from '@/http'
export default {
  mixins: [DataSource],
  components: { RequestCard, PinCard },
  data: () => ({
    formData: {},
    snackBarPayload: {},
    listItem: ['All', 'Reload', 'Withdraw'],
    errMsg: [
      'Incorrect Transaction Pin!',
      'Insufficient user balance',
      'Trades Pending',
      'deleted',
      'Admin balance insufficient',
    ],
    selected: 'All',
    tPin: false,
    localIndex: '',
    isApprove: true,
  }),
  methods: {
    ...mapActions('snackBar', ['showSnackBar']),
    ...mapActions('userWallet', ['UPDATE_WALLET']),
    populate() {
      let payload = {}
      payload.filter = this.selected

      postApi(`wallet/list`, payload).then((data) => {
        this.withdrawList = data
      })
    },
    approve(pin) {
      let payload = this.formData
      payload.transaction_pin = pin

      if (this.isApprove) {
        payload.filter = this.selected
        postApi(`wallet/approve`, payload).then((data) => {
          this.setMessage(data.message)
        })
      } else {
        postApi(`wallet/delete`, payload).then((data) => {
          this.setMessage(data.message)
        })
      }
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
          this.showPopup('error', 'Insufficient user balance')
          break
        case this.errMsg[2]:
          this.showPopup('error', 'Insufficient user balance')
          break
        case this.errMsg[3]:
          this.showPopup('success', 'Request deleted')
          Vue.delete(this.withdrawList, this.localIndex)
          break
        case this.errMsg[4]:
          this.showPopup('error', 'Insufficient Admin balance')
          break
        default:
          this.showPopup('success', 'Request approved')
          Vue.delete(this.withdrawList, this.localIndex)
      }
    },
    cardBtn(localIndex, id, uid, currency, amount, type) {
      this.isApprove = true
      this.formData = {}
      this.tPin = true

      this.formData.id = id
      this.formData.user_id = uid
      this.formData.currency = currency
      this.formData.amount = amount
      this.formData.type = type
      this.localIndex = localIndex
    },
    cardDel(localIndex, id) {
      this.isApprove = false
      this.formData = {}
      this.tPin = true

      this.formData.id = id
      this.localIndex = localIndex
    },
  },
  computed: {
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
    isNull() {
      return this.withdrawList.length === 0 ? true : false
    },
  },
  mounted() {
    this.$echo.channel('channelwallet').listen('wallet', () => {
      this.UPDATE_WALLET()
    })
  },
  created() {
    this.populate()
  },
}
</script>
<style type="text/css"></style>
