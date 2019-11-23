import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './route.data.js'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  routes
})

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
