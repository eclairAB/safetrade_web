<template>
  <v-container fluid>
    <v-col cols="12" class="">
      <v-row>
        <v-col
          cols="12"
          lg="8"
          :class="{
            'mb-4': $vuetify.breakpoint.mdAndDown,
            'pr-3': $vuetify.breakpoint.lgAndUp,
          }"
        >
          <v-row>
            <exchange />
            <dashboard-trades />
          </v-row>
        </v-col>

        <v-col cols="12" lg="4">
          <v-row>
            <announcement />
            <convert />
            <chart />
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>
<script type="text/javascript">
import Convert from './home_components/Convert'
import Exchange from './home_components/Exchange'
import DashboardTrades from './home_components/DashboardTrades'
import Announcement from './home_components/Announcement'
import Chart from './home_components/Chart'
export default {
  components: { Convert, Exchange, DashboardTrades, Announcement, Chart },
}
</script>
<style lang="scss" scoped>
.home-container {
  .flex {
    padding: 0 2px !important;
  }
}

.grid {
  display: grid;
  row-gap: 2rem;
}
</style>
