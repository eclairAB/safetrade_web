<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-col class="blur_container">
          <v-col class="blur" />
          <v-card
            width="100%"
            class="blur_content pt-3 px-3 elevation-10 card-border"
          >
            <v-form ref="form" v-model="isFormValid">
              <v-row>
                <v-flex xs12 px-5>
                  <v-layout justify-space-between top>
                    <span class="body-1">Cash credits</span>

                    <div class="headline1">
                      $ {{ userWallet.cash }}
                    </div>
                  </v-layout>
                  <v-divider class="padding"/>
                </v-flex>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="amount"
                    :rules="[rules.required, rules.digitonly]"
                    class="mx-2 mt-1 subheading"
                    label="Amount"
                    outlined
                    flat
                    color="orange darken-3"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" class="mt-1">
                  <v-btn
                    :loading="loading"
                    @click="submit(false)"
                    color="red"
                    large
                  >
                    <v-icon class="white--text">keyboard_arrow_down</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="3" class="mt-1">
                  <v-btn
                    :loading="loading"
                    @click="submit(true)"
                    color="green"
                    large
                  >
                    <v-icon class="white--text">keyboard_arrow_up</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { useAssets, useFormRules } from '@/compositions'
import { useAssetPrices } from '@/compositions'

export default {
  setup(_props, context) {
    const rules = useFormRules()
    const { activeAsset } = useAssets(context)

    const { assetPrices } = useAssetPrices(context)

    return { rules, activeAsset, assetPrices }
  },
  data: () => ({
    snackBarPayload: {},
    loading: false,
    isFormValid: false,
    amount: null,
  }),
  methods: {
    ...mapActions('assetBets', ['addBet']),
    ...mapActions('snackBar', ['showSnackBar']),
    async submit(willGoUp) {
      if (!this.isFormValid) {
        return
      }
      this.loading = true
      const lastPrice = this.assetPrices[this.assetPrices.length - 1]
      this.$emit('new-bet', {
        timestamp: lastPrice.timestamp,
        up: willGoUp,
        amount: this.amount,
      })

      const formData = {
        assetId: this.activeAsset.id,
        amount: this.amount,
        will_go_up: willGoUp,
      }
      try {
        await this.addBet(formData)
        this.$refs.form.reset()
        this.showPopup('success', `$${formData.amount} bet placed.`)
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    showPopup(color, text) {
      this.snackBarPayload.color = color
      this.snackBarPayload.isShow = true
      this.snackBarPayload.text = text
      this.showSnackBar(this.snackBarPayload)
    },
  },
  computed: {
    ...mapGetters('userWallet', ['userWallet'])
  }
}
</script>
<style lang="scss">
.blur_container {
  .blur {
    position: absolute !important;
    top: 0px !important;
    right: 0px !important;
    bottom: 0px !important;
    left: 0px !important;
    z-index: 1 !important;
    -webkit-filter: blur(60px) !important;
    filter: url('/media/blur.svg#blur') !important;
    filter: blur(60px) !important;
  }

  .blur_content {
    position: relative !important;
    z-index: 1 !important;
    background: rgb(34, 34, 34) !important;
    background: rgba(69, 82, 99, 0.52) !important;
    opacity: 0.6 !important;
  }

  .card-border {
    border-radius: 6px !important;
  }
}
</style>
