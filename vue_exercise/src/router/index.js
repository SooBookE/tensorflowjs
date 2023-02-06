import { createRouter, createWebHistory } from 'vue-router'
import AddressView from '../views/Address.vue'

const routes = [
  {
    path: '/',
    name: 'address',
    component: AddressView
  },
  {
    path: '/qrcode',
    name: 'qrcode',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/QrcodeView.vue')
  },
  {
    path: '/news',
    name: 'news',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/NewsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
