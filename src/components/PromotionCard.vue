<template>
  <div class="promotion-wrapper">
    <transition-group name="slide" tag="div" class="promotion-card-container">
      <div v-for="(promotion, index) in promotions" 
           :key="index" 
           v-show="currentIndex === index" 
           class="promotion-card">
        <div class="promotion-card-left">
          <h2>{{ promotion.title }}</h2>
          <p>現折 <span class="mainprice">${{ promotion.discount }}</span> </p>
          <p>期限至 {{ promotion.expiry }}</p>
        </div>
        <div class="discounting">
          <img :src="promotion.image" alt="Promotion Image" class="discountA" />
        </div>
      </div>
    </transition-group>

    <!-- 優惠券彈窗 -->
    <div v-if="showDialog" class="dialog-overlay">
      <div class="dialog">
        <h3>{{ selectedPromotion.title }}</h3>
        <p>現折：<span class="mainprice">${{ selectedPromotion.discount }}</span></p>
        <p>期限：{{ selectedPromotion.expiry }}</p>
        <button class="close-btn" @click="closePromotionDialog">關閉</button>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const promotions = ref([
      {
        title: "愛心首購優惠券",
        discount: 70,
        expiry: "2024-12-30",
        image: new URL('@/assets/img/promotion.png', import.meta.url).href,
      },
      {
        title: "寵物周驚喜折扣",
        discount: 50,
        expiry: "2025-01-31",
        image: new URL('@/assets/img/promotion2.png', import.meta.url).href,
      },
    ]);

    const currentIndex = ref(0);
    const showDialog = ref(false); // 控制彈窗顯示
    const selectedPromotion = ref({}); // 被選中的優惠券

    // 自動切換優惠券
    const switchPromotion = () => {
      currentIndex.value = (currentIndex.value + 1) % promotions.value.length;
    };

    const showPromotionDialog = (promotion) => {
      selectedPromotion.value = promotion;
      showDialog.value = true;
    };

    const closePromotionDialog = () => {
      showDialog.value = false;
    };

    onMounted(() => {
      setInterval(switchPromotion, 4000); // 每4秒切換一次
    });

    return {
      promotions,
      currentIndex,
      showDialog,
      selectedPromotion,
      showPromotionDialog,
      closePromotionDialog,
    };
  },
};
</script>
  
<style scoped>
.promotion-wrapper {
  position: relative;
  overflow: hidden;
}

.promotion-card-container {
  position: relative;
  width: 100%;
  height: 100px; /* 根據需求調整高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.promotion-card {
  position: absolute;
  width: 100%;
  height: 100px;
  display: flex;
  background: #f5e5cc;
  color: #333;
  border-radius: 8px;
  padding-left: 15px;
  align-items: center;
  box-sizing: border-box;
  transition: all 0.5s ease;
}

.promotion-card-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  flex: 1;
}

.promotion-card-left p {
  margin: 0;
  font-size: 14px;
  color: #014e72;
  text-align: left;
}

.promotion-card-left h2 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #014e72;
  text-align: left;
}

.discountA {
  height: 100px;
  width: 200px;
  max-width: 200px;
}

.discounting {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.mainprice {
  color: red;
  padding-left: 5px;
}

/* Vue transition 定義左右滑動動畫 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter {
  transform: translateX(100%); /* 從右側進入 */
  opacity: 0; /* 可選：初始透明度 */
}

.slide-leave-to {
  transform: translateX(-100%); /* 往左側離開 */
  opacity: 0; /* 可選：最終透明度 */
}
</style>