import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const Personal = () => import (/* webpackChunkName: "personal" */ '@/views/personal/index.vue');
const Course = () => import (/* webpackChunkName: "course" */ '@/views/course/index.vue');

const Hour = () => import (/* webpackChunkName: "hour" */ '@/views/hour/index.vue');
const HourList = () => import (/* webpackChunkName: "hour" */ '@/views/hour/components/hourList.vue');


const Register = () => import (/* webpackChunkName: "register" */ '@/views/register/index.vue');


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: {
        name: 'hour',
      },
      children: [
        {
          path: 'course',
          name: 'course',
          meta: {
            title: '课程中心',
            depth: 1,
          },
          component: Course,
        },
        {
          path: 'hour',
          name: 'hour',
          meta: {
            title: '课时列表',
            depth: 2,
          },
          component: Hour,
          redirect: {
            name: 'all',
          },
          children: [
            {
              path: 'all',
              name: 'all',
              component: HourList,
              meta: {
                title: '课时列表',
                depth: 3,
              },
            },
            {
              path: 'increase',
              name: 'increase',
              component: HourList,
              meta: {
                title: '课时列表',
                depth: 4,
              },
            },
            {
              path: 'decrease',
              name: 'decrease',
              component: HourList,
              meta: {
                title: '课时列表',
                depth: 5,
              },
            },
          ],
        },

        {
          path: 'personal',
          name: 'personal',
          meta: {
            title: '个人中心',
            depth: 6,
          },
          component: Personal,
        },
      ],
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '绑定用户',
        depth: 7,
      },
      component: Register,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title && to.meta.title !== document.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
