<template>
  <div id="app">
    <transition name="fade"><router-view /></transition>
    <!-- 這裡只留 router-view -->
      
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* 基本樣式保持即可 */
#app {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

html, body {
  padding: 0;
  margin: 0;
}

/* 動畫效果：淡入淡出 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 在 v2.x 中 */ {
  opacity: 0;
}
</style>