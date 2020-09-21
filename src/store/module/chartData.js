import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  chartOptions: {
    legend: {
      enabled: false,
    },
    title: {
      text: '',
    },
    tooltip: {
      enabled: false,
    },
    xAxis: {
      crosshair: true,
      tickInterval: 15 * 1000,
      type: 'datetime',
      gridLineWidth: 1,
      gridLineColor: 'rgba(70, 130, 180, 0.5)',
    },

    yAxis: {
      gridLineWidth: 1,
      gridLineColor: 'rgba(70, 130, 180, 0.5)',
      ordinal: false,
      crosshair: true,

      labels: {
        enabled: false,
      },

      title: {
        text: '',
      },
    },
    navigator: {
      enabled: true,
    },
    scrollbar: {
      enabled: true,
    },
    rangeSelector: {
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
      selected: 0,
      buttonTheme: {
        visibility: 'hidden',
      },
      labelStyle: {
        visibility: 'hidden',
      },
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    chart: {
      fontFamily: 'calibri',
      backgroundColor: '#242424',
      height: '50%',
      type: 'area',
    },
    series: [
      {
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
