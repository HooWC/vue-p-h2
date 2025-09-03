import { defineStore } from 'pinia'
import axios from 'axios'

// 使用JSONPlaceholder作为测试API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    loading: false,
    error: null,
    currentPost: null
  }),

  getters: {
    // 获取所有文章
    allPosts: (state) => state.posts,
    
    // 根据ID获取文章
    getPostById: (state) => (id) => state.posts.find(post => post.id === id),
    
    // 获取加载状态
    isLoading: (state) => state.loading,
    
    // 获取错误信息
    getError: (state) => state.error
  },

  actions: {
    // 获取所有文章 (Read)
    async fetchPosts() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${API_BASE_URL}/posts?_limit=10`)
        this.posts = response.data
      } catch (error) {
        this.error = '获取文章列表失败: ' + error.message
        console.error('获取文章失败:', error)
      } finally {
        this.loading = false
      }
    },

    // 根据ID获取单篇文章 (Read)
    async fetchPostById(id) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${API_BASE_URL}/posts/${id}`)
        this.currentPost = response.data
        return response.data
      } catch (error) {
        this.error = '获取文章详情失败: ' + error.message
        console.error('获取文章详情失败:', error)
        return null
      } finally {
        this.loading = false
      }
    },

    // 创建新文章 (Create)
    async createPost(postData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(`${API_BASE_URL}/posts`, {
          title: postData.title,
          body: postData.body,
          userId: 1
        })
        
        // 添加到本地状态（模拟创建成功）
        const newPost = {
          id: Date.now(), // 使用时间戳作为临时ID
          ...response.data
        }
        this.posts.unshift(newPost)
        
        return newPost
      } catch (error) {
        this.error = '创建文章失败: ' + error.message
        console.error('创建文章失败:', error)
        return null
      } finally {
        this.loading = false
      }
    },

    // 更新文章 (Update)
    async updatePost(id, postData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.put(`${API_BASE_URL}/posts/${id}`, {
          id: id,
          title: postData.title,
          body: postData.body,
          userId: 1
        })
        
        // 更新本地状态
        const index = this.posts.findIndex(post => post.id === id)
        if (index !== -1) {
          this.posts[index] = { ...this.posts[index], ...postData }
        }
        
        return response.data
      } catch (error) {
        this.error = '更新文章失败: ' + error.message
        console.error('更新文章失败:', error)
        return null
      } finally {
        this.loading = false
      }
    },

    // 删除文章 (Delete)
    async deletePost(id) {
      this.loading = true
      this.error = null
      try {
        await axios.delete(`${API_BASE_URL}/posts/${id}`)
        
        // 从本地状态中移除
        this.posts = this.posts.filter(post => post.id !== id)
        
        return true
      } catch (error) {
        this.error = '删除文章失败: ' + error.message
        console.error('删除文章失败:', error)
        return false
      } finally {
        this.loading = false
      }
    },

    // 清除错误信息
    clearError() {
      this.error = null
    },

    // 清除当前文章
    clearCurrentPost() {
      this.currentPost = null
    }
  }
})
