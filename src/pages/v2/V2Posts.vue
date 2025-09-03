<template>
  <div class="v2-posts">
    <h2>V2 文章管理 (Pinia + Axios)</h2>
    
    <!-- 加载状态 -->
    <div v-if="postsStore.isLoading" class="loading">
      <p>加载中...</p>
    </div>
    
    <!-- 错误信息 -->
    <div v-if="postsStore.getError" class="error">
      <p>{{ postsStore.getError }}</p>
      <button @click="postsStore.clearError()" class="btn btn-secondary">关闭</button>
    </div>
    
    <!-- 操作按钮 -->
    <div class="actions">
      <button @click="fetchPosts" class="btn btn-primary">刷新文章</button>
      <button @click="showCreateForm = true" class="btn btn-success">新建文章</button>
    </div>
    
    <!-- 创建文章表单 -->
    <div v-if="showCreateForm" class="create-form">
      <h3>创建新文章</h3>
      <form @submit.prevent="handleCreatePost">
        <div class="form-group">
          <label>标题:</label>
          <input v-model="newPost.title" type="text" required class="form-input" />
        </div>
        <div class="form-group">
          <label>内容:</label>
          <textarea v-model="newPost.body" required class="form-textarea"></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="postsStore.isLoading">
            {{ postsStore.isLoading ? '创建中...' : '创建' }}
          </button>
          <button type="button" @click="cancelCreate" class="btn btn-secondary">取消</button>
        </div>
      </form>
    </div>
    
    <!-- 文章列表 -->
    <div class="posts-list">
      <h3>文章列表</h3>
      <div v-if="postsStore.allPosts.length === 0 && !postsStore.isLoading" class="empty">
        <p>暂无文章，点击"新建文章"开始创建</p>
      </div>
      
      <div v-else class="posts-grid">
        <div v-for="post in postsStore.allPosts" :key="post.id" class="post-card">
          <h4>{{ post.title }}</h4>
          <p class="post-body">{{ post.body }}</p>
          <div class="post-actions">
            <button @click="viewPost(post.id)" class="btn btn-info">查看</button>
            <button @click="editPost(post)" class="btn btn-warning">编辑</button>
            <button @click="deletePost(post.id)" class="btn btn-danger">删除</button>
          </div>
        </div>
      </div>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '../../store/posts'

const router = useRouter()
const postsStore = usePostsStore()

// 响应式数据
const showCreateForm = ref(false)
const showEditForm = ref(false)
const newPost = ref({
  title: '',
  body: ''
})
const editingPost = ref({
  id: null,
  title: '',
  body: ''
})

// 获取文章列表
const fetchPosts = async () => {
  await postsStore.fetchPosts()
}

// 创建文章
const handleCreatePost = async () => {
  const result = await postsStore.createPost(newPost.value)
  if (result) {
    showCreateForm.value = false
    newPost.value = { title: '', body: '' }
  }
}

// 取消创建
const cancelCreate = () => {
  showCreateForm.value = false
  newPost.value = { title: '', body: '' }
}

// 查看文章详情
const viewPost = (id) => {
  router.push(`/v2/posts/${id}`)
}

// 编辑文章
const editPost = (post) => {
  editingPost.value = {
    id: post.id,
    title: post.title,
    body: post.body
  }
  showEditForm.value = true
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
  }
}

// 取消编辑
const cancelEdit = () => {
  showEditForm.value = false
  editingPost.value = { id: null, title: '', body: '' }
}

// 删除文章
const deletePost = async (id) => {
  if (confirm('确定要删除这篇文章吗？')) {
    await postsStore.deletePost(id)
  }
}

// 组件挂载时获取文章列表
onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
.v2-posts {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.v2-posts h2 {
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

.actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.create-form, .posts-list {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
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

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.post-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: #f9f9f9;
}

.post-card h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.post-body {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-actions {
  display: flex;
  gap: 0.5rem;
}

.empty {
  text-align: center;
  color: #666;
  padding: 2rem;
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
