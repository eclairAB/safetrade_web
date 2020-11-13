<template>
  <v-row style="height: 100%;">
    <v-col class="col-chart pb-0 pt-0 fill-height" cols="12">
      <highcharts
        class="stock"
        :constructor-type="'stockChart'"
        :options="stockOptions"
        style="height: 100%;"
        ref="stockchart"
      />
      <div
        style="
          position: absolute;
          z-index: 2;
          bottom: 0px;
          left: calc(50% - 242px);
        "
      >
        <user-bet @new-bet="newBet" />
      </div>
    </v-col>
    <!-- <button @click="stop">Stop</button> -->
    <!-- <button @click="addUp" class="btn">AddUp</button>
    <button @click="addDown">AddDown</button>-->
  </v-row>
</template>

<script>
import UserBet from '@/components/charts/UserBet'
import { mapActions, mapGetters } from 'vuex'
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
  data() {
    return {
      betStatus: true,
      markers: [],
      lastDateValue: null,
      unit: 'seconds',
      plotLine: null,
      animatedPointGroup: null,
      shadowCircle: null,
      pointerSize: 10,
      stockOptions: {
        chart: {
          type: 'area',
          fontFamily: 'calibri',
          height: '45%',
          margin: [0, 0, 30, 0],
          backgroundColor: '#242C3E',
          styleMode: true,
          marginRight: 80,
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          style: {
            width: '200px',
          },
          valueDecimals: 4,
          shared: true,
        },
        exporting: {
          enabled: false,
        },
        rangeSelector: {
          enabled: false,
        },
        plotOptions: {
          series: {
            fillOpacity: 0.1,
            gridLineWidth: 1,
            // marker: {
            //   enabled: false,
            //   states: {
            //     select: {
            //       enabled: true,
            //     },
            //   },
            // },
          },
        },
        navigator: {
          enabled: false,
        },
        title: {
          text: 'USD to EUR exchange rate',
        },
        credits: {
          enabled: false,
        },
        scrollbar: {
          enabled: false,
        },
        xAxis: {
          crosshair: {
            enabled: true,
            label: {
              enabled: true,
            },
          },
          overscroll: 15 * 1000, // 10 seconds
          gridLineWidth: 0.1,
          scrollbar: true,
          type: 'datetime',
          gridLineColor: 'rgba(70, 130, 180, 0.5)',
          tickInterval: 15 * 1000,
          gridZIndex: 1,
          // range: 4 * 24 * 3600 * 1000,
        },
        yAxis: {
          type: 'logarithmic',
          gridLineColor: 'rgba(70, 130, 180, 0.5)',
          crosshair: {
            enabled: true,
            label: {
              enabled: true,
            },
          },
          opposite: false,
          labels: {
            align: 'left',
            format: '{value:.2f}',
            zIndex: -1,
            y: -3,
            x: 10,
          },
          title: {
            text: 'Secondary axis',
          },
        },
        series: [
          {
            allowPointSelect: true,
            name: 'Vaue',
            lineWidth: 1,
            data: [],
            // data: (function () {
            //   // generate an array of random data
            //   var data = [],
            //     time = new Date().getTime(),
            //     i

            //   for (i = -49; i <= 0; i += 1) {
            //     data.push([time + i * 1000, Math.round(Math.random() * 100)])
            //   }
            //   return data
            // })(),
          },
        ],
      },
      handle: null,
    }
  },
  computed: {
    BetStatus: {
      get: function () {
        return this.betStatus
      },
      set: function (status) {
        this.betStatus = status
      },
    },
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
      this.BetStatus = false
      this.createLines(data)
      this.createMark(data)
    },
    correctTimestamp(item) {
      return {
        time: item.timestamp + this.tsOffset,
        value: Number(item.price),
      }
    },
    addBetMarker(betData) {
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
    // addUp() {
    //   console.log('before clicking', this.BetStatus)
    //   this.BetStatus = false
    //   console.log('ok', this.BetStatus)

    //   this.createLines()
    //   this.createMark(true)
    // },
    // addDown() {
    //   this.BetStatus = false
    //   this.createLines()
    //   this.createMark(false)
    // },
    stop() {
      clearInterval(this.handle)
    },
    addRandomBet(coordData) {
      var chart = this.$refs.stockchart.chart,
        series = chart.series[0],
        // x = new Date().getTime(), // current time
        // y = Math.round(Math.random() * 100),
        x = coordData.timestamp * 1000,
        y = parseFloat(coordData.price),
        point,
        xPos,
        yPos,
        strStyle = '',
        strMarker = ''
      // if (y > 60 && y < 90) {
      //   strStyle = 'up'
      // }
      // if (y < 30 && y > 10) {
      //   strStyle = 'down'
      // }
      series.addPoint([x, y], true, series.points.length > 30)
      if (coordData.betData) {
        if (coordData.betData.up) {
          strStyle = 'up'
        } else {
          strStyle = 'down'
        }
        strMarker =
          '<div><span class="' +
          strStyle +
          '-amount">$' +
          parseInt(coordData.betData.amount) +
          '</span><div class="' +
          strStyle +
          '-image"><img src="logo.png" class="image" /></div></div>'
        //((y > 60 && y < 90) || (y < 30 && y > 10))
        if (this.BetStatus) {
          setTimeout(function () {
            series.data[series.data.length - 1].update(
              {
                type: 'scatter',
                id: 'point',
                // marker: {
                //   enabled: true,
                //   fillColor: circleColor,
                //   radius: 3,
                //   symbol: 'circle',
                // },
                dataLabels: {
                  enabled: true,
                  useHTML: true,
                  outside: true,
                  allowOverlap: true,
                  formatter() {
                    return strMarker
                  },
                },
              },
              true
            )
          }, 700)
        }
      }
      point = series.points[series.points.length - 1]
      xPos = point.plotX + chart.plotLeft
      yPos = point.plotY + chart.plotTop

      this.animatedPointGroup.animate({
        translateX: xPos - this.pointerSize / 2,
        translateY: yPos - this.pointerSize / 2,
      })

      this.plotLine.animate({
        d: ['M', chart.plotLeft, yPos, 'L', xPos, yPos],
      })

      this.shadowCircle.animate({
        r:
          this.shadowCircle.attr('r') === this.pointerSize
            ? this.pointerSize / 2
            : this.pointerSize,
      })
    },
    createLines(betData) {
      var myChart = this.$refs.stockchart.chart
      var series = myChart.series[0]
      var lastPointY = series.points[series.points.length - 1]
      myChart.yAxis[0].addPlotLine({
        id: 'betLine',
        value: lastPointY.y,
        color: betData.up ? ' #03c503' : '#be0050',
        width: 1.3,
        label: {
          text: lastPointY.y,
        },
      })

      myChart.xAxis[0].addPlotLine({
        id: 'startWindow',
        value: lastPointY.x,
        color: betData.up ? ' #03c503' : '#be0050',
        width: 1,
        label: {
          text: 'Bet Window',
        },
      })

      myChart.xAxis[0].addPlotLine({
        id: 'endWindow',
        value: lastPointY.x + 14000,
        color: betData.up ? ' #03c503' : '#be0050',
        width: 1,
        label: {
          text: 'Bet Window',
        },
      })

      var betWindowInterval = setInterval(function () {
        myChart.xAxis[0].removePlotLine('startWindow')
        myChart.xAxis[0].removePlotLine('endWindow')
        myChart.yAxis[0].removePlotLine('betLine')
        clearInterval(betWindowInterval)
      }, 15000)
    },
    createMark(betData) {
      var myChart = this.$refs.stockchart.chart
      var series = myChart.series[0]
      var point = series.points[series.points.length - 1]
      var strStyle = '',
        strMarker = ''
      if (betData.up) {
        strStyle = 'up'
      } else {
        strStyle = 'down'
      }
      strMarker =
        '<div><div class="' +
        strStyle +
        '-bet"><span class="' +
        strStyle +
        '-amount-bet">$' +
        betData.amount +
        '</span></div></div>'
      series.data[series.data.length - 1].update(
        {
          type: 'scatter',
          id: 'point',
          dataLabels: {
            enabled: true,
            useHTML: true,
            outside: true,
            allowOverlap: false,
            format: strMarker,
          },
        },
        true
      )
      /*series.addPoint({
        type: 'scatter',
        id: 'point',
        x: point.x,
        y: point.y,
        // marker: {
        //   enabled: true,
        //   fillColor: circleColor,
        //   radius: 3,
        //   symbol: 'circle',
        // },
        dataLabels: {
          enabled: true,
          useHTML: true,
          outside: false,
          allowOverlap: false,
          format: strMarker,
        },
      })*/
      this.BetStatus = true
    },
  },
  async mounted() {
    var chart = this.$refs.stockchart.chart,
      series = chart.series[0],
      lastPoint,
      xPos = 0,
      yPos = 0
    if (series.points.length > 0) {
      lastPoint = series.points[series.points.length - 1]
      xPos = lastPoint.plotX + chart.plotLeft
      yPos = lastPoint.plotY + chart.plotTop
    }
    this.animatedPointGroup = chart.renderer
      .g()
      .attr({
        translateX: xPos - this.pointerSize / 2,
        translateY: yPos - this.pointerSize / 2,
      })
      .add()
    this.plotLine = chart.renderer
      .path(['M', chart.plotLeft, yPos, 'L', xPos, yPos])
      .attr({
        stroke: '#008dc4',
        'stroke-width': 1.5,
      })
      .add()
    this.shadowCircle = chart.renderer
      .circle(5, 10 / 2, 10)
      .attr({
        fill: '#d3d7de',
      })
      .add(this.animatedPointGroup)
    chart.renderer
      .circle(this.pointerSize / 2, this.pointerSize / 2, 6)
      .attr({
        fill: '#ffffff',
      })
      .add(this.animatedPointGroup)
    chart.renderer
      .circle(this.pointerSize / 2, this.pointerSize / 2, 3)
      .attr({
        fill: '#008dc4',
      })
      .add(this.animatedPointGroup)
    this.$echo
      .channel('asset.price')
      .listen('AssetPriceUpdated', async ({ data }) => {
        await this.addAssetPrices([data])
        await this.addBetMarker(data.betData)

        this.addRandomBet(data)
        // this.handle = setInterval(
        //   function () {
        //     this.addRandomBet()
        //   }.bind(this),
        //   1000
        // )
      })
  },
}
</script>
<style>
.stock {
  /* width: 70%; */
  margin: 0 auto;
}
.highcharts-scrollbar {
  display: none;
}
.up-image {
  border: 1px #03c503 solid;
  border-radius: 45px;
  height: 15px;
  width: 15px;
  transform: translate(-50%, -120%);
  position: absolute;
}
.up-image::before {
  position: absolute;
  content: '';
  border-style: solid;
  border-width: 6px 3px 0 3px;
  border-color: #03c503 transparent transparent transparent;
  top: 106%;
  left: 50%;
  transform: translateX(-50%);
}
.up-image::after {
  position: absolute;
  display: flex;
  content: '';
  background-color: #03c503;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  top: calc(106% + 6px);
  left: 50%;
  transform: translateX(-50%);
}
.down-image {
  border: 1px #be0050 solid;
  border-radius: 45px;
  height: 15px;
  width: 15px;
  transform: translate(-50%, 85%);
  position: absolute;
}
.down-image::before {
  position: absolute;
  content: '';
  border-style: solid;
  border-width: 0px 3px 6px 3px;
  border-color: transparent transparent #be0050 transparent;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
}
.down-image::after {
  position: absolute;
  display: flex;
  content: '';
  background-color: #be0050;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  top: calc(-50% - 6px);
  left: 50%;
  transform: translateX(-50%);
}
.image {
  width: 13px;
  height: 13px;
}
.up-amount {
  position: absolute;
  color: #03c503;
  top: -32px;
  transform: translateX(-55%);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -1px;
}
.down-amount {
  position: absolute;
  color: #be0050;
  top: 27px;
  transform: translateX(-55%);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -1px;
}
.up-amount-bet {
  color: #ffffff;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -1px;
}

