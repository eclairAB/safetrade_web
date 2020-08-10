<template>
  <v-card width="100%">
    <v-toolbar class="gradient" dark>
      <v-icon>security</v-icon>

      <v-toolbar-title class="hidden-xs-only"
        >Please type your transaction pin</v-toolbar-title
      >
      <v-toolbar-title class="hidden-sm-and-up"
        >Transaction pin</v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-btn
        class="text-none"
        rounded
        :disabled="!pin"
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
        @click="close"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-form v-model="formInput">
      <v-text-field
        class="mt-4 mx-3"
        @keyup.enter="submit"
        flat
        solo-inverted
        :append-icon="show ? 'visibility_off' : 'visibility'"
        :rules="[rules.required, rules.digitonly]"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        v-model="pin"
      />
    </v-form>
  </v-card>
</template>
<script type="text/javascript">
export default {
  data: () => ({
    formInput: false,
    pin: '',
    show: false,
    rules: {
      required: (value) => !!value || 'Required.',
      digitonly: (value) => {
        const pattern = /\D/
        return pattern.test(value) ? 'Invalid Input.' : false
      },
    },
  }),
  methods: {
    submit() {
      if (this.pin) {
        this.$emit('addPin', this.pin)
        this.close()
      }
    },
    close: function () {
      this.$emit('close')
      this.pin = ''
    },
  },
}
</script>
