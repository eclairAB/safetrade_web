<template>
  <v-row align="center">
    <v-col lg="3" md="4" cols="9" class="mt-3 bend">
      <v-card-text class="headline">
        Basic information
      </v-card-text>
    </v-col>

    <v-col
      cols="12"
      md="12"
      class="registration-container bordered py-0"
      style="background: rgba(33, 33, 33, 0.4);"
    >
      <v-form v-model="isFilled">
        <v-row align="center" class="pa-5">
          <v-col cols="12" md="6" class="px-1">
            <span class="pt-2 caption grey--text">
              First name
            </span>

            <v-card-text v-if="this.vmode">
              {{ users.name_first }}
            </v-card-text>

            <v-text-field
              v-if="!this.vmode"
              hint=""
              :rules="[rules.required]"
              text
              solo-inverted
              v-model="users.name_first"
            />
          </v-col>

          <v-col cols="12" md="6" class="px-1">
            <span class="pt-2 caption grey--text">
              Last name
            </span>

            <v-card-text v-if="this.vmode">
              {{ users.name_last }}
            </v-card-text>

            <v-text-field
              v-if="!this.vmode"
              hint=""
              :rules="[rules.required]"
              text
              solo-inverted
              v-model="users.name_last"
            />
          </v-col>

          <v-col cols="12" md="6" class="px-1">
            <span class="pt-2 caption grey--text">
              Contact Number
            </span>

            <v-card-text v-if="this.vmode">
              {{ users.contact_no }}
            </v-card-text>

            <v-text-field
              v-if="!this.vmode"
              hint=""
              :rules="[rules.required, rules.digitonly]"
              text
              solo-inverted
              v-model="users.contact_no"
            />
          </v-col>

          <v-col cols="12" md="6" class="px-0">
            <span class="pt-2 caption grey--text">
              Birth Date
            </span>

            <v-card-text v-if="this.vmode">
              {{ users.birth_date }}
            </v-card-text>

            <date-picker
              v-if="!this.vmode"
              text
              solo-inverted
              v-model="users.birth_date"
            />
          </v-col>

          <v-col cols="12" md="6" class="px-1">
            <span class="pt-2 caption grey--text">
              Zip Code
            </span>

            <v-card-text v-if="this.vmode">
              {{ users.zip_code }}
            </v-card-text>

            <v-text-field
              v-if="!this.vmode"
              hint=""
              :rules="[rules.required, rules.digitonly]"
              text
              solo-inverted
              v-model="users.zip_code"
            />
          </v-col>

          <v-col cols="12" md="6" class="px-1">
            <span class="pt-2 caption grey--text">
              City
            </span>

            <v-card-text v-if="this.vmode">
              {{ users.city }}
            </v-card-text>

            <v-text-field
              v-if="!this.vmode"
              hint=""
              :rules="[rules.required]"
              text
              solo-inverted
              v-model="users.city"
            />
          </v-col>

          <v-col cols="12" md="6" class="px-1">
            <span class="pt-2 caption grey--text">
              Address
            </span>

            <v-card-text v-if="this.vmode">
              {{ users.address }}
            </v-card-text>

            <v-text-field
              v-if="!this.vmode"
              hint=""
              :rules="[rules.required]"
              text
              solo-inverted
              v-model="users.address"
            />
          </v-col>

          <v-col cols="12" md="6" class="px-1">
            <span class="pt-2 caption grey--text">
              Country
            </span>

            <v-card-text v-if="this.vmode">
              {{ users.country }}
            </v-card-text>

            <v-autocomplete
              v-if="!this.vmode"
              text
              solo-inverted
              :rules="[rules.required]"
              v-model="users.country"
              :items="countryChoices"
            />
          </v-col>

          <v-col cols="12" md="6" class="px-1">
            <span class="pt-2 caption grey--text">
              State
            </span>

            <v-card-text v-if="this.vmode">
              {{ users.state }}
            </v-card-text>

            <v-autocomplete
              v-if="!this.vmode"
              solo-inverted
              text
              v-model="users.state"
              :rules="[rules.required]"
              :disabled="!users.country"
              :items="stateChoices"
            />
          </v-col>

          <v-col class="mr-1">
            <v-row align="center" justify="end">
              <v-btn
                class="text-none"
                @click="vmode ? edit() : (tPin = true)"
                rounded
                depressed
                text
              >
                {{ this.vmode ? 'Edit' : 'Update' }}
                <v-icon class="ml-1" small>
                  {{ this.vmode ? 'edit' : 'update' }}
                </v-icon>
              </v-btn>
            </v-row>
          </v-col>

          <v-col v-if="!vmode">
            <v-row class="fill-height" align="end" justify="end">
              <v-btn
                class="text-none"
                @click="edit()"
                color="transparent"
                rounded
                depressed
              >
                Cancel
                <v-icon class="ml-1" small>close</v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-col>

    <v-dialog v-model="tPin" :width="convertWidth" persistent>
      <v-card>
        <pin-card @close="tPin = false" @addPin="update" />
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script type="text/javascript">
import Vue from 'vue'
import DatePicker from '@/components/props/DatePicker'
import PinCard from '@/components/props/PinCard.vue'
import ErrorHandlerMixin from '@/mixins/error-handler.mixin'
import { countries } from '@/components/pages-landing/country_state'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { postApi } from '@/http'
import { useFormRules } from '@/compositions'

export default {
  components: {
    DatePicker,
    PinCard,
  },
  setup() {
    const rules = useFormRules()
    return { rules }
  },
  data: () => ({
    isFilled: false,
    users: {
      id: '',
      name_first: '',
      name_last: '',
      contact_no: '',
      birth_date: null,
      zip_code: '',
      city: '',
      address: '',
      country: null,
      state: null,
    },
    snackBarPayload: {},
    vmode: true,
    tPin: false,
    err: '',
    errMsg: ['Incorrect Transaction Pin!'],
  }),
  mixins: [ErrorHandlerMixin],
  computed: {
    ...mapGetters('profile', ['user']),
    countryChoices() {
      return countries.map((item) => item.country)
    },
    stateChoices() {
      const country = countries.find(
        (item) => item.country === this.users.country
      )
      if (country) {
        return country.states
      } else {
        return []
      }
    },
    convertWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '100%'
        case 'sm':
          return '100%'
        case 'md':
          return '80%'
        case 'lg':
          return '50%'
        case 'xl':
          return '30%'
      }
      return null
    },
  },
  methods: {
    ...mapActions('snackBar', ['showSnackBar']),
    ...mapMutations('profile', ['SET_BASIC']),
    edit() {
      if (!this.vmode) this.populate()
      this.vmode = !this.vmode
    },
    populate() {
      for (let item in this.users) {
        Vue.set(this.users, item, this.user[item])
      }
    },
    update(pin) {
      this.users.transaction_pin = pin
      postApi(`update/user/basic/${this.users.id}`, this.users)
        .then((data) => {
          this.setMessage(data)
        })
        .catch((data) => {
          this.showPopup('error', 'Fields cannot be empty')
          this.err = data
        })
    },
    showPopup(color, text) {
      this.snackBarPayload.color = color
      this.snackBarPayload.isShow = true
      this.snackBarPayload.text = text

      this.showSnackBar(this.snackBarPayload)
    },
    setMessage(data) {
      switch (data.message) {
        case this.errMsg[0]:
          this.showPopup(
            'error',
            'Incorrect transaction pin. Basic information not updated'
          )

          break
        default:
          this.showPopup('success', 'Basic information updated successfully')
          this.vmode = !this.vmode
          this.SET_BASIC(this.users)
      }
    },
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
</style>
