import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout.vue'
import V1Home from '../pages/v1/V1Home.vue'
import V1About from '../pages/v1/V1About.vue'

// 1. App.vue 的 <router-view /> 渲染 → Layout.vue
//2. Layout.vue 的 <router-view /> 渲染 → V1Home.vue

// 路由配置
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'v1-home',
        component: V1Home
      },
      {
        path: 'about',
        name: 'v1-about',
        component: V1About
      }
    ]
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
