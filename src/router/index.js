import Vue from 'vue';
import Router from 'vue-router';
import { Dashboard, Posts, Register, Login } from '@/pages';

Vue.use(Router);

export default new Router({
  routes: [
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
      path: '/forget',
      name: 'Forget',
      component: Login,
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts,
      meta: {
        requiresAuth: true,
      },
    },
  ],
  mode: 'history', // removes '#' from url
});
