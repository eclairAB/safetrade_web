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
                <v-col class="px-5" cols="12">
                  <v-row class="top" justify="space-between">
                    <span class="body-1">Cash credits</span>

                    <!-- <div class="headline1">$ {{ userWallet.cash }}</div> -->
                  </v-row>
                  <v-divider class="padding" />
                </v-col>
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
        this.addLine(willGoUp)
        this.showPopup('success', `$${formData.amount} bet placed.`)
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    
    async addLine(direction) {
      let chart = this.$parent.$refs.chart.chart

      console.log(chart)

      let series = chart.series[0]
      let xAxis = chart.xAxis[0]
      let yAxis = chart.yAxis[0]
      let lastPointY = series.points[series.points.length - 1]
      let yLineValue = yAxis.toPixels(lastPointY.y)

      console.log(chart.yAxis)

      chart.yAxis[0].addPlotLine({
        id: 'betLine',
        value: lastPointY.y,
        color: 'green',
        width: 1.3,
        label: {
          text: lastPointY.y,
          style: {
            color: 'white',
          },
        },
      })

      chart.xAxis[0].addPlotLine({
        id: 'startWindow',
        value: lastPointY.x,
        color: 'red',
        width: 1,
        label: {
          text: 'Bet Window',
          style: {
            color: 'white',
          },
        },
      })

      chart.xAxis[0].addPlotLine({
        id: 'endWindow',
        value: lastPointY.x + 6000,
        color: 'red',
        width: 1,
        label: {
          text: 'Bet Window',
          style: {
            color: 'white',
          },
        },
      })
      
      var audio = new Audio('https://www.soundjay.com/button/button-11.wav') // path to file
      audio.play()

      setTimeout(() => {
        chart.xAxis[0].removePlotLine('startWindow')
        chart.xAxis[0].removePlotLine('endWindow')
        chart.yAxis[0].removePlotLine('betLine')
      }, 7000) // bet window remove

        console.log('==============================================================')
        this.createMark(lastPointY, direction) 
        console.log('==============================================================')
    },

        createMark(point, direction) {
        let chart = this.$parent.$refs.chart.chart
        
        let series = chart.series[0]

        series.data[series.data.length - 1].update({
            marker: {
             enabled: true,
             fillColor: direction ? 'green' : 'red',
             radius: 12,
             symbol: 'circle',
            //  y: direction ? 10 : 10,
           },
             dataLabels: {
              enabled: true,
              color: 'white',
              // backgroundColor: direction ? 'green' : 'red',
              format: '<p>54</p>',
              useHTML: true,
              y: direction ? 10 : 10,
           }
        })


    //     chart.addSeries({
    //     type: 'scatter',
    //     data: [{
    //       x: point.x, 
    //       y: direction ? point.y - 3 : point.y + 3}],
    //    id: 'customPoint',
    //    marker: {
    //      enabled: true,
    //     fillColor: direction ? 'green' : 'red',
    //     radius: 3,
    //     symbol: direction ? 'triangle' : 'triangle-down'
    //     }
    //  })
     // creates the bubble head of the marker
    //    chart.addSeries({
    //    styledMode: true,
    //    type: 'scatter',
    //    data: [{
    //      x: point.x, 
    //      y: direction ? point.y - 10 : point.y + 10
    //   }],
    //   id: 'customPoint',
    //   marker: {
    //     enabled: true,
    //     fillColor: direction ? 'green' : 'red',
    //     radius: 10,
    //     symbol: 'circle',
       
    //    }
    //  })
    },

    
    showPopup(color, text) {
      this.snackBarPayload.color = color
      this.snackBarPayload.isShow = true
      this.snackBarPayload.text = text
      this.showSnackBar(this.snackBarPayload)
    },
  },
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
