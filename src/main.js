// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'font-awesome/css/font-awesome.css';

import Vue from 'vue';
import Buefy from 'buefy';
// import Axios from 'axios';
import lodash from 'lodash';
import firebase from 'firebase';

import App from './App';
import router from './router';
import store from './store';

// import config from '../config/config.json';

Vue.config.productionTip = false;

/*
firebase.initializeApp(config.firebase);
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.commit('user/SET_USER', user);
    router.push('/');
  } else {
    store.commit('user/SET_USER', { displayName: '', email: '' });
  }
});

router.beforeEach((to, from, next) => {
  if (!firebase.auth().currentUser && to.matched.some(record => record.meta.requiresAuth)) {
    next('Login');
    return;
  }
  next();
});
*/

Vue.prototype._ = lodash;
// Vue.prototype.$http = Axios;
Vue.prototype.$firebase = firebase;
Vue.use(Buefy);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
