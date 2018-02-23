export default {
  name: 'ui',
  namespaced: true,

  state: {
    sidebar: true,
    navbar: true,
    levelbar: true,
    fullpage: false,
    menu: [],
  },

  actions: {
    toggleFullPage({ commit }) {
      commit('SHOW_FULLPAGE', !this.state.ui.fullpage);
    },

    toggleSidebar({ commit }) {
      commit('SHOW_SIDEBAR', !this.state.ui.sidebar);
    },
  },

  getters: {
  },

  mutations: {
    SHOW_SIDEBAR(state, show) {
      state.fullpage = false;
      state.sidebar = show;
    },
    SHOW_NAVBAR(state, show) {
      state.fullpage = false;
      state.navbar = show;
    },
    SHOW_LEVELBAR(state, show) {
      state.levelbar = show;
    },
    SHOW_FULLPAGE(state, show) {
      state.navbar = !show;
      state.sidebar = !show;
      state.levelbar = !show;
      state.fullpage = show;
    },
    SET_MENU(state, menu) {
      state.menu = menu;
    },
  },
};
