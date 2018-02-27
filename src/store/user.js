export default {
  name: 'user',
  namespaced: true,

  state: {
    uid: '',
    displayName: '',
    email: '',
    photoURL: '',
  },

  actions: {},

  getters: {},

  mutations: {
    SET_USER(state, user) {
      state.uid = user.uid;
      state.email = user.email;
      state.displayName = user.displayName;
      state.photoURL = user.photoURL;
    },
  },
};
