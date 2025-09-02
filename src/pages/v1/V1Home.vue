<template>
  <div class="v1-home">
    <h2>V1 首页</h2>
    <div class="content">
      <div class="counter-section">
        <h3>计数器示例 (使用 Pinia)</h3>
        <p>当前计数: {{ counterStore.count }}</p>
        <div class="buttons">
          <button @click="counterStore.increment" class="btn btn-primary">增加</button>
          <button @click="counterStore.decrement" class="btn btn-secondary">减少</button>
          <button @click="counterStore.reset" class="btn btn-danger">重置</button>
        </div>
      </div>
      
      <div class="user-section">
        <h3>用户信息 (使用 Pinia)</h3>
        <p>用户名: {{ userStore.name }}</p>
        <p>邮箱: {{ userStore.email }}</p>
        <button @click="updateUserInfo" class="btn btn-success">更新用户信息</button>
      </div>
      
      <div class="navigation-section">
        <h3>路由导航 (使用 Vue Router)</h3>
        <p>当前路由: {{ $route.path }}</p>
        <router-link to="/about" class="btn btn-info">前往关于页面</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '../../store/counter'
import { useUserStore } from '../../store/user'

// 使用 Pinia stores
const counterStore = useCounterStore()
const userStore = useUserStore()

// 更新用户信息的方法
const updateUserInfo = () => {
  userStore.updateUser({
    name: 'Vue 学习者',
    email: 'learner@vue.com'
  })
}
</script>

<style scoped>
.v1-home {
  max-width: 800px;
  margin: 0 auto;
}

.v1-home h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
}

.content {
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
}

.counter-section,
.user-section,
.navigation-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: #333;
}

.counter-section h3,
.user-section h3,
.navigation-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.counter-section p,
.user-section p,
.navigation-section p {
  color: #555;
  margin: 0.5rem 0;
}

.buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #1e7e34;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}
</style>
