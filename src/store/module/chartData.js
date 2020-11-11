import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  chartOptions: {
    chart: {
      fontFamily: 'calibri',
      height: 900,
      type: 'area',
      // zoomType: 'x',
      // panKey: 'shift',
      backgroundColor: '#242C3E',
      styleMode: true,
      marginRight: 80,
    },
    legend: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },

    title: {
      text: 'USD to EUR exchange rate',
    },
    tooltip: {
      style: {
        width: '200px',
      },
      valueDecimals: 4,
      shared: true,
    },
    xAxis: {
      crosshair: {
        enabled: true,
        label: {
          enabled: true,
        },
      },
      tickInterval: 22 * 1000,
      type: 'datetime',
      gridLineWidth: 1,
      gridZIndex: 1,
      gridLineColor: 'rgba(70, 130, 180, 0.5)',
    },

    yAxis: {
      gridLineWidth: 1,
      gridZIndex: 1,
      gridLineColor: 'rgba(70, 130, 180, 0.5)',
      ordinal: false,
      opposite: true,
      type: 'logarithmic',
      crosshair: {
        enabled: true,
        label: {
          enabled: true,
        },
      },
      // plotLines: [
      //   {
      //     value: 0,
      //     width: 1,
      //     color: '#808080',
      //   },
      // ],

      labels: {
        align: 'left',
        format: '{value:.2f}',
        zIndex: -1,
        y: 6,
        x: 2,
      },
      title: {
        text: 'Secondary axis',
      },

      // title: {
      //   text: '',
      // },
    },
    rangeSelector: {
      selected: 1,
      buttons: [
        {
          count: 1,
          type: 'minute',
          text: '1M',
        },
        {
          count: 5,
          type: 'minute',
          text: '5M',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],
      inputEnabled: false,
      buttonTheme: {
        visibility: 'hidden',
      },
      labelStyle: {
        visibility: 'hidden',
      },
    },

    plotOptions: {
      series: {
        fillOpacity: 0.1,
        marker: {
          enabled: false,
          states: {
            select: {
              enabled: true,
            },
          },
        },
      },
    },

    series: [
      {
        allowPointSelect: true,
        data: [], // sample data
      },
    ],
  },
}

const mutations = {
  ADD_POINT: (state, point) => {
    state.chartOptions.series[0].data = [
      ...state.chartOptions.series[0].data,
      point,
    ]
  },
}

const getters = {
  getChartOptions: (state) => {
    return state.chartOptions
  },
}

const actions = {
  async addPoint({ commit }, payload) {
    //console.log(payload)
    //console.log(payload)
    commit('ADD_POINT', payload)
  },
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations,
}
