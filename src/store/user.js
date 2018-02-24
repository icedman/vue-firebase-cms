export default {
  name: 'user',
  namespaced: true,

  state: {
    displayName: '',
    email: '',
  },

  actions: {},

  getters: {},

  mutations: {
    SET_USER(state, user) {
      state.displayName = user.displayName;
      state.email = user.email;
    },
  },
};
