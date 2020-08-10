<template>
  <v-col lg="12" md="12" sm="12" cols="12">
    <v-card flat>
      <v-col>
        <v-row justify="space-between" align="center">
          <v-col cols="4" md="2">
            <v-row justify="space-between" align="center">
              <v-col cols="12">
                <v-img
                  class="shrink mx-3 mt-3 mb-2 circ"
                  contain
                  height="50px"
                  :src="img"
                  style="flex-basis: 65px;"
                ></v-img>
              </v-col>

              <v-col cols="12" class="text-center mb-2">
                {{ username }}
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="8" md="2" class="px-2">
            <v-row justify="space-between" align="center">
              <v-card-text v-if="type === 'Reload'" class="green--text">
                {{ type }}
              </v-card-text>

              <v-card-text v-if="type === 'Withdraw'" class="orange--text">
                {{ type }}
              </v-card-text>
            </v-row>
          </v-col>

          <v-col cols="8" md="2" class="px-2">
            <v-row justify="space-between" align="center">
              <v-card-text>
                currency:
                {{ currency }}
              </v-card-text>
            </v-row>
          </v-col>

          <v-col cols="8" md="2" class="px-2">
            <v-row justify="space-between" align="center">
              <v-card-text>
                amount requested:
                {{ amount }}
              </v-card-text>
            </v-row>
          </v-col>

          <v-col cols="8" md="2" class="px-2">
            <v-row justify="space-between" align="center">
              <v-card-text> {{ sliceDate }}<br />{{ sliceTime }} </v-card-text>
            </v-row>
          </v-col>

          <v-col cols="12" md="2" class="px-2">
            <v-row>
              <v-btn
                @click="$emit('cardBtn')"
                class="text-none gradient black--text mx-1"
                block
                large
                rounded
              >
                Approve
              </v-btn>

              <v-btn
                @click="$emit('cardDel')"
                class="text-none deletegrad white--text mx-1"
                block
                large
                rounded
              >
                Delete
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </v-col>
</template>
<script type="text/javascript">
import DataSource from '@/components/common/dataSource.js'
export default {
  mixins: [DataSource],
  props: ['img', 'username', 'type', 'amount', 'currency', 'dateTime'],
  data: () => ({}),
  computed: {
    sliceTime() {
      return this.dateTime.slice(11, 19)
    },
    sliceDate() {
      return this.dateTime.slice(0, -9)
    },
  },
}
</script>
<style type="text/css"></style>
