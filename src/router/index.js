import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/pages/Dashboard';
import Posts from '@/pages/Posts';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

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
});
