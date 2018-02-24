import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/pages/Dashboard';
import Posts from '@/pages/Posts';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts,
    },
  ],
});
