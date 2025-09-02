# V1 页面说明

这是V1版本的页面，展示了Vue 3 + Pinia + Vue Router的基本用法。

## 文件结构

```
src/pages/v1/
├── V1Home.vue      # 首页组件
├── V1About.vue     # 关于页面组件
└── README.md       # 说明文档
```

## 功能特性

### V1Home.vue
- 使用Pinia进行状态管理（计数器、用户信息）
- 展示Vue Router的路由功能
- 包含按钮交互和状态更新

### V1About.vue
- 显示项目信息
- 展示当前状态信息
- 使用Vue Router进行页面导航

## 使用的技术

1. **Pinia Store**:
   - `counter.js` - 计数器状态管理
   - `user.js` - 用户信息状态管理

2. **Vue Router**:
   - 路由配置在 `main.js` 中
   - 使用 `router-link` 和 `router.push()` 进行导航

3. **Vue 3 Composition API**:
   - 使用 `<script setup>` 语法
   - 响应式数据和计算属性
