<template>
  <div>
    <TopBar /> <!-- 移除 openMenu 的事件绑定 -->
    <NavBar />

    <!-- 触发点元素 -->
    <div ref="triggerElement" class="trigger"></div>

    <div class="content-wrapper">
      <ShopInfoCard />
      <PromotionCard />
    </div>
    <div class="content-bottom">
      <AnnouncementCard />
      <MemberList />
      <ProductList />
    </div>

    <!-- 查看购物车按钮 -->
    <div v-if="showCartButton" class="cart-button">
      <button @click="goToCart">查看購物車</button>
    </div>

    <!-- 儲值提示欄 -->
    <div v-show="showMembershipBar" class="membership-bar">
      <img src="@/assets/img/gift-box.png" class="membership-image" alt="會員促銷圖片" />
      儲值D幣成為會員享商家折扣
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'vue-router';
import TopBar from "@/components/TopBar.vue";
import NavBar from "@/components/NavBar.vue";
import ShopInfoCard from "@/components/ShopInfoCard.vue";
import PromotionCard from "@/components/PromotionCard.vue";
import AnnouncementCard from "@/components/AnnouncementCard.vue";
import MemberList from "@/components/MemberList.vue";
import ProductList from "@/components/ProductList.vue";

export default {
  components: {
    TopBar,
    NavBar,
    ShopInfoCard,
    PromotionCard,
    AnnouncementCard,
    MemberList,
    ProductList,
  },
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();
    const showCartButton = computed(() => cartStore.showCartButton);
    const showMembershipBar = ref(false);

    const triggerElement = ref(null); // 触发点的引用

    const observer = new IntersectionObserver(
      ([entry]) => {
        showMembershipBar.value = !entry.isIntersecting && !showCartButton.value; // 同時檢查購物車按鈕是否顯示
      },
      {
        root: null, // 使用整个视口作为检测区域
        threshold: 0, // 当触发点完全离开视口时触发
      }
    );

    onMounted(() => {
      if (triggerElement.value) {
        observer.observe(triggerElement.value);
      }
    });

    onUnmounted(() => {
      observer.disconnect();
    });

    const goToCart = () => {
      router.push({ name: 'Cart' });
    };

    return {
      showCartButton,
      showMembershipBar,
      goToCart,
      triggerElement,
    };
  },
};
</script>

<style scoped>
/* 样式保持不变 */
html, body {
  min-height: 200vh;
  margin: 0;
  padding: 0;
}



.content-wrapper {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
}

.content-bottom {
  padding: 10px;
  background-color: #f3f3f3;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
}

.trigger {
  height: 1px;
  background: transparent;
  margin-top: 10px;
}

.cart-button {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  background-color: #000000;
  color: white;
  text-align: center;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  max-width: 100%; /* 不超過視窗 */
}
.cart-button button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.membership-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgb(255, 255, 255);
  color: rgb(103, 103, 103);
  text-align: center;
  padding: 10px 0;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.membership-image {
  height: 20px;
  width: auto;
}
</style>