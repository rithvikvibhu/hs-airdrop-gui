import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import Intro from '../views/Intro.vue'

const routes = [
  {
    path: '/',
    name: 'Intro',
    component: Intro,
  },
  {
    path: '/claim',
    name: 'Claim',
    component: () =>
      import(/* webpackChunkName: "claim" */ '../views/Claim.vue'),
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: process.env.IS_ELECTRON
    ? createWebHashHistory()
    : createWebHistory(),
  routes,
})

export default router
