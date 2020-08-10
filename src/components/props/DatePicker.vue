<template>
  <v-col>
    <v-menu
      :close-on-content-click="false"
      :nudge-right="40"
      :disabled="disabled"
      v-model="show"
      offset-y
      max-width="290px"
      min-width="290px"
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          placeholder="mm-dd-yyyy"
          :value="value"
          :disabled="disabled"
          @input="input"
          v-bind="$attrs"
          clearable
          readonly
          solo
          append-icon="event"
          event-color="blue darken-4"
          class="mx-2"
          v-on="on"
        />
      </template>

      <v-date-picker
        color="orange"
        v-model="date"
        no-title
        @input="show = false"
      />
    </v-menu>
  </v-col>
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
  data() {
    return {
      show: false,
      date: null,
    }
  },
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
