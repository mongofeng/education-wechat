import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const Personal = () => import (/* webpackChunkName: "personal" */ '@/views/personal/index.vue')
const Course = () => import (/* webpackChunkName: "course" */ '@/views/course/index.vue')
const About = () => import (/* webpackChunkName: "about" */ './views/About.vue')

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/personal',
      children: [
        {
          path: 'personal',
          name: 'personal',
          component: Personal
        },
        {
          path: 'course',
          name: 'course',
          component: Course
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});
