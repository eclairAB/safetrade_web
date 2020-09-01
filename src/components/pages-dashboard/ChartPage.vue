<template>
  <v-row>
    <v-col class="col-chart pb-0" cols="12">
      <div id="price-chart"></div>
      <div
        style="
          position: absolute;
          z-index: 2;
          bottom: 20px;
          left: calc(50% - 242px);
        "
      >
        <user-bet @new-bet="newBet" />
      </div>
    </v-col>
  </v-row>
</template>
<script>
import UserBet from '@/components/charts/UserBet'
import { mapActions } from 'vuex'
import { createChart, PriceScaleMode } from '@infosoftstudio/lightweight-charts'
import { useAssetPrices } from '@/compositions'

export default {
  components: {
    UserBet,
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
    chart: null,
    data: [],
    markers: [],
    lastDateValue: null,
    unit: 'seconds',
    areaSeries: null,
    chartOptions: {
      localization: {
        dateFormat: 'yyyy-MM-dd',
      },
      layout: {
        backgroundColor: '#242424',
        textColor: '#d1d4dc',
        fontSize: 13,
        fontFamily: 'Calibri',
      },
      grid: {
        vertLines: {
          color: 'rgba(70, 130, 180, 0.5)',
          style: 1,
          visible: true,
        },
        horzLines: {
          color: 'rgba(70, 130, 180, 0.5)',
          style: 1,
          visible: true,
        },
      },
      rightPriceScale: {
        mode: PriceScaleMode.Normal,
        autoScale: true,
        alignLabels: false,
        borderVisible: false,
        borderColor: '#555ffd',
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
      },
      timeScale: {
        rightOffset: 60,
        barSpacing: 6,
        fixLeftEdge: false,
        lockVisibleTimeRangeOnResize: false,
        rightBarStaysOnScroll: true,
        borderVisible: false,
        borderColor: '#ff7700',
        visible: true,
        timeVisible: true,
        secondsVisible: true,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true, // on touch devices
      },
    },
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
    tsOffset() {
      return Math.abs(new Date().getTimezoneOffset()) * 60
    },
    prices() {
      return this.assetPrices.map((item) => this.correctTimestamp(item))
    },
  },
  methods: {
    ...mapActions('assets', ['addAssetPrices']),
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
    const container = document.querySelector('#price-chart')
    this.chart = createChart(container, {
      width: window.innerWidth - 15,
      height: window.innerHeight - 75,
    })
    this.chart.applyOptions(this.chartOptions)
    this.chart
      .timeScale()
      .subscribeVisibleTimeRangeChange(async (timerange) => {
        if (timerange && this.oldestTime && !this.isFetchingPrices) {
          if (timerange.from - 30000 < this.oldestTime && this.nextPageUrl) {
            await this.fetchPrices({ url: this.nextPageUrl })
          }
        }
      })
    this.areaSeries = this.chart.addAreaSeries(this.seriesOptions)
    this.$echo
      .channel('asset.price')
      .listen('AssetPriceUpdated', async ({ data }) => {
        await this.addAssetPrices([data])
        await this.addBetMarker(data.betData)
      })
  },
  beforeDestroy() {
    this.chart.timeScale().unsubscribeVisibleTimeRangeChange()
  },
  watch: {
    prices(value) {
      if (value.length > 0) {
        this.areaSeries.setData(value) // set the data
        this.areaSeries.setMarkers(this.markers)
      }
    },
  },
}
</script>
