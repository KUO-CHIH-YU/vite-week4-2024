import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/',
      name: 'week4',
      component: () => import('../views/week4Login.vue')
    },
    {
      path: '/TodoList',
      name: 'TodoList',
      component: () => import('../views/TodoList.vue')
    },
    {
      path: '/Nest',
      name: 'Nest',
      component: () => import('../views/NestView.vue'),
      children: [
        {
          path: 'child',
          component: () => import('../views/NestChildView.vue')
        }
      ]
    },
    {
      path: '/TodoList',
      name: 'TodoList',
      component: () => import('../views/TodoList.vue')
    }
  ]
})

export default router
