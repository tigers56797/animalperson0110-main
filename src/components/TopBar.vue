<template>
    <div class="topbar">
      <div class="leftbar">
        <div class="allpage" @click="goToPage('menu')">
          <img src="/menu.png" alt="menu" />
        </div>
      </div>
      <div class="rightbar">
        <div class="order" @click="goToPage('orders')">
          <img src="/article.png" alt="article" />
        </div>
        <div class="message" @click="goToPage('messages')">
          <img src="/message.png" alt="message" />
        </div>
        <div class="scan" @click="goToPage('scan')">
          <img src="/qr_code.png" alt="qrcode" />
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  methods: {
    goToPage(page) {
      this.$router.push({ name: page });
    }
  }
};
</script>


<style>
.topbar {
  width: 90%; /* 撐滿寬度 */
  margin: 0;
  height: 50px; /* 固定高度 */
  position: absolute; /* 絕對定位，壓在背景圖上 */
  top: 30px; /* 固定在頂部 */
  z-index: 10; /* 提升層級 */
  display: flex;
  left: 0; /* 左側對齊 */
  align-items: center; /* 垂直對齊 */
  justify-content: space-between; /* 左右分佈 */
  padding: 0 16px; /* 左右內邊距 */
}

.leftbar {
  display: flex;
  align-items: center;
  flex: 1; /* 左側自適應寬度 */
}

.rightbar {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 靠右排列 */
  gap: 12px; /* 子元素之間的間距 */
}

.allpage,  
.order,
.message,
.scan {
  display: flex; /* 使用 Flexbox */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  width: 30px;
  height: 30px;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 100px;
  cursor: pointer;
}

.allpage img,
.order img,
.message img,
.scan img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

 



</style>
