<template>
  <v-row>
    <v-card width="100%">
      <v-toolbar class="gradient" dark>
        <v-icon>compare_arrows</v-icon>

        <v-toolbar-title>Convert</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn class="text-none" rounded color="red" depressed @click.stop="">
          Cancel
        </v-btn>

        <v-btn
          class="text-none"
          rounded
          color="green darken-2"
          depressed
          @click.stop=""
        >
          Convert
        </v-btn>
      </v-toolbar>

      <v-col class="px-3 pt-3">
        <v-row justify="center">
          <v-col cols="12" md="9" class="pr-2">
            <v-row>
              <span class="caption grey--text">
                Amount to be converted
              </span>

              <v-text-field flat solo-inverted class="text-none" />
            </v-row>
          </v-col>

          <v-col cols="12" md="3">
            <v-row>
              <v-col>
                <span class="ml-2 caption grey--text">
                  Convert to
                </span>
              </v-col>

              <v-col>
                <v-row>
                  <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        dark
                        large
                        rounded
                        depressed
                        class="text-none"
                        color="red"
                        v-on="on"
                      >
                        {{ selected }}
                        <v-icon dark>arrow_drop_down</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item
                        v-for="item in items"
                        :key="item"
                        @click="select_a(item)"
                      >
                        <v-list-item-title v-text="item"></v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col>
        <v-row>
          <span class="ml-3 pb-3 caption grey--text">
            Current balance: <span class="orange--text">2005</span>
          </span>

          <span class="ml-3 pb-3 caption grey--text">
            Remaining balance after convert:
            <span class="orange--text">99.301</span>
          </span>
        </v-row>
      </v-col>
    </v-card>
  </v-row>
</template>
<script type="text/javascript">
export default {
  props: ['img'],
  data: () => ({
    selected: 'BTC',
    items: [
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
  }),
  methods: {
    select_a(item) {
      this.selected = item
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
