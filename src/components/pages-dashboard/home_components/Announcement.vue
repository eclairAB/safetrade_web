<template>
  <v-col cols="12" lg="12" sm="12" class="mb-4">
    <v-card>
      <v-toolbar class="gradient" dark dense>
        <v-icon>announcement</v-icon>

        <v-toolbar-title>Announcments</v-toolbar-title>
      </v-toolbar>

      <v-col>
        <v-row justify="center">
          <v-card-text>
            {{ text }}
          </v-card-text>
          <v-divider class="mx-3"></v-divider>
          <v-card-text>
            {{ text }}
          </v-card-text>
          <v-divider class="mx-3"></v-divider>
          <v-card-text>
            {{ text }}
          </v-card-text>
        </v-row>
      </v-col>
    </v-card>
  </v-col>
</template>
<script type="text/javascript">
export default {
  data: () => ({
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  }),
}
</script>
