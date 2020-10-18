<template>
  <v-row style="height: 100%;">
    <v-col class="col-chart pb-0 fill-height" cols="12">
      <highcharts
        :options="getChartOptions"
        style="height: 100%;"
        ref="chart"
      ></highcharts>

      <div
        style="
          position: absolute;
          z-index: 2;
          bottom: 20px;
          left: calc(50% - 242px);
        "
      >
        <user-bet @new-bet="newBet" />
        <!-- <div id="container"></div> -->
      </div>
    </v-col>
  </v-row>
</template>
<script>
import UserBet from '@/components/charts/UserBet'
import { mapActions, mapGetters } from 'vuex'
import { useAssetPrices } from '@/compositions'
import { Chart } from 'highcharts-vue'
const moment = require('moment')

export default {
  components: {
    UserBet,
    highcharts: Chart,
  },
  setup(_props, context) {
    const {
      assetPrices,
      fetchPrices,
      isFetchingPrices,
      nextPageUrl,
      oldestTime,
    } = useAssetPrices(context)
    return {
      assetPrices,
      fetchPrices,
      isFetchingPrices,
      nextPageUrl,
      oldestTime,
    }
  },
  data: () => ({
    plotLine: null,
    chart: null,
    data: [],
    markers: [],
    lastDateValue: null,
    unit: 'seconds',
    areaSeries: null,
    shadowCircle: null,
    animatedPointGroup: null,
    // chartOptions: {
    //   localization: {
    //     dateFormat: 'yyyy-MM-dd',
    //   },
    //   layout: {
    //     backgroundColor: '#242424',
    //     textColor: '#d1d4dc',
    //     fontSize: 13,
    //     fontFamily: 'Calibri',
    //   },
    //   grid: {
    //     vertLines: {
    //       color: 'rgba(70, 130, 180, 0.5)',
    //       style: 1,
    //       visible: true,
    //     },
    //     horzLines: {
    //       color: 'rgba(70, 130, 180, 0.5)',
    //       style: 1,
    //       visible: true,
    //     },
    //   },
    //   rightPriceScale: {
    //     mode: PriceScaleMode.Normal,
    //     autoScale: true,
    //     alignLabels: false,
    //     borderVisible: false,
    //     borderColor: '#555ffd',
    //     scaleMargins: {
    //       top: 0.3,
    //       bottom: 0.25,
    //     },
    //   },
    //   timeScale: {
    //     rightOffset: 60,
    //     barSpacing: 6,
    //     fixLeftEdge: false,
    //     lockVisibleTimeRangeOnResize: false,
    //     rightBarStaysOnScroll: true,
    //     borderVisible: false,
    //     borderColor: '#ff7700',
    //     visible: true,
    //     timeVisible: true,
    //     secondsVisible: true,
    //   },
    //   handleScroll: {
    //     mouseWheel: true,
    //     pressedMouseMove: true,
    //   },
    //   handleScale: {
    //     axisPressedMouseMove: true,
    //     mouseWheel: true,
    //     pinch: true, // on touch devices
    //   },
    // },
    //chartOptions: this.getChartOptions,
    seriesOptions: {
      overlay: true,
      topColor: 'rgba(76, 175, 80, 0.56)',
      bottomColor: 'rgba(76, 175, 80, 0.04)',
      lineColor: 'rgba(76, 175, 80, 1)',
      lineWidth: 2,
      crosshairMarkerVisible: false,
    },
    windowSize: {
      x: 0,
      y: 0,
    },
  }),
  computed: {
    ...mapGetters('chartData', ['getChartOptions']),
    tsOffset() {
      return Math.abs(new Date().getTimezoneOffset()) * 60
    },
    prices() {
      return this.assetPrices.map((item) => this.correctTimestamp(item))
    },
  },
  methods: {
    ...mapActions('assets', ['addAssetPrices']),
    ...mapActions('chartData', ['addPoint']),

    newBet(data) {
      const marker = {
        time: data.timestamp + this.tsOffset,
        position: 'inBar',
        shape: 'userBet',
        text: '$' + data.amount,
        betData: {
          user: {
            image:
              'https://www.scmagazine.com/wp-content/uploads/sites/2/2019/01/Ryuk-860x466.jpg',
          },
          up: data.up,
        },
      }
      this.markers.push(marker)
     
    },
    correctTimestamp(item) {
      return {
        time: item.timestamp + this.tsOffset,
        value: Number(item.price),
      }
    },
    addBetMarker(betData) {

      /*
         betData = {
            up: boolean,
            amount: decimal,
            timestamp: timestamp,
         }
       */
      if (!betData) {
        return
      }
      const marker = {
        time: betData.timestamp + this.tsOffset,
        position: 'inBar',
        shape: 'userBet',
        color: 'green',
        betData: {
          user: {
            image: require('@/assets/user1.png'),
          },
          up: betData.up,
        },
      }
      this.markers.push(marker)
    },
  },
  async mounted() {
    let chart = this.$refs.chart.chart
    const pointerSize = 16

    this.plotLine = chart.renderer
      .path(['M', 0, 0, 'L', 0, 0])
      .attr({
        stroke: '#008dc4',
        'stroke-width': 3,
      })
      .add()

    this.animatedPointGroup = chart.renderer
      .g()
      .attr({
        translateX: 0,
        translateY: 0,
      })
      .add()

    this.shadowCircle = chart.renderer
      .circle(pointerSize / 2, pointerSize / 2, pointerSize)
      .attr({
        fill: '#d3d7de',
      })
      .add(this.animatedPointGroup)

    chart.renderer
      .circle(pointerSize / 2, pointerSize / 2, 6)
      .attr({
        fill: '#ffffff',
      })
      .add(this.animatedPointGroup)

    chart.renderer
      .circle(pointerSize / 2, pointerSize / 2, 3)
      .attr({
        fill: '#008dc4',
      })
      .add(this.animatedPointGroup)

    //     chart.yAxis[0].addPlotLine({
    //   id: 'value',
    //   value: 100000000,
    //   color: 'red',
    //   width: 1.2,
    //   label: {
    //     text: 'Start',
    //     style: {
    //       color: 'white',
    //     },
    //   },
    // })

    let textValue

    this.$echo
      .channel('asset.price')
      .listen('AssetPriceUpdated', async ({ data }) => {
        await this.addPoint([data.timestamp * 1000, parseFloat(data.price)])
        await this.addAssetPrices([data])
        await this.addBetMarker(data.betData)

        let chart = this.$refs.chart.chart

        let series = chart.series[0]
        let point = series.points[series.points.length - 1]
        let xPos = point.plotX + chart.plotLeft
        let yPos = point.plotY + chart.plotTop
        chart.customTextGroup = chart.renderer.g('customTextGroup').add();
        let markerUpdate = data.betData.up
 
        if (!markerUpdate) {
             return
           }else {
          point.update({
            data: [{
            x: xPos.x, 
           y: yPos.y}],
             marker: {
              enabled: true,
             radius: 12,
             symbol: 'circle',
            }
        })
      }
      

        if (typeof textValue == 'object') textValue.destroy()

        textValue = chart.renderer
          .label(
            parseFloat(data.price),
            chart.plotLeft + chart.plotSizeX,
            point.plotY + chart.plotTop - 18,
            'rect',
            // point.plotX + chart.plotLeft,
            // point.plotY + chart.plotTop
          )
          .css({
            color: '#FFFFFF',
             'z-index':'999'
          })
          .attr({
            fill: 'rgba(124, 181, 236, 1)',
            padding: 6,
            r: 8,
             zIndex: 999
          })
          .add(chart.customTextGroup)

        if (moment(data.timestamp * 1000).second() == 30) {
          let maxLine =
            moment()
              .add(1, 'minutes')
              .set({ second: 30, millisecond: 0 })
              .unix() * 1000

          let minLine =
            moment()
              .add(2, 'minutes')
              .set({ second: 0, millisecond: 0 })
              .unix() * 1000

          console.log(minLine, maxLine)

          chart.xAxis[0].removePlotLine('startLine')
          chart.xAxis[0].removePlotLine('endLine')
          chart.xAxis[0].removePlotBand('plot-band')

          chart.xAxis[0].addPlotLine({
            id: 'endLine',
            value: minLine,
            color: 'red',
            width: 1.2,
            label: {
              text: 'Finish',
              style: {
                color: 'white',
              },
            },
          })
          chart.xAxis[0].addPlotLine({
            id: 'startLine',
            value: maxLine,
            color: 'red',
            width: 1.2,
            label: {
              text: 'Start',
              style: {
                color: 'white',
              },
            },
          })
           // Colors between starting and ending points
           chart.xAxis[0].addPlotBand({
                from: maxLine,
                to: minLine,
                color: 'rgba(255, 99, 71, 0.1)',
                id: 'plot-band'
            });

          let min = moment(chart.xAxis[0].max)
            .subtract(30, 'seconds')
            .set({ second: 0, millisecond: 0 })

          chart.xAxis[0].setExtremes(
            min.unix() * 1000,
            moment()
              .add(2, 'minutes')
              .set({ second: 15, millisecond: 0 })
              .unix() * 1000
          )
        }

        setTimeout(() => {
          this.animatedPointGroup.animate({
            translateX: xPos - pointerSize / 2,
            translateY: yPos - pointerSize / 2,
          })

          this.shadowCircle.animate({
            r:
              this.shadowCircle.attr('r') === pointerSize
                ? pointerSize / 2
                : pointerSize,
          })
        }, 50)


        this.plotLine
          .animate({
            d: ['M', chart.plotLeft, yPos, 'L', xPos * 10000, yPos],
          })
          .attr({
            stroke: '#008dc4',
            'stroke-width': 1,
             zIndex: -3
          })
          .add()
      })
  },
  beforeDestroy() {
    //this.chart.timeScale().unsubscribeVisibleTimeRangeChange()
  },
  watch: {
    // prices(value) {
    //   if (value.length > 0) {
    //     this.areaSeries.setData(value) // set the data
    //     this.areaSeries.setMarkers(this.markers)
    //   }
    // },
  },
}
</script>