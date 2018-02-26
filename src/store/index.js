import Vue from 'vue';
import Vuex from 'vuex';

import ui from './ui';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    [user.name]: user,
    [ui.name]: ui,
  },
});

