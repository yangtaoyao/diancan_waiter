// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './routes'
import App from './App'
import store from './store'
import { getToken } from './assets/js/auth'
import { ToastPlugin } from 'vux'
import './assets/iconfont/iconfont.css'

// toast
Vue.use(ToastPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

// 不重定向白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  store.dispatch('updateLoadingStatus', {isLoading: true})
  if (getToken()) { // 判断是否登录，成功登录
    if (whiteList.indexOf(to.path) !== -1 || to.path === '/') { // 包含白名单
      // console.log('next:/')
      console.log('next包含白名单:' + to.path)
      next('/home')
    } else {
      console.log('next:' + to.path)
      next()
    }
  } else { // 非登录
    if (whiteList.indexOf(to.path) !== -1) { // 包含白名单
      next()
    } else {
      next('/login')
    }
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app-box')
