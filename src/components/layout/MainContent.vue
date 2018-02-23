<template>
  <section class="app-main" :style="[hiddenSidebarStyle]">
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  computed: {
    hiddenSidebarStyle() {
      return !this.$store.state.ui.sidebar ? { 'margin-left': 0 } : null;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  height: 100%;
  padding-top: 50px;
  margin-left: 200px;
  transform: translate3d(0, 0, 0);
  transition: margin 1000ms;
  z-index: 0;
}
</style>
