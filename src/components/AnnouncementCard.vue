<template>
  <section class="announcement-card">
    <div class="left-announcement">
      <h2>最新消息</h2>
    </div>
    <div class="right-announcement">
      <p><span class="date">2023-12-22</span></p>
      <!-- 修正結構 -->
      <div class="right-announcement-content">
        <p class="ellipsis">
          📢 公休日公告：本月5日公休一天
          <i class="fa-solid fa-arrow-right"></i>
        </p>
      </div>
    </div>
  </section>
</template>
  
  <style scoped>
  .announcement-card {
  background-color: #ffffff;
  padding: 16px;
  text-align: left;
  display: flex; /* 使用 Flexbox */
  align-items: center; /* 垂直居中 */
  justify-content: space-between; /* 水平分配內容 */
  height: 90px; /* 固定高度 */
  overflow: hidden; /* 確保溢出的內容被隱藏 */
  box-sizing: border-box; /* 確保 padding 不影響寬度 */
  gap: 8px; /* 減小項目之間的間距 */
  justify-content: flex-start; /* 改為靠左排列 */

}
  
  .announcement-card h2 {
    margin: 0 0 8px;
    font-size: 18px;
    color: #F68432;
  }
  
  .announcement-card p {
    margin: 4px 0;
    font-size: 14px;
    color: #555;
  }

  .left-announcement{
    width: 50px;
    height: 50px;
    background-color: #FFE9DC;
    border-radius: 5px;
    margin: 10px; /* 外邊距，控制與其他元素的間距 */
    padding: 10px; /* 內邊距，控制內部內容與邊框的距離 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加陰影 */
    display: flex; /* 若需要容納子元素，可用彈性佈局 */
    justify-content: center; /* 水平居中 */
    text-align: center; /* 文字居中對齊 */
    margin: 0; /* 清除段落的默認外邊距 */
    flex-shrink: 0; /* 確保左側不被壓縮 */

  }

  .right-announcement {
    display: flex;
    flex-direction: column;
    margin: 0; /* 清除段落的默認外邊距 */
    
  }

  .right-announcement-content {
  display: flex;
  align-items: center; /* 垂直居中 */
  gap: 10px; /* 增加文字和箭頭之間的間距 */

}

  .ellipsis {
    display: inline-block; /* 支持宽度设置 */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏超出的文字 */
  text-overflow: ellipsis; /* 使用省略号代替超出的文字 */
  max-width: 200px; /* 保留省略号功能 */
  position: relative; /* 为箭头定位做准备 */
  padding-right: 20px; /* 给箭头预留空间 */
}

.ellipsis i {
  position: absolute; /* 将箭头定位到文本右侧 */
  right: 0; /* 靠右对齐 */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 调整垂直位置 */
  color: #555; /* 设置箭头颜色 */
  font-size: 14px; /* 根据需要调整箭头大小 */
}


  </style>