.up-bet {
  border: 1px #03c503 solid;
  background-color: #03c503;
  border-radius: 5px;
  height: 15px;
  padding: 0 3px;
  transform: translate(-50%, -120%);
  position: absolute;
}
.up-bet::before {
  position: absolute;
  content: '';
  border-style: solid;
  border-width: 6px 3px 0 3px;
  border-color: #03c503 transparent transparent transparent;
  top: 106%;
  left: 50%;
  transform: translateX(-50%);
}
.up-bet::after {
  position: absolute;
  content: '';
  display: flex;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #03c503;
  top: calc(106% + 6px);
  left: 50%;
  transform: translateX(-50%);
}
.down-bet {
  border: 1px #be0050 solid;
  background-color: #be0050;
  border-radius: 5px;
  height: 15px;
  padding: 0 3px;
  transform: translate(-50%, 80%);
  position: absolute;
}
.down-bet::before {
  position: absolute;
  content: '';
  border-style: solid;
  border-width: 0px 3px 6px 3px;
  border-color: transparent transparent #be0050 transparent;
  top: -48%;
  left: 50%;
  transform: translateX(-50%);
}
.down-bet::after {
  position: absolute;
  content: '';
  display: flex;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #be0050;
  top: calc(-48% - 6px);
  left: 50%;
  transform: translateX(-50%);
}
.down-amount-bet {
  color: #ffffff;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -1px;
}
</style>
