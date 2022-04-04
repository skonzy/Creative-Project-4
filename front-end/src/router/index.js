import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Avatar from '../views/Avatar-builder.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/Avatar-builder',
    name: 'Avatar',
    component: Avatar
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
