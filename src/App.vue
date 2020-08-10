<template>
  <v-app>
    <v-content class="secondary">
      <backdraft />
      <router-view />
    </v-content>

    <v-snackbar
      top
      right
      :color="snackBar.color"
      :timeout="3000"
      v-model="snackBar.show"
    >
      {{ snackBar.text }}
      <v-btn text color="primary" @click.native="snackBar.show = false">
        <v-icon color="white">close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>
<script type="text/javascript">
import backdraft from '@/components/pages-landing/backdraft.vue'
import { mapGetters } from 'vuex'
export default {
  components: { backdraft },
  data: () => ({}),
  computed: {
    ...mapGetters('snackBar', ['snackBar']),
  },
}
</script>
