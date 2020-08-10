<template>
  <v-row align="center">
    <v-col lg="3" md="4" cols="10" class="mt-2 bend" v-if="this.vmode">
      <v-card-text class="headline">
        Transaction Pin
      </v-card-text>
    </v-col>

    <v-col cols="1" v-if="this.vmode">
      <v-btn class="hidden-md-and-up" @click="edit()" fab depressed text small>
        <v-icon>edit</v-icon>
      </v-btn>
    </v-col>

    <v-col cols="12" md="12" v-if="this.vmode">
      <v-row align="center" style="background: rgba(33, 33, 33, 0.4);">
        <v-col cols="12" md="6" class="my-1 px-1">
          <v-row>
            <span class="pl-2 pt-2 caption grey--text">
              Pin
            </span>

            <v-card-text>
              {{ users.transaction_pin }}
            </v-card-text>
          </v-row>
        </v-col>

        <v-col class="hidden-sm-and-down mr-3">
          <v-row align="center" justify="end">
            <v-btn class="text-none" @click="edit()" rounded depressed text>
              Edit
              <v-icon class="ml-1" small>edit</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <!-- ------------------------------------------------------------------------------- -->

    <v-col lg="3" md="4" cols="10" class="mt-2 bend" v-if="!this.vmode">
      <v-card-text class="headline">
        Account Information
      </v-card-text>
    </v-col>

    <v-col cols="12" md="12" v-if="!this.vmode">
      <v-row
        align="center"
        style="background: rgba(33, 33, 33, 0.4);"
        class="pt-3"
      >
        <v-col cols="12" class="px-2 registration-container">
          <v-row>
            <v-col cols="12" md="6">
              <v-row>
                <span class="caption grey--text">
                  Pin
                </span>

                <v-text-field
                  flat
                  solo-inverted
                  v-model="users.transaction_pin"
                  class="text-none"
                />
              </v-row>
            </v-col>

            <v-col cols="12" md="6">
              <v-row>
                <span class="caption grey--text">
                  Re-type Pin
                </span>

                <v-text-field
                  flat
                  solo-inverted
                  v-model="users.transaction_re"
                  class="text-none"
                />
              </v-row>
            </v-col>

            <v-col md="6" class="hidden-sm-and-down" />

            <v-col class="mb-3">
              <v-row class="fill-height" align="end" justify="end">
                <v-btn class="text-none" @click="edit()" rounded depressed text>
                  Update
                  <v-icon class="ml-1" small>check</v-icon>
                </v-btn>
              </v-row>
            </v-col>

            <v-col class="mb-3">
              <v-row class="fill-height" align="end" justify="end">
                <v-btn class="text-none" @click="edit()" rounded depressed text>
                  Cancel
                  <v-icon class="ml-1" small>close</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script type="text/javascript">
import ErrorHandlerMixin from '@/mixins/error-handler.mixin'
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    users: {
      transaction_pin: '',
      transaction_re: '',
    },
    vmode: true,
  }),
  mixins: [ErrorHandlerMixin],
  methods: {
    ...mapActions('profile', ['addUsers']),
    promptMessage(message) {
      this.snackbar = true
      this.invalidRegMessage = message
    },
    cancel() {
      this.$router.push('/profile')
    },
    edit() {
      this.vmode = !this.vmode
    },
    populate() {
      this.users.transaction_pin = this.user.transaction_pin
    },
  },
  computed: {
    ...mapGetters('profile', ['user']),
  },
  created() {
    this.populate()
  },
}
</script>
<style lang="scss" scoped>
.bend {
  clip-path: polygon(0 0, 90% 0, 100% 100%, 0% 100%);
  background: rgba(33, 33, 33, 0.4);
}

.registration-container {
  .flex {
    padding: 0 8px !important;
  }
}
</style>
