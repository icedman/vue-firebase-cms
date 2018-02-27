// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'font-awesome/css/font-awesome.css';

import merge from 'webpack-merge';

import Vue from 'vue';
import Buefy from 'buefy';
// import Axios from 'axios';
import lodash from 'lodash';
import firebase from 'firebase';

import App from './App';
import router from './router';
import store from './store';

import config from '../config/config.json';

config.firebase = null; // disabled firebase
Vue.config.productionTip = false;

Vue.prototype._ = lodash;
// Vue.prototype.$http = Axios;
Vue.prototype.$firebase = firebase;
Vue.use(Buefy);

let currentUID;
let vueInstance;
const initialState = JSON.stringify(store.state);

function runVue() {
  /* eslint-disable no-new */
  return new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
  });
}

function bootstrap() {
  if (!config.firebase) {
    runVue();
    return;
  }

  //-------------------------
  // setup router (auth gate)
  //-------------------------
  router.beforeEach((to, from, next) => {
    if (!firebase.auth().currentUser && to.matched.some(record => record.meta.requiresAuth)) {
      next('Login');
      return;
    }
    next();
  });

  //-------------------------
  // setup firebase
  //-------------------------
  firebase.initializeApp(config.firebase);

  firebase.auth().onAuthStateChanged((user) => {
    if (user && currentUID === user.uid) {
      return;
    }

    //-------------------------
    // cleanup on new user
    //-------------------------
    store.replaceState(merge(store.state, JSON.parse(initialState)));

    // react on user login
    if (user) {
      store.commit('user/SET_USER', user);

      // save userdata to database (separate from auth user list)
      firebase.database().ref(`users/${user.uid}`).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      if (router.path === '/login') {
        router.push('/');
      }
    }

    //-------------------------
    // ..only then we run Vue
    //-------------------------
    if (!vueInstance) {
      vueInstance = runVue();
    }
  });
}

/* walk before we run with firebase */
bootstrap();

