<template>
  <v-col cols="12" lg="12">
    <v-card dark max-width="100%">
      <v-col cols="12">
        <v-toolbar class="gradient" dark dense>
          <v-icon>monetization_on</v-icon>

          <v-toolbar-title>Converter</v-toolbar-title>
        </v-toolbar>
      </v-col>

      <v-col cols="12" lg="12">
        <v-row justify="center" align="center">
          <v-col cols="12" lg="12">
            <v-row justify="center" align="center">
              <v-col cols="12" lg="5">
                <v-card-text>
                  <div class="subheading font-weight-thin">
                    1 {{ home.selectfrom }} equals
                  </div>
                </v-card-text>

                <v-card-text>
                  <div class="display-1 font-weight-thin">
                    {{ currencyB }} {{ home.selectto }}
                  </div>
                </v-card-text>
              </v-col>

              <v-col cols="12" lg="7" class="pt-4">
                <v-row justify="center" align="center">
                  <v-col cols="6" lg="6">
                    <v-text-field
                      class="mx-3"
                      flat
                      v-model="home.convertfrom"
                      solo-inverted
                      @input="convertFcn()"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6" lg="6" class="pr-3">
                    <v-row align="center">
                      <!-- <v-select
                        v-model="home.selectfrom"
                        flat
                        background-color="rgba(51, 51, 51, 0.3)"
                        :items="currencyArr"
                        item-text="currency"
                        solo
                        prepend-inner-icon="arrow_drop_down"
                        @input="compute(home.selectfrom, 1)"
                        @change="compute(home.selectfrom, 1)"
                      ></v-select>
 -->
                      <v-select
                        v-model="home.selectfrom"
                        flat
                        background-color="red"
                        :items="items"
                        item-text="currency"
                        solo
                        prepend-inner-icon="arrow_drop_down"
                        @input="compute(home.selectfrom, 1)"
                        @change="compute(home.selectfrom, 1)"
                      ></v-select>
                    </v-row>
                  </v-col>

                  <v-col cols="6" lg="6">
                    <v-text-field
                      class="mx-3"
                      flat
                      readonly
                      v-model="home.convertto"
                      solo-inverted
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6" lg="6" class="pr-3">
                    <v-row align="center">
                      <!-- <v-select
                        v-model="home.selectto"
                        flat
                        background-color="rgba(51, 51, 51, 0.3)"
                        :items="currencyArr"
                        item-text="currency"
                        solo
                        prepend-inner-icon="arrow_drop_down"
                        @input="compute(home.selectto, 2)"
                        @change="compute(home.selectto, 2)"
                      ></v-select> -->

                      <v-select
                        v-model="home.selectto"
                        flat
                        background-color="red lighten-1"
                        :items="items"
                        item-text="currency"
                        solo
                        prepend-inner-icon="arrow_drop_down"
                        @input="compute(home.selectfrom, 2)"
                        @change="compute(home.selectfrom, 2)"
                      ></v-select>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>

          <!-- <v-flex xs12 lg4>
            <v-card-text>
              <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline
                  :value="value"
                  color="rgba(255, 255, 255, .7)"
                  height="100"
                  line-width="0.8"
                  padding="24"
                  stroke-linecap="round"
                  smooth
                  auto-draw
                >
                  <template v-slot:label="item">
                    {{ item.value }}
                  </template>
                </v-sparkline>
              </v-sheet>
            </v-card-text>
          </v-flex> -->
        </v-row>
      </v-col>
    </v-card>
  </v-col>
