<template>
  <div>
    <aside class="menu app-sidebar" :class="{'animate-is-hidden': !this.$store.state.ui.sidebar }">
      <ul class="menu-list" v-for="n in 10" :key="n">
        <li><a>Item {{n}}</a></li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.app-sidebar {
  height: 100%;
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  padding: 20px 0 50px;
  width: 200px;
  min-width: 45px;
  max-height: 100vh;
  height: calc(100% - 50px);
  z-index: 2;
  background: #FFF;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
  transition: left 1000ms;
}
.app-sidebar.animate-is-hidden {
  left: -200px;
  transition: left 1000ms;
}
</style>
