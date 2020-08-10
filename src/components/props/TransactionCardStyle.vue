<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="12">
        <v-row>
          <v-col cols="12" lg="4" class="mt-2">
            <v-row class="align-center" v-if="!isRequest">
              <v-img
                class="shrink circ"
                contain
                height="40px"
                :src="img_i"
                style="flex-basis: 115px;"
              />

              <v-icon v-if="transfer_txt">{{
                type === 'trade' ? 'swap_horiz' : 'arrow_right_alt'
              }}</v-icon>

              <v-img
                class="shrink circ"
                contain
                height="40px"
                :src="img_ii"
                style="flex-basis: 115px;"
              />
            </v-row>

            <v-row class="align-center" v-if="isRequest">
              <v-img
                class="shrink circ"
                contain
                height="40px"
                :src="request_img"
                style="flex-basis: 115px;"
              />
            </v-row>
          </v-col>

          <v-col cols="9" lg="6">
            <v-row class="align-center">
              <v-col cols="4" lg="2">
                <v-img
                  v-if="!isRequest"
                  class="shrink circ"
                  contain
                  height="20px"
                  :src="transfer_img"
                  style="flex-basis: 125px;"
                />
              </v-col>

              <v-col cols="4" lg="1">
                <v-img
                  v-if="!isRequest"
                  class="shrink circ"
                  contain
                  height="20px"
                  :src="request_img"
                  style="flex-basis: 125px;"
                />
              </v-col>

              <v-col cols="12" lg="12">
                <v-card-text class="ml-3">
                  {{ transfer_txt }}
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="3" lg="2">
            <v-row class="mt-4 text-lg-right">
              <v-col lg="12">
                {{ date }}
              </v-col>

              <v-col lg="12">
                {{ time }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script type="text/javascript">
export default {
  props: [
    'img_i',
    'img_ii',
    'type',
    'transfer_img',
    'request_img',
    'transfer_txt',
    'date',
    'time',
  ],
  data: () => ({}),
  computed: {
    isRequest() {
      return this.type === 'Reload' || this.type === 'Withdraw' ? true : false
    },
  },
}
</script>
<style type="text/css">
.shape {
  clip-path: polygon(10px 20px, 100% 0, 100% 100%, 0 100%);
}

.circ {
  clip-path: circle();
}
</style>
