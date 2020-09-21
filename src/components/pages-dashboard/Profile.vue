<template>
  <v-container>
    <v-col cols="12" class="gradient py-2 pl-2">
      <v-row justify="center" align="center">
        <v-col cols="12" md="3">
          <picture-input
            ref="pictureInput"
            @change="changePic"
            :key="componentKey"
            width="200"
            height="200"
            margin="16"
            accept="image/jpeg, image/png"
            size="10"
            radius="100"
            :prefill="users.user_display_pic ? base64_img : prefill"
            :prefillOptions="{
              fileName: 'image',
              fileType: 'png',
            }"
            :zIndex="1"
          ></picture-input>
        </v-col>

        <v-col cols="12" md="9">
          <v-row align="center" class="text-center text-md-left">
            <v-card-text class="display-1">
              {{ user.name_first }} {{ user.name_last }}
            </v-card-text>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <v-col>
      <basic-information />
    </v-col>

    <v-col>
      <account-info />
    </v-col>

    <v-dialog v-model="tPin" :width="convertWidth" persistent>
      <v-card>
        <pin-card @close="closeDialog" @addPin="trade" />
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import AccountInfo from '@/components/pages-profile/AccountInfo.vue'
import BasicInformation from '@/components/pages-profile/BasicInformation'
import PinCard from '@/components/props/PinCard.vue'
import PictureInput from 'vue-picture-input'
import Prefill from '@/assets/prefill.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { getApi, postApi } from '@/http'
export default {
  components: { PictureInput, AccountInfo, BasicInformation, PinCard },
  mixins: [Prefill],
  data: () => ({
    users: {},
    base64_img: '',
    snackBarPayload: {},
    errTxt: '',
    componentKey: 0,
    errorMessage: false,
    tPin: false,
    errCol: '',
    err: '',
    errMsg: ['Incorrect Transaction Pin!'],
  }),
  methods: {
    ...mapActions('profile', [/*'UPDATE_DP', */ 'FETCH_USERS']),
    ...mapActions('snackBar', ['showSnackBar']),
    ...mapMutations('profile', ['SET_DP']),
    setImg() {
      this.revertPic = this.$refs.pictureInput.image
    },
    trade(pin) {
      this.users.transaction_pin = pin
      console.log(this.users)
      /*postApi(`update/user/dp/${this.users.id}`, this.users).then((data) => {
        this.setMessage(data)
      })*/
    },
    closeDialog() {
      this.tPin = false
      this.componentKey++
    },
    changePic() {
      if (this.$refs.pictureInput.image) {
        var selectedImage = this.$refs.pictureInput.image
        this.users.image = selectedImage

        this.tPin = true
      } else {
        this.showPopup('error', 'File not supported')
      }
    },
    getBase64_image() {
      getApi(`base64/dp`).then((data) => {
        this.base64_img = data
      })
    },
    populate() {
      this.users = Object.assign({}, this.users, this.userSuccess)
      this.users.id = this.user.id
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
            'Incorrect transaction pin. Picture not updated'
          )
          this.FETCH_USERS()
          this.componentKey++
          break
        default:
          this.showPopup('success', 'Avatar updated successfully')
          this.SET_DP(this.users.user_display_pic)
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
    this.getBase64_image()
    this.populate()
  },
}
</script>
