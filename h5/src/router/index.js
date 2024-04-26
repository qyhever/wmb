import { createRouter, createWebHistory } from 'vue-router'

import TabbarLayout from '@/layouts/tabbar/index.vue'
// import BlankLayout from '@/layouts/blank/index.jsx'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: TabbarLayout,
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/classify',
        component: () => import('@/views/classify/index.vue')
      },
      {
        path: '/commodity',
        component: () => import('@/views/commodity/index.vue')
      },
      {
        path: '/cart',
        component: () => import('@/views/cart/index.vue')
      },
      {
        path: '/mine',
        component: () => import('@/views/mine/index.vue')
      }
    ]
  },
  {
    path: '/about',
    component: () => import('@/views/about.vue')
  },
  {
    path: '/icon',
    component: () => import('@/views/icon.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
