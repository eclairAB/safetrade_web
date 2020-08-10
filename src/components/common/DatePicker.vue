<template>
  <v-menu
    :close-on-content-click="false"
    :nudge-right="40"
    :disabled="disabled"
    v-model="show"
    offset-y
    color="#D76D77"
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ input }">
      <v-text-field
        :value="value"
        :disabled="disabled"
        :rules="[rules.required]"
        @input="input"
        v-bind="$attrs"
        hint=""
        clearable
        readonly
      />
    </template>
    <v-date-picker
      color="orange darken-2"
      v-model="date"
      no-title
      @input="show = false"
      hint=""
      :rules="[rules.required]"
    />
  </v-menu>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    picker: new Date().toISOString().substr(0, 10),
    show: false,
    date: null,
    rules: {
      required: (value) => !!value || 'Required.',
    },
  }),
  watch: {
    date() {
      const formattedDate = this.formatDate(this.date)
      this.$emit('input', formattedDate)
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null
      return date
    },
    input(val) {
      this.$emit('input', val)
    },
  },
}
</script>
