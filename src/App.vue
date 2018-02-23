<template>
  <div id="app">
    <navbar></navbar>
    <div>
      <sidebar></sidebar>
      <main-content></main-content>
    </div>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';

export default {
  name: 'App',
  components: {
    navbar: Navbar,
    sidebar: Sidebar,
    mainContent: MainContent,
  },
};
</script>

<style lang="scss">
html {width: 100%; height: 100%}
body {width: 100%; height: 100%}
#app {width: 100%; height: 100%}

// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #8c67ef;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

#app {
  height: 100%;
  min-height: 100%;
  //display: flex;
  //flex-direction: column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
