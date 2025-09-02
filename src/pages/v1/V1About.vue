<template>
  <div class="v1-about">
    <h2>V1 关于页面</h2>
    <div class="content">
      <div class="info-section">
        <h3>项目信息</h3>
        <p>这是一个使用 Vue 3 + Pinia + Vue Router 的初学者项目</p>
        <ul>
          <li>Vue 3 - 渐进式JavaScript框架</li>
          <li>Pinia - Vue的状态管理库</li>
          <li>Vue Router - Vue的官方路由管理器</li>
          <li>Vite - 快速的构建工具</li>
        </ul>
      </div>
      
      <div class="store-info">
        <h3>当前状态信息</h3>
        <p>计数器值: {{ counterStore.count }}</p>
        <p>用户: {{ userStore.name }} ({{ userStore.email }})</p>
        <button @click="goHome" class="btn btn-primary">返回首页</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCounterStore } from '../../store/counter'
import { useUserStore } from '../../store/user'

// 使用 Vue Router
const router = useRouter()

// 使用 Pinia stores
const counterStore = useCounterStore()
const userStore = useUserStore()

// 导航到首页
const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.v1-about {
  max-width: 800px;
  margin: 0 auto;
}

.v1-about h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
}

.content {
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
}

.info-section,
.store-info {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: #333;
}

.info-section h3,
.store-info h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.info-section p,
.store-info p {
  color: #555;
  margin: 0.5rem 0;
}

.info-section ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.info-section li {
  margin: 0.5rem 0;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
