/*
 * @Author: yangyongqian
 * @Date: 2023-07-23 15:51:33
 * @Description:路由配置
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/News')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/views/Product')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, form, next) => {
  nProgress.start()
  next()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
