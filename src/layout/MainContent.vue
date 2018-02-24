<template>
  <section class="app-main" :class="fullPageClass" :style="hiddenSidebarStyle">
    <levelbar v-if="this.$store.state.ui.levelbar"></levelbar>
    <router-view></router-view>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Levelbar from './Levelbar';

export default {
  computed: Object.assign({
    fullPageClass() {
      return this.fullpage ? 'full-page' : null;
    },
    hiddenSidebarStyle() {
      return !this.$store.state.ui.sidebar ? { 'margin-left': 0 } : null;
    },
  },
  mapGetters('ui', ['fullpage']),
  ),

  components: {
    Levelbar,
  },
};
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins.sass';

.app-main {
  height: 100%;
  padding-top: 50px;
  margin-left: 200px;
  transform: translate3d(0, 0, 0);
  transition: margin 200ms;

  @include mobile() {
    margin-left: 0;
  }

  z-index: 0;
}

.app-main.full-page {
  padding-top: 0px;
}
</style>
