<template>
  <section class="app-main" :class="fullPageClass" :style="hiddenSidebarStyle">
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  computed: {
    fullPageClass() {
      return this.$store.state.ui.fullpage ? 'full-page' : null;
    },
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
  transition: margin 200ms;
  z-index: 0;
}

.app-main.full-page {
  padding-top: 0px;
}
</style>
