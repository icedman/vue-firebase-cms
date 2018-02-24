import Vue from 'vue';
import Router from 'vue-router';
import { Dashboard, Posts } from '@/pages';

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
  mode: 'history', // removes '#' from url
});
