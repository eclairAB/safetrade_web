<template>
  <v-snackbar top right :color="color" v-model="isShow" :timeout="3000">
    {{ text }}
    <v-btn text color="primary" @click.native="isShow = false">
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>
<script type="text/javascript">
export default {
  props: ['color', 'isShow', 'text'],
  data: () => ({}),
}
</script>
