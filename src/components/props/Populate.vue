<template>
  <v-col>
    <v-dialog :value="selectForm" scrollable persistent max-width="400px">
      <v-card>
        <v-card-title
          class="font-weight-regular title white--text background-color"
          >{{ title }}
        </v-card-title>

        <v-card-text class="card-height">
          <v-form v-model="valid" ref="form">
            <v-data-table
              v-model="setselectionList"
              :headers="headers"
              :items="setFinalDiagnosis"
              class="elevation-1 title"
              hide-actions
              select-all
              item-key="setFinalDiagnosis"
            >
              <template slot="item" slot-scope="props">
                <td>
                  <v-checkbox
                    :value="props.item"
                    primary
                    hide-details
                    v-model="setselectionList"
                    @change="selectedItems"
                  ></v-checkbox>
                </td>
                <td>
                  {{ props.item }}
                </td>
              </template>
            </v-data-table>
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="gray darken-5"
            text
            @click.stop="$emit('close')"
            @click="clearFields"
          >
            Close
          </v-btn>
          <v-btn
            color="#163f79"
            text
            @click.stop="$emit('return')"
            @click.enter="clearFields"
            @click="$emit('AddPush')"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    selectForm: {
      type: Boolean,
      default: false,
    },
    value: [String, Array, Object],
    title: [String],
    form: [Object],
    selected: [String, Array],
  },
  data() {
    return {
      content: this.value,
      valid: false,
      headers: [
        {
          text: 'List of Final Diagnosis',
          align: 'center',
          sortable: false,
          value: 'item',
        },
      ],
      search: [],
    }
  },
  computed: {
    ...mapGetters('heart', ['finalDiagnosis']),
    ...mapGetters('selectedDiagnosis', ['selectionList']),
    setselectionList: {
      get: function () {
        return this.selectionList
      },
      // setter
      set: function (value) {
        this.$nextTick(function () {
          return this.fetchselectionList(value)
        })
      },
    },
    setFinalDiagnosis: {
      get: function () {
        return this.finalDiagnosis
      },
      // setter
      set: function (value) {
        this.$nextTick(function () {
          return this.addfinalDiagnosis(value)
        })
      },
    },
  },
  methods: {
    ...mapActions('heart', ['addfinalDiagnosis']),
    ...mapActions('selectedDiagnosis', ['fetchselectionList']),
    selectedItems() {
      this.fetchselectionList(this.setselectionList)
    },
    clearFields() {
      this.$refs.form.reset()
    },
  },
}
</script>
