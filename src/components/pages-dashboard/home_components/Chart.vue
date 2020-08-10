<template>
  <v-col cols="12" lg="12" sm="12" class="mt-4">
    <v-card class="grid" color="rgb(60, 60, 60)">
      <div class="card">
        <div class="card-img-bottom">
          <chartjs-line
            :datasets="dataset"
            :beginzero="beginZero"
            :bind="true"
            :labels="labels"
          />
        </div>
      </div>
    </v-card>
  </v-col>
</template>
<script type="text/javascript">
export default {
  data: () => ({
    beginZero: true,
    labels: [
      'BTC',
      'ETH',
      'XRP',
      'LTC',
      'BCH',
      'EOS',
      'BNB',
      'USDT',
      'BSV',
      'TRX',
    ],
    dataset: [
      {
        label: 'Currencies',
        borderColor: 'orange',
        data: [
          52980.90801,
          33812.77401,
          40098.09921,
          42980.11241,
          40098.09921,
          40098.09921,
          30098.09921,
          25098.09921,
          40098.09921,
          40098.09921,
        ],
      },
    ],
  }),
}
</script>
<style type="text/css"></style>
