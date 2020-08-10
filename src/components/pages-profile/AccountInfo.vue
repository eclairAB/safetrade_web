<template>
  <v-row align="center">
    <v-col lg="3" md="4" cols="10" class="mt-2 bend">
      <v-card-text class="headline">
        Account Information
      </v-card-text>
    </v-col>

    <v-col
      cols="12"
      md="12"
      class="registration-container py-0"
      style="background: rgba(33, 33, 33, 0.4);"
    >
      <!-- <v-form v-model="isFilled"> -->
      <v-row align="center" class="pa-5">
        <v-col cols="12" md="6" class="my-1 px-1">
          <v-row>
            <span class="pl-2 pt-2 caption grey--text" v-if="this.vmode">
              Username
            </span>

            <v-card-text v-if="this.vmode">
              {{ users.username }}
            </v-card-text>

            <!-- <v-text-field
              v-if="!this.vmode"
              hint=""
              :rules="[rules.required]"
              flat
              solo-inverted
              v-model="users.username"
              class="text-none"
            /> -->
          </v-row>
        </v-col>

        <v-col cols="12" md="6" class="my-1 px-1">
          <v-row>
            <span class="pl-2 pt-2 caption grey--text" v-if="this.vmode">
              Email addresss
            </span>

            <v-card-text v-if="this.vmode">
              {{ users.email }}
            </v-card-text>

            <!-- <v-text-field
              v-if="!this.vmode"
              hint=""
              :rules="[rules.required, rules.email]"
              flat
              solo-inverted
              v-model="users.email"
            /> -->
          </v-row>
        </v-col>

        <v-col cols="12" v-if="!vmode">
          <!-- <v-divider class="mb-3"></v-divider> -->
        </v-col>

        <v-col cols="12" md="6" v-if="!vmode">
          <span class="caption grey--text">
            New Password
          </span>

          <v-text-field
            flat
            solo-inverted
            v-model="users.password"
            type="password"
          />
        </v-col>

        <v-col cols="12" md="6" v-show="users.password && !vmode">
          <span class="caption grey--text">
            Re-type Password
          </span>

          <v-text-field
            hint=""
            :rules="[rules.required]"
            flat
            solo-inverted
            v-model="users.c_password"
            type="password"
          />
        </v-col>

        <v-col md="6" class="hidden-sm-and-down" v-show="users.password" />

        <v-col class="mr-3">
          <v-row align="center" justify="end">
            <v-btn
              class="text-none"
              :disabled="isFilled"
              @click="vmode ? edit() : (tPin = true)"
              rounded
              depressed
              text
            >
              {{ this.vmode ? 'Edit password' : 'Update' }}
              <v-icon class="ml-1" small>
                {{ this.vmode ? 'edit' : 'update' }}
              </v-icon>
            </v-btn>
          </v-row>
        </v-col>

        <v-col v-if="!vmode">
          <v-row class="fill-height" align="end" justify="end">
            <v-btn class="text-none" @click="edit()" rounded depressed text>
              Cancel
              <v-icon class="ml-1" small>close</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <!-- </v-form> -->
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

import PinCard from '@/components/props/PinCard.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { postApi } from '@/http'
import { useFormRules } from '@/compositions'

export default {
  components: {
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
      username: '',
      email: '',
    },
    snackBarPayload: {},
    vmode: true,
    tPin: false,
    err: '',
    errMsg: ['Incorrect Transaction Pin!'],
  }),
  methods: {
    ...mapActions('snackBar', ['showSnackBar']),
    ...mapMutations('profile', ['SET_INFO']),
    promptMessage(message) {
      this.snackbar = true
      this.invalidRegMessage = message
    },
    cancel() {
      this.$router.push('/profile')
    },
    edit() {
      if (!this.vmode) this.populate()
      this.vmode = !this.vmode
    },
    populate() {
      for (let item in this.users) {
        Vue.set(this.users, item, this.userSuccess[item])
      }
    },
    update(pin) {
      if (!this.users.password || !this.users.c_password) {
        this.showPopup('error', 'Fields cannot be empty')
      } else {
        this.users.transaction_pin = pin

        postApi(`update/user/account/${this.users.id}`, this.users)
          .then((data) => {
            this.setMessage(data)
          })
          .catch((data) => {
            this.err = data
            this.showPopup('error', 'Passwords do not match')
          })
      }
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
            'Incorrect transaction pin. Password not updated'
          )

          break
        default:
          this.showPopup('success', 'Password updated successfully')
          this.vmode = !this.vmode
          this.SET_INFO(this.users)
          this.err = data
          this.users.password = ''
          this.users.c_password = ''
      }
    },
  },
  computed: {
    ...mapGetters('profile', ['user']),
    userSuccess() {
      return this.user
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
