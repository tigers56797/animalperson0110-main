<template>
    <div class="shopinfocard">
      <!-- 本店使用金流區塊 -->
      <div class="cash-use-card">
        <div class="cash-use-card-details">
          <h2>本店使用金流</h2>
        </div>
        <div class="cash-icon">
            <img src="/a-icon.png" alt="A Coin" />
            <img src="/d-icon.png" alt="D Coin" />
            <img src="/cash-icon.png" alt="Cash Coin" />

        </div>
      </div>
      
      <!-- 評價區塊 -->
      <div class="review-card">
        <div class="review-card-details">
          <div class="review-content-top">
            <h2>評價 </h2>
              <div class="review-content">
                <p>⭐️</p> 
                <p>5.0</p>
              </div>
          </div>
          <img src="/reward.png" alt="評價" class="reward" />
        </div>
        <button class="view-review">查看更多<i class="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .shopinfocard {
  display: flex;
  flex-wrap: nowrap; /* 禁止換行，讓項目都水平排列 */
  justify-content: space-between; /* 在水平方向上分配空間 */
  gap: 10px; /* 卡片之間的間距 */
  margin: 0 0;
}
  
  .review-card {
    background: white;
    flex: 1 1 calc(48% - 10px); /* 寬度調整，改為百分比 */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    height: 80px; /* 固定高度 */
  }

  .cash-use-card{
  background: white;
  flex: 1 1 calc(48% - 10px); /* 寬度調整，改為百分比 */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
  gap: 5px; /* 控制标题和图标之间的间距 */
  
  }

  .review-content-top{
    padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
  }

  .review-content-top h2{
    margin: 2px;
    
  }

  
  .cash-icon img {
  width: 32px;
  height: 32px;
  margin: 0  /* 图片左右间距 */
}
  .cash-icon {
  display: flex;
  justify-content: center; /* 图标水平居中 */
  align-items: center;
  gap: 8px; /* 图标之间的间距 */}

  
  .review-card-details {
    text-align: center;
    align-items: center;
   
    display: flex;
  }
  .review-content{
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
  }

  .review-content p{
    color: #FEA42C;
  }
  
  .view-review {
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 100px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    
  }

  .view-review i{
    font-size: 14px; /* 調整圖標大小 */
  margin-left: 8px; /* 與文字保持間距 */
  vertical-align: middle; /* 圖標與文字垂直對齊 */
  }
  
  .view-review:hover {
    background-color: #555;
  }

  .shopinfocard  h2{
    font-size: 16px;
  }

  .reward{
    margin: 0; /* 清除可能存在的默认外边距 */
    width: 30px;
    height: 30px;
  }

  .review-content p {
  margin: 0; /* 清除默认外边距 */
  padding: 0; /* 清除内边距 */
  line-height: 1.2; /* 调整行高 */
  
}

.cash-use-card-details h2 {
  font-size: 16px; /* 标题字体大小 */
  margin: 0; /* 清除默认外边距 */
  padding: 0; /* 清除默认内边距 */
  text-align: center;
}

  
  </style>