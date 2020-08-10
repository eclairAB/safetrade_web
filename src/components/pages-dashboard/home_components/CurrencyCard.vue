<template>
  <v-col cols="12" class="mt-1">
    <v-card class="pl-3">
      <v-row align="center">
        <v-col md="2" cols="4">
          <v-card-text> {{ currency_from }} / {{ currency_to }} </v-card-text>
        </v-col>

        <v-col md="2" cols="4">
          <v-card-text> {{ val_from }} / {{ val_to }} </v-card-text>
        </v-col>

        <v-col md="2" class="hidden-sm-and-down">
          <v-card-text class="green--text">
            {{ daily_change }}
          </v-card-text>
        </v-col>

        <v-col md="2" class="hidden-sm-and-down">
          <v-card-text>
            {{ cap }}
          </v-card-text>
        </v-col>

        <v-col md="1" cols="4">
          <v-card flat>
            <v-sheet color="rgba(0, 0, 0, .0)">
              <v-sparkline
                :value="value_array"
                color="orange"
                height="100"
                line-width="3"
                padding="24"
                stroke-linecap="round"
                smooth
                auto-draw
                style="zoom: 0.4;"
              >
              </v-sparkline>
            </v-sheet>
          </v-card>
        </v-col>

        <v-col md="3" class="hidden-sm-and-down">
          <v-card-text class="text-center">
            {{ daily_volume }}
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script type="text/javascript">
export default {
  props: [
    'currency_from',
    'currency_to',
    'val_from',
    'val_to',
    'daily_change',
    'cap',
    'value_array',
    'daily_volume',
  ],
  data: () => ({
    value: [600, 446, 375, 300, 446, 575, 510],
  }),
}
</script>
<style type="text/css"></style>
