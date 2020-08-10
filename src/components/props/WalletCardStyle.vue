<template>
  <v-col cols="12" lg="4" sm="6">
    <v-card class="elevation-5 card">
      <v-row align="center" justify="space-between">
        <v-col class="center" cols="12" lg="4" md="12">
          <v-img class="circ mx-auto" contain width="90px" :src="img"></v-img>
        </v-col>
        <v-col class="px-5" cols="12" lg="8" md="12">
          <v-row>
            <v-col> {{ currency }} Wallet </v-col>
            <v-col class="text-right">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    text
                    small
                    color="#282828"
                    class="mr-5"
                    v-on="on"
                    @click="request_btn"
                  >
                    <v-img
                      :src="request"
                      class="ma-1"
                      width="20px"
                      height="20px"
                    />
                  </v-btn>
                </template>
                Request
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    text
                    small
                    color="#282828"
                    v-on="on"
                    @click="withDraw_btn"
                  >
                    <v-img
                      :src="withdraw"
                      class="ma-1"
                      width="20px"
                      height="20px"
                    />
                  </v-btn>
                </template>
                Withdraw
              </v-tooltip>
            </v-col>
          </v-row>

          <v-divider class="padding" />

          <div class="headline1 mt-2">
            {{ balance }}
          </div>

          <div>
            <v-btn
              :disabled="balance === '0.0000000000'"
              rounded
              class="text-none"
              block
              small
              color="red lighten-1"
              @click.stop="setSelected"
            >
              Transfer
            </v-btn>

            <v-spacer></v-spacer>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog v-model="transfer_" :width="convertWidthI" persistent>
      <transfer-dialog :img="img" :curr="curr" @close="transfer_ = false" />
    </v-dialog>

    <v-dialog v-model="request_" :width="convertWidthII" persistent>
      <request-dialog
        :type="request_type"
        :currency="curr"
        @close="request_ = false"
      />
    </v-dialog>
  </v-col>
</template>
<script type="text/javascript">
import TransferDialog from '@/components/props/TransferDialog.vue'
import RequestDialog from '@/components/props/RequestDialog.vue'
import Prefill from '@/assets/prefill.js'

import { mapMutations } from 'vuex'
export default {
  components: { RequestDialog, TransferDialog },
  props: ['img', 'currency', 'balance'],
  mixins: [Prefill],
  data: () => ({
    convert: false,
    transfer_: false,
    request_: false,
    curr: '',
    request_type: '',
  }),
  computed: {
    convertWidthI() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '100%'
        case 'sm':
          return '100%'
        case 'md':
          return '70%'
        case 'lg':
          return '50%'
        case 'xl':
          return '50%'
      }
      return null
    },
    convertWidthII() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '100%'
        case 'sm':
          return '100%'
        case 'md':
          return '30%'
        case 'lg':
          return '30%'
        case 'xl':
          return '30%'
      }
      return null
    },
  },
  methods: {
    ...mapMutations('userWallet', ['SET_SELECTED_WALLET']),
    setSelected() {
      this.curr = this.currency.toLowerCase()
      this.transfer_ = true
    },
    request_btn() {
      this.curr = this.currency
      this.request_type = 'Reload'
      this.request_ = true
    },
    withDraw_btn() {
      this.curr = this.currency
      this.request_type = 'Withdraw'
      this.request_ = true
    },
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
