<template>
  <v-col
    lg="12"
    cols="12"
    class="hidden-sm-and-down label-position"
    v-if="isShow"
  >
    <v-row justify="center" align="center" class="element-style">
      <!-- <v-flex xs12 lg10>
        <v-card-text class="display-3 font-weight-medium text-gradient">
          SAFE TRADE
        </v-card-text>
      </v-flex> -->

      <v-img
        position="start"
        class="mb-5 ml-5 image_"
        height="400px"
        :contain="enabled"
        :src="require('@/assets/Safetrade.png')"
      />
    </v-row>
  </v-col>
</template>
<script type="text/javascript">
export default {
  props: {
    isShow: Boolean,
  },
  data: () => ({
    enabled: true,
  }),
}
</script>
<style type="text/css">
.label-position {
  height: 100%;
  position: relative;
  z-index: 0;
}

.element-style {
  /*border: 1px solid red;*/
  /*height: -webkit-fill-available;*/
  height: 100%;
}

.text-gradient {
  background: -webkit-linear-gradient(#ce634a, #fab136);
  background: linear-gradient(#ce634a, #fab136);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/*min 960px*/
@media (max-width: 1600px) {
  .image_ {
    zoom: 0.8;
  }
}

@media (max-width: 1343px) {
  .image_ {
    zoom: 0.7;
  }
}

@media (max-width: 1183px) {
  .image_ {
    zoom: 0.6;
  }
}

@media (max-width: 1026px) {
  .image_ {
    zoom: 0.5;
  }
}
</style>
