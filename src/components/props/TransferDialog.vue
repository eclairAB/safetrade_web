<template>
  <v-row class="ma-0">
    <v-card width="100%">
      <v-toolbar class="gradient" dark>
        <v-img
          class="shrink circ mr-3"
          contain
          height="40px"
          :src="img"
          style="flex-basis: 40px;"
        ></v-img>

        <v-toolbar-title>Transfer coins</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
          class="text-none"
          icon
          color="rgba(198,52,59,0.7)"
          depressed
          @click="close"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-text-field
        flat
        class="mx-5 mt-3"
        solo-inverted
        v-model="searchBox"
        hint=""
        @keyup.enter="userSearch"
        @focus="populate"
      />

      <v-container>
        <v-row>
          <v-col
            lg="4"
            md="6"
            sm="4"
            cols="12"
            v-for="(item, index) in users"
            :key="index"
          >
            <v-card
              class="pa-2 ma-2"
              @click="setRID(item.id)"
              color="gradient-2"
            >
              <v-row>
                <v-col
                  md="4"
                  sm="12"
                  class="pa-2"
                  style="place-self: center; text-align: -webkit-center;"
                >
                  <v-avatar size="60px">
                    <img
                      :src="
                        item.user_display_pic
                          ? item.user_display_pic
                          : require('@/assets/user.png')
                      "
                    />
                  </v-avatar>
                </v-col>

                <v-col md="8" sm="12">
                  <v-row style="flex-direction: column;">
                    <span class="headline black--text">
                      {{ item.username }}
                    </span>
                    <span class="ovrflw">
                      {{ item.name_first }} {{ item.name_last }}
                    </span>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-dialog v-model="showDialog" :width="convertWidth" persistent>
        <transfer-card-style
          :balance="balance"
          :rid="rid"
          :curr="curr"
          @close="showDialog = false"
        />
      </v-dialog>
    </v-card>
  </v-row>
</template>
<script type="text/javascript">
import DataSource from '@/components/common/dataSource.js'
import TransferCardStyle from '@/components/props/TransferCardStyle.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  components: { TransferCardStyle },
  mixins: [DataSource],
  props: ['img', 'curr'],
  data: () => ({
    balance: '',
    showDialog: false,
    items: [],
    searchBox: '',
    rid: '',
    users: [],
  }),
  methods: {
    ...mapActions('userWallet', ['TRANSFER_SEARCH']),
    ...mapMutations('userWallet', ['SET_QUERY']),
    userSearch() {
      if (this.searchBox.trim()) {
        const payload = {}
        payload.keyword = this.searchBox
        this.TRANSFER_SEARCH(payload).then((data) => {
          this.users = data.data
        })
      }
    },
    setRID(id) {
      this.rid = id
      this.showDialog = true
    },
    getBal() {
      this.balance = global._.get(this.userWallet, [this.curr])
    },
    close: function () {
      this.$emit('close')
    },
    populate() {
      if (!this.users[0]) {
        this.TRANSFER_SEARCH().then((data) => {
          this.users = data.data
        })
      }
    },
    setUsername(index, username) {
      this.$set(this.users[index], username)
      return this.users[index].username
    },
  },
  computed: {
    ...mapGetters('userWallet', ['searchQuery', 'userWallet']),
    convertWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '100%'
        case 'sm':
          return '100%'
        case 'md':
          return '30%'
        case 'lg':
          return '30%'
        case 'xl':
          return '30%'
      }
      return null
    },
    istxtboxnull() {
      return this.searchBox.trim() != '' ? true : false
    },
  },
  updated() {
    this.getBal()
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

.ovrflw {
  overflow: hidden;
  white-space: nowrap;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  width: 150px;
  height: 1.2em;
}

.ovrflw:hover {
  overflow: visible;
}
</style>
