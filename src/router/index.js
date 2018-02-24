import Vue from 'vue';
import Router from 'vue-router';
import { Dashboard, Posts, Register, Login } from '@/pages';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts,
    },
  ],
  mode: 'history', // removes '#' from url
});
