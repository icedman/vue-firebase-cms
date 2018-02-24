<template>
  <div class="page">
    <h2>{{msg}}</h2>
    Welcome, {{this.$store.state.user.displayName}}.
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Menu from '../menus';

export default {
  data() {
    return {
      msg: 'The Dashboard',
    };
  },

  computed: Object.assign(
    {
    },
    mapGetters('ui', ['fullpage']),
  ),

  methods: Object.assign(
    {
    },
    mapActions('ui', ['toggleSidebar', 'toggleFullPage']),
  ),

  mounted() {
    this.$store.commit('ui/SET_MENU', Menu);
    this.$store.commit('ui/SHOW_FULLPAGE', false);
    this.$store.commit('ui/SHOW_LEVELBAR', true);
  },
};
</script>

<style lang="scss" scoped>
.page {
  margin: 20px;
}
</style>
