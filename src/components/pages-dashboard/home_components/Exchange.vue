<template>
  <v-col cols="12">
    <v-toolbar class="gradient" dark dense>
      <v-row justify="center" class="text-center text-md-left">
        <v-col md="2" cols="4">
          <v-toolbar-title>Pair</v-toolbar-title>
        </v-col>

        <v-col md="2" cols="4">
          <v-toolbar-title>Last Price</v-toolbar-title>
        </v-col>

        <v-col md="2" class="hidden-sm-and-down">
          <v-toolbar-title>24h Change</v-toolbar-title>
        </v-col>

        <v-col md="2" class="hidden-sm-and-down">
          <v-toolbar-title>Market Cap</v-toolbar-title>
        </v-col>

        <v-col md="1" cols="4" class="text-center pl-2">
          <v-toolbar-title>Markets</v-toolbar-title>
        </v-col>

        <v-col md="3" class="text-center hidden-sm-and-down">
          <v-toolbar-title>24h Volume</v-toolbar-title>
        </v-col>
      </v-row>
    </v-toolbar>

    <v-row>
      <v-col
        class="pa-1"
        cols="12"
        v-for="(item, index) in conversionList"
        :key="index"
      >
        <currency-card
          :currency_from="item.currency_from"
          :currency_to="item.currency_to"
          :val_from="item.val_from"
          :val_to="item.val_to"
          :daily_change="item.daily_change"
          :cap="item.cap"
          :value_array="item.value_array"
          :daily_volume="item.daily_volume"
        />
      </v-col>
    </v-row>
  </v-col>
</template>
<script type="text/javascript">
import DataSource from '@/components/common/dataSource.js'
import CurrencyCard from './CurrencyCard'
export default {
  mixins: [DataSource],
  components: { CurrencyCard },
}
</script>
<style type="text/css"></style>
