<template>
  <v-col class="pa-10">
    <v-col id="bubble-container" :class="bubble_border_color(direction)">
      <v-avatar
        size="40"
        :class="bubble_avatar"
        :color="bubble_border_color(direction)"
      >
        <img :src="image ? img : require('@/assets/user.png')" />
      </v-avatar>
    </v-col>
  </v-col>
</template>
<script type="text/javascript">
export default {
  props: ['direction', 'image'],
  data: () => ({
    switch1: true,
    container1: 'red',
  }),
  computed: {
    bubble_border_color(e) {
      return e ? 'red' : 'green'
    },
    bubble_avatar(e) {
      return e ? 'avatar-holder1' : 'avatar-holder2'
    },
  },
}
</script>
<style type="text/css">
#bubble-container {
  position: relative;
  background-color: white;
  height: 5px;
  width: 5px;
  padding: 4px;
  border: solid 2px;
  border-radius: 50%;
}
#bubble-container::after {
  content: '';
  position: absolute;
  height: 5.5px;
  width: 5.5px;
  left: 1.5px;
  top: 1.3px;
  background: white;
}
.avatar-holder1 {
  position: absolute;
  left: -17px;
  bottom: -44px;
  border: solid 2px;
  border-radius: 50% 50% 50% 0;
}
.avatar-holder2 {
  position: absolute;
  top: -44px;
  left: -17px;
  border: solid 2px;
  border-radius: 50% 50% 50% 0;
}
</style>
