<template>
    <div class="member-page">
    
      <!-- 用於渲染子路由 -->
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: "MemberPage",
  };
  </script>
  
  <style scoped>
  .member-page {
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
    text-align: center;
  }
  </style>