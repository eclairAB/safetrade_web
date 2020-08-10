<template>
  <v-container class="fill-height" fluid>
    <div class="auth-layout__auth-wallpaper__cross-line_i gradient" />
    <div class="auth-layout__auth-wallpaper__cross-line" />

    <!-- <span id="s-trade">Safe Trade</span> -->

    <v-row justify="center" align="center">
      <v-col lg="6" />

      <v-col cols="12" lg="6">
        <v-col class="blur" />

        <v-card flat color="rgba(51, 51, 51, 0)">
          <v-form v-model="isFormValid">
            <v-card-text class="text-center font-weight-bold aaa">
              <h2>Registration</h2>
            </v-card-text>

            <v-col cols="12" class="px-2 py-4 registration-container">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.username"
                    :rules="[rules.required]"
                    flat
                    solo-inverted
                    hint=""
                    label="Username"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.email"
                    :rules="[rules.required, rules.email]"
                    flat
                    solo-inverted
                    label="Email addresss"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    flat
                    solo-inverted
                    v-model="formData.name_first"
                    :rules="[rules.required]"
                    label="First name"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    flat
                    solo-inverted
                    v-model="formData.name_last"
                    :rules="[rules.required]"
                    label="Last name"
                  />
                </v-col>

                <v-col cols="12" md="6" lg="6">
                  <v-text-field
                    flat
                    solo-inverted
                    v-model="formData.contact_no"
                    :rules="[rules.required, rules.digitonly]"
                    label="Contact Number"
                  />
                </v-col>

                <v-col md="6"> </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    flat
                    solo-inverted
                    v-model="formData.password"
                    :rules="[rules.required]"
                    label="Password"
                    type="password"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.c_password"
                    :rules="[rules.required]"
                    flat
                    solo-inverted
                    label="Re-type Password"
                    type="password"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-form>

          <v-card-actions class="pb-4">
            <v-spacer></v-spacer>
            <v-btn
              @click="back"
              class="mx-1 px-4 black--text text-none"
              color="white lighten-3"
              rounded
              dark
              text
            >
              Back
            </v-btn>

            <v-btn
              :loading="loading"
              :disabled="!isFormValid"
              @click="showPinDialog"
              class="mx-1 px-4 black--text text-none"
              color="white lighten-3"
              rounded
              dark
              text
            >
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-dialog
        v-model="dialog"
        persistent
        :width="convertWidth"
        transition="dialog-transition"
      >
        <v-card>
          <v-toolbar class="gradient" dark>
            <v-icon>security</v-icon>

            <v-toolbar-title class="hidden-xs-only">
              Set up your transaction pin
            </v-toolbar-title>
            <v-toolbar-title class="hidden-sm-and-up">
              Set up pin
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
              class="text-none"
              rounded
              :disabled="formData.transaction_pin ? false : true"
              color="rgba(55,55,55,0.4)"
              depressed
              @click.stop="submit"
            >
              Submit
            </v-btn>

            <v-btn
              class="text-none"
              icon
              color="rgba(198,52,59,0.7)"
              depressed
              @click="dialog = false"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-text-field
            class="mt-4 mx-3"
            flat
            solo-inverted
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.digitonly]"
            :type="show ? 'text' : 'password'"
            @keyup.enter="submit"
            @click:append="show = !show"
            v-model="formData.transaction_pin"
          />
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import { useSnackBar } from '@/compositions'
import { countries } from '@/components/pages-landing/country_state'
import { mapActions, mapGetters } from 'vuex'
import { useFormRules } from '@/compositions'

export default {
  setup(_props, context) {
    const { showSnackBar } = useSnackBar(context)
    const rules = useFormRules()
    return { rules, showSnackBar }
  },
  data: () => ({
    isFormValid: true,
    snackBarPayload: {},
    dialog: false,
    loading: false,
    show: false,
    formData: {
      transaction_pin: '',
      username: '',
      email: '',
      name_first: '',
      name_last: '',
      contact_no: '',
      password: '',
      c_password: '',
    },
    err: '',
  }),
  /*components: {
    DatePicker
  },*/
  computed: {
    ...mapGetters('profile', ['user']),
    countryChoices() {
      return countries.map((item) => item.country)
    },
    stateChoices() {
      const country = countries.find(
        (item) => item.country === this.formData.country
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
    ...mapActions('profile', ['CREATE_USER', 'signup']),
    back() {
      this.$router.push('/')
    },
    async submit() {
      if (!this.isFormValid) {
        return
      }
      try {
        await this.signup(this.formData)
        this.$router.push('/dashboard')
      } catch ({ response }) {
        const { errors } = response.data
        if (errors) {
          const keys = Object.keys(errors)
          if (keys.length > 0) {
            this.showSnackBar('error', errors[keys[0]][0])
          }
        } else {
          this.showSnackBar(
            'error',
            'An error occurred, please try again later.'
          )
        }
      }
    },
    showPinDialog() {
      if (this.formData.password != this.formData.c_password) {
        this.showSnackBar('error', 'Passwords do not match')
      } else {
        this.dialog = true
      }
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.registration-container {
  .flex {
    padding: 0 8px !important;
  }
}

.aaa {
  color: #d5d1d1;
}

.black--text {
  color: #fff !important;
}
</style>
