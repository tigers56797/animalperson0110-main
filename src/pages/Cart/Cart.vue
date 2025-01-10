<template>
  <div class="cart-container">
    <!-- 白色顶部 -->
    <div class="carttop">
      <!-- 返回按鈕 -->
      <button class="back-btn" @click="$router.push('/')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          color="black"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h2>購物車</h2>
    </div>

    <!-- 下方灰色區域 -->
    <div class="cart-body">
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>購物車目前是空的</p>
      </div>

      <div v-else>
        <div class="cart-item" v-for="item in cartItems" :key="item.id">
          <img :src="item.image" alt="商品圖片" class="item-image" />
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p>$<span class="price-small-value">{{ item.price }}</span></p>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(item.id)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item.id)">+</button>
            </div>
           
          </div>
          <button class="remove-btn" @click="removeItem(item.id)">刪除</button>
        </div>

        <div class="cart-summary">
          <p>總數量：{{ totalQuantity }} 件</p>
          <p>總金額：<span class="price-value">${{ totalPrice }}</span></p>
          <button class="checkout-btn" @click="openCheckoutDialog">
            前往結帳
          </button>
        </div>
      </div>
    </div>

    <!-- 彈窗 -->
    <div v-if="showCheckoutDialog" class="dialog-overlay">
      <div class="dialog">
        <img src="@/assets/img/prop.png" alt="">
        <p>開發中</p>
        <button @click="closeCheckoutDialog" class="close-dialog-btn">確認</button>
      </div>
    </div>

    <!-- 提示欄 -->
    <div
      v-if="showSuggestionBar"
      class="suggestion-bar"
      @click="closeSuggestionBar"
    >
      <img src="@/assets/img/gift-box.png" class="membership-image" alt="會員促銷圖片" />
      <p>不想錯過其他商品嗎？</p>
      <din class="deletep">
        <p>x</p>
      </din>
     
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/store/cart";
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();

    const cartItems = computed(() => cartStore.cartItems);
    const totalQuantity = computed(() =>
      cartStore.cartItems.reduce((total, item) => total + item.quantity, 0)
    );
    const totalPrice = computed(() =>
      cartStore.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    );

    // 控制彈窗的顯示
    const showCheckoutDialog = ref(false);

    // 方法：打開與關閉彈窗
    const openCheckoutDialog = () => {
      showCheckoutDialog.value = true;
    };

    const closeCheckoutDialog = () => {
      showCheckoutDialog.value = false;
    };

    // 方法：刪除、增加、減少
    const removeItem = (id) => {
      cartStore.removeItem(id);
    };

    const increaseQuantity = (id) => {
      cartStore.increaseQuantity(id);
    };

    const decreaseQuantity = (id) => {
      cartStore.decreaseQuantity(id);
    };

    const showSuggestionBar = ref(false);

    const closeSuggestionBar = () => {
      showSuggestionBar.value = false;
      router.push({ name: "Index" });
    };

   

    onMounted(() => {
      setTimeout(() => {
        showSuggestionBar.value = true;
      }, 2000);
    });

    return {
      cartItems,
      totalQuantity,
      totalPrice,
      showCheckoutDialog,
      openCheckoutDialog,
      closeCheckoutDialog,
      showSuggestionBar,
      closeSuggestionBar,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
    };
  },
};
</script>

<style scoped>
/* 整體容器 */
.cart-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 白色的顶部区域 */
.carttop {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
}

.carttop h2 {
  margin: 0 auto;
  text-align: center;
  font-size: 18px;
}

/* 返回按鈕 */
.back-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #000;
}

.cart-body {
  flex: 1;
  background-color: #f4f4f4; /* 灰色背景 */
  overflow-y: auto; /* 如果內容過多，允許滾動 */
  padding: 20px;
}

/* 空購物車的提示 */
.empty-cart {
  text-align: center;
  font-size: 18px;
  color: #666;
}

/* 購物車項目 */
.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 10px;
  margin-bottom: 10px;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.item-details {
  flex: 1;
  margin-left: 20px;
}

.remove-btn {
  background-color: rgb(208, 22, 22); /* 按鈕背景顏色 */
  color: white; /* 按鈕文字顏色 */
  border: none; /* 去掉邊框 */
  padding: 5px 15px; /* 增加內邊距 */
  border-radius: 100px; /* 圓角按鈕 */
  cursor: pointer; /* 鼠標指針樣式 */
  font-size: 12px; /* 字體大小 */
  display: inline-flex; /* 讓按鈕內容橫向排列 */
  align-items: center; /* 垂直置中 */
  justify-content: center; /* 水平居中 */
  gap: 5px; /* 內部圖標和文字間距 */
  width: auto; /* 按鈕寬度適應內容 */
  height: 30px; /* 固定按鈕高度 */
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #f7f7f7;
  border-radius: 100px;
  margin: 0;
  width: 70px;
}

.deletep {
  margin-left: 100px;
}

/* 購物車總結 */
.cart-summary {
  margin-top: 20px;
  text-align: right;
}

.checkout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  width: 100%;
  height: 36px;
  background-color: #45a062;
  color: white;
  border: none;
  padding: 5px 20px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 30px;
}



.membership-image {
  height: 30px;
  width: auto;
}

.suggestion-bar p {
  margin: 0;
  font-weight: bold;
  font-size: 14px;
}

.marginn {
  margin-left: 100px;
}

.suggestion-bar {
  position: fixed;
  bottom: 0; /* 靠底部 */
  left: 50%; /* 靠左偏移，並準備居中 */
  transform: translateX(-50%); /* 水平居中 */
  width: 100%; /* 提示框的寬度 */
  background: linear-gradient(90deg, #f5902a, #ff9800, #f5c34e, #f5902a);
  animation: gradientAnimation 7s infinite; /* 動畫名稱與時間 */
  border-radius: 0px 0px 0 0;
  color: #ffffff;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  background-size: 200% 200%;
  z-index: 1000;
  display: flex; /* 使用 Flexbox 排版 */
  align-items: center; /* 垂直方向置中 */
  justify-content: flex-start; /* 水平方向置中 */
  padding-left: 30px;
  gap: 10px; /* 圖片與文字的間距 */
  height: 80px; /* 提示框高度 */
}

.suggestion-bar p {
    color: white;
    font-weight: bold;

}
.remove-btn {
    background-color: rgb(208, 22, 22);
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 100px;
    cursor: pointer;
    font-size: 12px;
}

.price-value {
  color:  rgb(208, 22, 22); /* 设置数值颜色为红色 */
  font-weight: bold; /* 数值加粗 */
  font-size: 18px;
}

.price-small-value {
  color:  rgb(3, 3, 3); /* 设置数值颜色为红色 */
  font-weight: bold; /* 数值加粗 */
  font-size: 14px;
}


/* 定義漸層動畫 */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%; /* 起始位置 */
  }
  50% {
    background-position: 100% 50%; /* 中間位置 */
  }
  100% {
    background-position: 0% 50%; /* 返回到起始位置 */
  }
}

.membership-image {
  height: 30px; /* 圖片高度 */
  width: auto; /* 保持圖片寬高比例 */
 
}


.close-suggestion-btn {
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  margin-left: auto; /* 將按鈕推到最右側 */
  
}

/* 彈窗樣式 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.dialog p {
  font-size: 20px;
}

.dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 260px;
  height: 300px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  z-index: 1002;
}

.dialog img {
  width: 100px;
}

.close-dialog-btn {
  margin-top: 10px;
  padding: 5px 15px;
  background: #45a062;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 180px;
  margin-top: 20px;
}
</style>