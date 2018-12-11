import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Layout from '@/components/Layout'

Vue.use(VueRouter)
export const constantRouterMap = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'layout',
    component: Layout
    // redirect: '/home/menu',
    // children: [
    //   {
    //     path: 'menu',
    //     name: '首页',
    //     component: Login
    //   }]
  }

]

export default new VueRouter({
  mode: 'history',
  base: '/static/waiter/',
  routes: constantRouterMap
})
