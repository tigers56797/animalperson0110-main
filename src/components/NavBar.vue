<template>
    <header class="nav-bar">
     
      <div class="background">
        <img src="/shop-logo.png" alt="店家Logo" class="shop-logo" />
        <div class="info">
          <h1>汪喵星球(流浪動物之家)</h1>
          <p><i class="fa-regular fa-clock"></i> 營業中</p>
          <div class="location"><i class="fa-solid fa-location-dot"></i> 高雄市前鎮區復興四路6號</div>
        </div>
      </div>
    </header>
  </template>
  
  <style scoped>
  .nav-bar {
    width: 100%;
    height: 280px; /* 调整背景图片的高度 */
    background: url("/shop-image.png") no-repeat center/cover;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }


  
  .background {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    box-sizing: border-box;
    background-color: #fff;/* 提高背景与内容对比 */
    border-radius: 12px 12px 0 0;
    position: relative; /* 父級容器設置相對定位 */
  }
  
  .shop-logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid white;
    margin-right: 12px;
  }
  
  .info {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  
  h1 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }
  
  p {
    margin: 4px 0;
    font-size: 14px;
    color: #666;
  }
  
  .location {
    font-size: 14px;
    color: #666;
  }
  </style>