<template>
  <section class="hero app-navbar" v-if="this.$store.state.ui.navbar">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div>NAV {{this.$store.state.ui.navbar}}</div>
    </nav>
  </section>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.app-navbar {

  background-color: #f8f8f8;
  position: fixed;
  min-width: 100%;
  z-index: 3;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

  .container {
    margin: auto 10px;
  }
}
</style>