</template>
<script type="text/javascript">
export default {
  methods: {
    compute(item, selectionno) {
      // this method gets code value of text currency
      if (selectionno == '1') {
        var selected = global._.find(this.items, function (o) {
          return o.currency == item
        })
        var singleArr = global._.at(selected, ['rate'])
        this.currencyA = global._.nth(singleArr, 0)

        this.convertFcn()
      } else {
        var selected_ = global._.find(this.items, function (o) {
          return o.currency == item
        })
        var singleArr_ = global._.at(selected_, ['rate'])
        this.currencyB = global._.nth(singleArr_, 0)

        this.convertFcn()
      }
    },
    /*compute (item, selectionno) { // this method gets code value of text currency
    if (selectionno == '1') {
      var selected = global._.find(this.currencyArr, function(o) { return o.currency == item })
      var singleArr = global._.at(selected, ['rate'])
      this.currencyA = global._.nth(singleArr, 0)

      this.convertFcn()
    }
    else {
      var selected_ = global._.find(this.currencyArr, function(o) { return o.currency == item })
      var singleArr_ = global._.at(selected_, ['pesorate', 'rate'])
      this.currencyB = global._.nth(singleArr_, 0)

      this.convertFcn()
    }
  },*/
    convertFcn() {
      if (this.home.selectfrom === this.home.selectto) {
        this.home.convertto = this.home.convertfrom
        this.currencyB = '1'
      } else if (
        this.home.selectfrom != 'Philippine Peso' &&
        this.home.selectto === 'Philippine Peso'
      ) {
        // computation issue
        this.home.convertto = this.home.convertfrom / this.currencyA
        this.currencyB = this.currencyA
      } else if (
        this.home.selectfrom === 'Philippine Peso' &&
        this.home.selectto != 'Philippine Peso'
      ) {
        this.home.convertto = this.currencyB * this.home.convertfrom
      } else {
        // main computation issue
        var con1 = (this.home.convertfrom / this.currencyA) * this.currencyB
        this.home.convertto = con1 / this.currencyB
      }
    },
    /*convertFcn () {
    if (this.home.selectfrom === this.home.selectto) {
      this.home.convertto = this.home.convertfrom
      this.currencyB = '1'
    }
    else if (this.home.selectfrom != 'Philippine Peso' && this.home.selectto === 'Philippine Peso') { // computation issue
      this.home.convertto = this.home.convertfrom / this.currencyA
      this.currencyB = this.currencyA
    }
    else if (this.home.selectfrom === 'Philippine Peso' && this.home.selectto != 'Philippine Peso') {
      this.home.convertto = this.currencyB * this.home.convertfrom
    }
    else { // main computation issue
      var con1 = ( this.home.convertfrom /  this.currencyA ) * this.currencyB
      this.home.convertto = con1 / this.currencyB
    }
  }*/
  },
  data: () => ({
    home: {
      selectfrom: 'BTC',
      selectto: 'BNB',
      convertfrom: '18',
      convertto: '14.924610000000001',
    },
    // ======================================================================================================
    currencyA: 'PHP',
    currencyB: '0.829145',
    conv2: '123',
    // ======================================================================================================
    btc: 'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png',
    eth:
      'https://kryptowaehrung-info.de/wp-content/uploads/2017/09/a2bcf4f8-9a5d-4f85-873b-cf94ce537eb0.png',
    xrp: 'https://cryptoslate.com/wp-content/uploads/2017/09/xrp-logo.jpg',
    currencyArr: [
      // Philippine peso rate 7/22/2019
      {
        currency: 'Argentine Peso',
        pesorate: '0.829145',
        rate: '1.206061',
      },
      {
        currency: 'Australian Dollar',
        pesorate: '0.027809',
        rate: '35.959620',
      },
      {
        currency: 'Bahraini Dinar',
        pesorate: '0.007356',
        rate: '135.942422',
      },
      {
        currency: 'Botswana Pula',
        pesorate: '0.206943',
        rate: '4.832254',
      },
      {
        currency: 'Brazilian Real',
        pesorate: '0.073329',
        rate: '13.637107',
      },
      {
        currency: 'British Pound',
        pesorate: '0.015643',
        rate: '63.924877',
      },
      {
        currency: 'Bruneian Dollar',
        pesorate: '0.026628',
        rate: '37.555065',
      },
      {
        currency: 'Bulgarian Lev',
        pesorate: '0.034100',
        rate: '29.325093',
      },
      {
        currency: 'Canadian Dollar',
        pesorate: '0.025545',
        rate: '39.146023',
      },
      {
        currency: 'Chilean Peso',
        pesorate: '13.477205',
        rate: '0.074199',
      },
      {
        currency: 'Chinese Yuan Renminbi',
        pesorate: '0.134566',
        rate: '7.431317',
      },
      {
        currency: 'Colombian Peso',
        pesorate: '62.106202',
        rate: '0.016101',
      },
      {
        currency: 'Croatian Kuna',
        pesorate: '0.128831',
        rate: '7.762084',
      },
      {
        currency: 'Czech Koruna',
        pesorate: '0.445279',
        rate: '2.245783',
      },
      {
        currency: 'Danish Krone',
        pesorate: '0.130178',
        rate: '7.681782',
      },
      {
        currency: 'Emirati Dirham',
        pesorate: '0.071849',
        rate: '13.918135',
      },
      {
        currency: 'Euro',
        pesorate: '0.017435',
        rate: '57.354896',
      },
      {
        currency: 'Hong Kong Dollar',
        pesorate: '0.152757',
        rate: '6.546357',
      },
      {
        currency: 'Hungarian Forint',
        pesorate: '5.669121',
        rate: '0.176394',
      },
      {
        currency: 'Icelandic Krona',
        pesorate: '2.446274',
        rate: '0.408785',
      },
      {
        currency: 'Indian Rupee',
        pesorate: '1.350355',
        rate: '0.740546',
      },
      {
        currency: 'Indonesian Rupiah',
        pesorate: '273.027009',
        rate: '0.003663',
      },
      {
        currency: 'Iranian Rial',
        pesorate: '824.249962',
        rate: '0.001213',
      },
      {
        currency: 'Israeli Shekel',
        pesorate: '0.069266',
        rate: '14.437179',
      },
      {
        currency: 'Japanese Yen',
        pesorate: '2.111662',
        rate: '0.473561',
      },
      {
        currency: 'Kazakhstani Tenge',
        pesorate: '7.546472',
        rate: '0.132512',
      },
      {
        currency: 'Kuwaiti Dinar',
        pesorate: '0.005955',
        rate: '167.935422',
      },
      {
        currency: 'Libyan Dinar',
        pesorate: '0.027403',
        rate: '36.492051',
      },
      {
        currency: 'Malaysian Ringgit',
        pesorate: '0.080529',
        rate: '12.417945',
      },
      {
        currency: 'Mauritian Rupee',
        pesorate: '0.701701',
        rate: '1.425108',
      },
      {
        currency: 'Mexican Peso',
        pesorate: '0.372445',
        rate: '2.684963',
      },
      {
        currency: 'Nepalese Rupee',
        pesorate: '2.170696',
        rate: '0.460682',
      },
      {
        currency: 'New Zealand Dollar',
        pesorate: '0.028889',
        rate: '34.614916',
      },
      {
        currency: 'Norwegian Krone',
        pesorate: '0.167815',
        rate: '5.958926',
      },
      {
        currency: 'Omani Rial',
        pesorate: '0.007522',
        rate: '132.937193',
      },
      {
        currency: 'Pakistani Rupee',
        pesorate: '3.131401',
        rate: '0.319346',
      },
      {
        currency: 'Philippine Peso', //----------------------------------------------------
        pesorate: '1',
        rate: '1',
      },
      {
        currency: 'Polish Zloty',
        pesorate: '0.074145',
        rate: '13.487133',
      },
      {
        currency: 'Qatari Riyal',
        pesorate: '0.071213',
        rate: '14.042404',
      },
      {
        currency: 'Romanian New Leu',
        pesorate: '0.082435',
        rate: '12.130840',
      },
      {
        currency: 'Russian Ruble',
        pesorate: '1.232661',
        rate: '0.811253',
      },
      {
        currency: 'Saudi Arabian Riyal',
        pesorate: '0.073365',
        rate: '13.630493',
      },
      {
        currency: 'Singapore Dollar',
        pesorate: '0.026628',
        rate: '37.555065',
      },
      {
        currency: 'South African Rand',
        pesorate: '0.272877',
        rate: '3.664650',
      },
      {
        currency: 'South Korean Won',
        pesorate: '23.052976',
        rate: '0.043378',
      },
      {
        currency: 'Sri Lankan Rupee',
        pesorate: '3.440040',
        rate: '0.290694',
      },
      {
        currency: 'Swedish Krona',
        pesorate: '0.183745',
        rate: '5.442318',
      },
      {
        currency: 'Swiss Franc',
        pesorate: '0.019225',
        rate: '52.016893',
      },
      {
        currency: 'Taiwan New Dollar',
        pesorate: '0.607856',
        rate: '1.645127',
      },
      {
        currency: 'Thai Baht',
        pesorate: '0.603570',
        rate: '1.656809',
      },
      {
        currency: 'Trinidadian Dollar',
        pesorate: '0.132519',
        rate: '7.546114',
      },
      {
        currency: 'Turkish Lira',
        pesorate: '0.110977',
        rate: '9.010913',
      },
      {
        currency: 'US Dollar',
        pesorate: '0.019564',
        rate: '51.114351',
      },
      {
        currency: 'Venezuelan Bolivar',
        pesorate: '0.195395',
        rate: '5.117832',
      },
    ],
    items: [
      {
        currency: 'BTC',
        rate: '0.003663',
      },
      {
        currency: 'ETH',
        rate: '0.001213',
      },
      {
        currency: 'XRP',
        rate: '14.437179',
      },
      {
        currency: 'LTC',
        rate: '0.473561',
      },
      {
        currency: 'BCH',
        rate: '0.132512',
      },
      {
        currency: 'EOS',
        rate: '167.935422',
      },
      {
        currency: 'BNB',
        rate: '36.492051',
      },
      {
        currency: 'USDT',
        rate: '12.417945',
      },
      {
        currency: 'BSV',
        rate: '1.425108',
      },
      {
        currency: 'TRX',
        rate: '2.684963',
      },
    ],
  }),
}
</script>
