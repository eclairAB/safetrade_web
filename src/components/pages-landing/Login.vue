<template>
  <v-container class="fill-height" fluid>
    <div class="auth-layout__auth-wallpaper__cross-line_i gradient" />
    <div class="auth-layout__auth-wallpaper__cross-line" />

    <v-row justify="center" align="center">
      <v-col lg="6"> </v-col>

      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card flat class="px-5 my-0" color="rgba(51, 51, 51, 0)">
          <v-row>
            <v-card-text class="text-center font-weight-bold">
              <h2 class="aaa">Welcome back traders!</h2>
            </v-card-text>

            <v-col class="mt-1" cols="12">
              <v-form v-model="isFormValid">
                <v-text-field
                  v-model="formData.username"
                  :rules="[rules.required]"
                  @keyup.enter="submit"
                  flat
                  solo-inverted
                  class="white--text"
                  autocomplete="off"
                  label="Username"
                />

                <v-text-field
                  @click:append="show = !show"
                  v-model="formData.password"
                  @keyup.enter="submit"
                  :rules="[rules.required]"
                  :append-icon="show ? 'visibility_off' : 'visibility'"
                  :type="show ? 'text' : 'password'"
                  class="white--text"
                  flat
                  autocomplete="off"
                  label="Password"
                  solo-inverted
                />

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    :loading="loading"
                    :to="{ name: 'signup' }"
                    class="mb-2 px-4 text-none"
                    rounded
                    color="white lighten-3"
                    dark
                    text
                  >
                    Signup
                  </v-btn>

                  <v-btn
                    :loading="loading"
                    :disabled="!isFormValid"
                    @click="submit"
                    class="mb-2 px-4 text-none"
                    rounded
                    color="white lighten-3"
                    dark
                    text
                  >
                    Login
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useFormRules } from '@/compositions'
import { useSnackBar } from '@/compositions'
import { mapActions } from 'vuex'

export default {
  setup(_props, context) {
    const { showSnackBar } = useSnackBar(context)
    const rules = useFormRules()
    return { rules, showSnackBar }
  },
  data: () => ({
    isFormValid: false,
    loading: false,
    show: false,
    formData: {
      username: '',
      password: '',
    },
  }),
  methods: {
    ...mapActions('profile', ['login']),
    async submit() {
      if (!this.isFormValid) {
        return
      }
      this.loading = true
      try {
        await this.login(this.formData)
        this.$router.push({ name: 'wallet' })
      } catch (_err) {
        this.showSnackBar('error', 'Invalid Credentials')
      }
      this.loading = false
    },
  },
}
</script>
<style lang="scss">
.aaa {
  color: #d5d1d1;
}

.auth-layout__auth-wallpaper__cross-line {
  z-index: 0;
  position: fixed;
  background-color: #282828;
  /*box-shadow: 3px 3px 5px 1px #333;*/
  left: calc(68% - 27% / 2);
  -webkit-transform: rotate(15deg);
  transform: rotate(15deg);
  width: 100%;
  height: 1000%;
  margin-top: -30%;
}

.auth-layout__auth-wallpaper__cross-line_i {
  z-index: 0;
  position: fixed;
  background-color: #f9a11c;
  left: calc(63% - 27% / 2);
  -webkit-transform: rotate(15deg);
  transform: rotate(15deg);
  width: 27%;
  height: 1000%;
  margin-top: -30%;
}
</style>
