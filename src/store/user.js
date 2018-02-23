export default {
  name: 'user',
  namespaced: true,

  state: {
    user: {
      displayName: '',
      email: '',
    },
  },

  actions: {
  },

  getters: {
  },

  mutations: {
    SET_USER(state, user) {
      state.user.displayName = user.displayName;
      state.user.email = user.email;
    },
  },
};
