<template>
<section class="hero app-navbar is-dark " v-if="this.$store.state.ui.navbar">
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand nav" style="float:left">
      <div class="navbar-item">
      VueFire CMS
      </div>

      <button class="button navbar-burger is-dark" v-on:click="toggleSidebar">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <router-link class="navbar-item" to="/">
        <i class="fa fa-empire"></i>
        Dashboard
      </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/">Website</a>
      </div>

      <div class="navbar-end">
        <a class="navbar-item" href="/">
          <i class="fa fa-sign-out"></i>
          Logout
        </a>
      </div>
    </div>
  </nav>
</section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: Object.assign({},
    mapActions('ui', ['toggleSidebar']),
  ),
};
</script>

<style lang="scss" scoped>
.app-navbar {

  position: fixed;
  min-width: 100%;
  z-index: 3;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

  .container {
    margin: auto 10px;
  }

  .navbar-item i {
    padding-right:4px;
  }
}

.button.navbar-burger {
  border: 0px;
  border-radius: 0px;
  background-color: transparent;
}
</style>
