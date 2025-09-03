<template>
  <div class="v2-post-detail">
    <h2>文章详情</h2>
    
    <!-- 加载状态 -->
    <div v-if="postsStore.isLoading" class="loading">
      <p>加载中...</p>
    </div>
    
    <!-- 错误信息 -->
    <div v-if="postsStore.getError" class="error">
      <p>{{ postsStore.getError }}</p>
      <button @click="postsStore.clearError()" class="btn btn-secondary">关闭</button>
    </div>
    
    <!-- 文章详情 -->
    <div v-if="postsStore.currentPost" class="post-detail">
      <div class="post-header">
        <h3>{{ postsStore.currentPost.title }}</h3>
        <div class="post-meta">
          <span class="post-id">ID: {{ postsStore.currentPost.id }}</span>
          <span class="post-user">用户ID: {{ postsStore.currentPost.userId }}</span>
        </div>
      </div>
      
      <div class="post-content">
        <h4>内容:</h4>
        <p>{{ postsStore.currentPost.body }}</p>
      </div>
      
      <div class="post-actions">
        <button @click="goBack" class="btn btn-secondary">返回列表</button>
        <button @click="editPost" class="btn btn-warning">编辑文章</button>
        <button @click="deletePost" class="btn btn-danger">删除文章</button>
      </div>
    </div>
    
    <!-- 未找到文章 -->
    <div v-else-if="!postsStore.isLoading && !postsStore.getError" class="not-found">
      <h3>文章未找到</h3>
      <p>请检查文章ID是否正确</p>
      <button @click="goBack" class="btn btn-primary">返回列表</button>
    </div>
    
    <!-- 编辑文章模态框 -->
    <div v-if="showEditForm" class="modal">
      <div class="modal-content">
        <h3>编辑文章</h3>
        <form @submit.prevent="handleUpdatePost">
          <div class="form-group">
            <label>标题:</label>
            <input v-model="editingPost.title" type="text" required class="form-input" />
          </div>
          <div class="form-group">
            <label>内容:</label>
            <textarea v-model="editingPost.body" required class="form-textarea"></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" :disabled="postsStore.isLoading">
              {{ postsStore.isLoading ? '更新中...' : '更新' }}
            </button>
            <button type="button" @click="cancelEdit" class="btn btn-secondary">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '../../store/posts'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()

// 响应式数据
const showEditForm = ref(false)
const editingPost = ref({
  id: null,
  title: '',
  body: ''
})

// 获取文章ID
const postId = parseInt(route.params.id)

// 获取文章详情
const fetchPostDetail = async () => {
  await postsStore.fetchPostById(postId)
}

// 返回列表
const goBack = () => {
  router.push('/v2/posts')
}

// 编辑文章
const editPost = () => {
  if (postsStore.currentPost) {
    editingPost.value = {
      id: postsStore.currentPost.id,
      title: postsStore.currentPost.title,
      body: postsStore.currentPost.body
    }
    showEditForm.value = true
  }
}

// 更新文章
const handleUpdatePost = async () => {
  const result = await postsStore.updatePost(editingPost.value.id, {
    title: editingPost.value.title,
    body: editingPost.value.body
  })
  if (result) {
    showEditForm.value = false
    editingPost.value = { id: null, title: '', body: '' }
    // 重新获取文章详情
    await fetchPostDetail()
  }
}

// 取消编辑
const cancelEdit = () => {
  showEditForm.value = false
  editingPost.value = { id: null, title: '', body: '' }
}

// 删除文章
const deletePost = async () => {
  if (confirm('确定要删除这篇文章吗？')) {
    const success = await postsStore.deletePost(postId)
    if (success) {
      router.push('/v2/posts')
    }
  }
}

// 监听路由变化
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchPostDetail()
  }
})

// 组件挂载时获取文章详情
onMounted(() => {
  fetchPostDetail()
})
</script>

<style scoped>
.v2-post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.v2-post-detail h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
}

.loading, .error {
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
}

.loading {
  background-color: #e3f2fd;
  color: #1976d2;
}

.error {
  background-color: #ffebee;
  color: #c62828;
}

.post-detail {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.post-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.post-header h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.post-meta {
  display: flex;
  gap: 2rem;
  color: #666;
  font-size: 0.9rem;
}

.post-content {
  margin-bottom: 2rem;
}

.post-content h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.post-content p {
  color: #333;
  line-height: 1.6;
  font-size: 1.1rem;
}

.post-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.not-found {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.not-found h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.not-found p {
  color: #666;
  margin-bottom: 2rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-textarea {
  height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s;
  font-size: 0.9rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>
