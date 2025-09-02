import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '游客',
    email: 'guest@example.com',
    isLoggedIn: false
  }),
  
  getters: {
    // 可以在这里添加需要的getters
  },
  
  actions: {
    updateUser(userData) {
      this.name = userData.name
      this.email = userData.email
      this.isLoggedIn = true
    },
    
    login(userData) {
      this.name = userData.name
      this.email = userData.email
      this.isLoggedIn = true
    },
    
    logout() {
      this.name = '游客'
      this.email = 'guest@example.com'
      this.isLoggedIn = false
    }
  }
})
