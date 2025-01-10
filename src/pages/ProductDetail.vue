<template>
    <div class="product-detail-container" v-if="product">
      <!-- 包裹返回按鈕與圖片的容器 -->
      <div class="image-container">
        <button class="back-btn" @click="goBack">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <img :src="product.image" alt="商品圖片" class="product-image" />
      </div>
  
      <div class="topcontent">
        <h2>{{ product.name }}</h2>
        <p class="price">${{ product.price }}</p>
        <p class="description">{{ product.description }}</p>
        <span class="badge" v-if="product.tag">{{ product.tag }}</span>
      </div>
  
      <div class="quantity">
        <p>數量</p>
        <div class="quantitycontent">
          <button @click="decreaseQuantity">-</button>
          <span>{{ quantity }}</span>
          <button @click="increaseQuantity">+</button>
        </div>
      </div>
  
      <div class="options">
        <p>顏色</p>
        <div class="colorcontent">
          <label v-for="color in product.colors" :key="color">
            {{ color }}
            <input type="radio" name="color" :value="color" v-model="selectedColor" />
          </label>
        </div>
      </div>
  
      <div class="options">
        <p>模式</p>
        <div class="colormodel">
          <label v-for="mode in product.modes" :key="mode">
            {{ mode }}
            <input type="radio" name="mode" :value="mode" v-model="selectedMode" />
          </label>
        </div>
      </div>
  
      <textarea v-model="note" placeholder="新增備註"></textarea>
  
      <button
        class="add-to-cart-btn"
        @click="addToCart"
        :disabled="!isFormValid"
      >
        加入購物車
      </button>
    </div>
    <div v-else>
      <p>商品數據加載中...</p>
    </div>
  </template>
  
  <script>
  import { useCartStore } from "@/store/cart";
  import { useRouter } from "vue-router";
  
  export default {
    setup() {
      const router = useRouter();
  
      const goBack = () => {
        router.back(); // 返回上一頁
      };
  
      return {
        goBack,
      };
    },
    data() {
      return {
        product: null, // 商品默認為 null
        quantity: 1,
        selectedColor: null,
        selectedMode: null,
        note: "",
      };
    },
    computed: {
      isFormValid() {
        return this.selectedColor !== null && this.selectedMode !== null;
      },
    },
    methods: {
      fetchProduct() {
        const productId = parseInt(this.$route.params.id); // 確保 productId 是數字類型
        const products = [
        {
    id: 1,
    name: "便攜式狗狗飲水器",
    price: 99,
    description: "適合外出旅行或散步的便攜飲水器",
    image: new URL('@/assets/img/product1.png', import.meta.url).href,
    tag: "紅標",
    colors: ["白色", "綠色", "藍色"],
    modes: ["手動模式", "智能感應模式"],
  },
  {
    id: 2,
    name: "智能逗貓棒",
    price: 199,
    description: "自動偵測貓咪動態並吸引互動。",
    image: new URL('@/assets/img/product2.png', import.meta.url).href,
    tag: "紅標",
    colors: ["白色", "綠色"],
    modes: ["手動模式", "智能感應模式"],
  },
  {
    id: 3,
    name: "智能逗貓棒",
    price: 199,
    description: "自動偵測貓咪動態並吸引互動。",
    image: new URL('@/assets/img/product2.png', import.meta.url).href,
    tag: "紅標",
    colors: ["白色", "綠色"],
    modes: ["手動模式", "智能感應模式"],
  },
  {
    id: 4,
    name: "高級貓抓板",
    price: 299,
    description: "適合貓咪玩樂和休息的高級抓板",
    image: new URL('@/assets/img/product1.png', import.meta.url).href,
    tag: "藍標",
    colors: ["棕色", "灰色"],
    modes: ["耐磨模式", "靜音模式"],
  },
        ];
  
        const product = products.find((p) => p.id === productId);
  
        if (product) {
          this.product = product;
        } else {
          console.error("未找到對應的商品，productId:", productId);
        }
      },
      decreaseQuantity() {
        if (this.quantity > 1) this.quantity -= 1;
      },
      increaseQuantity() {
        this.quantity += 1;
      },
      addToCart() {
        if (!this.isFormValid) {
          alert("請選擇顏色和模式後再加入購物車！");
          return;
        }
  
        const cartStore = useCartStore();
        cartStore.addToCart({
          id: this.product.id,
          name: this.product.name,
          price: this.product.price,
          image: this.product.image,
          quantity: this.quantity,
          color: this.selectedColor,
          mode: this.selectedMode,
          note: this.note,
        });
  
        alert("商品已加入購物車！");
        this.$router.push("/index");
      },
    },
    watch: {
      "$route.params.id": {
        handler() {
          this.fetchProduct();
        },
        immediate: true,
      },
    },
  };
  </script>
  
  
  
  
  <style scoped>
  .product-detail-container {
    margin-top: 0;
    padding: 10px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center; /* 中心對齊內容 */
    gap: 10px; /* 元素間距 */
    background-color: #fff;
    padding-top: 0;
  }
  
  /* 禁用按鈕樣式 */
  .add-to-cart-btn:disabled {
    background-color: #cccccc; /* 反黑背景顏色 */
    color: #666666; /* 禁用文字顏色 */
    cursor: not-allowed; /* 禁用鼠標樣式 */
  }
  
  /* 返回按鈕樣式 */
  .back-btn {
    position: absolute; /* 絕對定位 */
    top: 10px; /* 距離圖片頂部 */
    left: 10px; /* 距離圖片左側 */
    background-color: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
    border: none;
    border-radius: 50%; /* 圓形按鈕 */
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 陰影效果 */
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .back-btn:hover {
    background-color: rgba(255, 255, 255, 1); /* 滑鼠懸停背景更明顯 */
  }
  
  .back-btn svg {
    width: 20px;
    height: 20px;
    stroke: #333; /* 返回按鈕的箭頭顏色 */
  }
  
  p.price {
      margin: 0;
      padding: 0;
  }
  
  p.description {
      margin: 0;
      padding: 0;
      font-size: 14px;
  
  }
  
  
  
  
  .topcontent {
    display: flex;
    flex-direction: column; /* 垂直排列 */
    align-items: flex-start; /* 內容靠左對齊 */
    width: 100%; /* 撐滿容器寬度 */
    padding: 0 10px; /* 添加內邊距，讓文字不緊貼邊框 */
    gap: 5px; /* 元素之間的間距 */
  }
  
  
  .image-container {
    position: relative; /* 返回按鈕的參考容器 */
    width: 100vw; /* 確保圖片撐滿整個視口寬度 */
    height: 300px; /* 固定高度 */
    overflow: hidden; /* 防止超出部分顯示 */
    margin: 0; /* 去掉容器可能的預設外邊距 */
  }
  
  .product-image {
    width: 100vw; /* 撐滿整個視口寬度 */
    height: 100%; /* 高度撐滿容器 */
    object-fit: cover; /* 確保圖片比例正確並填滿容器 */
    margin: 0; /* 確保沒有額外邊距 */
  }
  
  h2 {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    text-align: left; /* 標題靠左對齊 */
    width: 100%; /* 撐滿容器寬度 */
  }
  
  
  .price {
    color: #f15d43;
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    text-align: left; /* 價格靠左對齊 */
    width: 100%; /* 撐滿容器寬度 */
  }
  
  
  
  .description {
    color: #555;
    font-size: 16px;
    text-align: left; /* 描述靠左對齊 */
    width: 100%; /* 撐滿容器寬度 */
    padding: 0 10px; /* 內邊距讓文字不緊貼邊框 */
    line-height: 1.5; /* 增加行距 */
  }
  
  .badge {
    display: inline-block; /* 標籤顯示為內聯塊 */
    background-color: #f15d43; /* 背景顏色 */
    color: white; /* 文字顏色 */
    padding: 5px 10px; /* 內邊距 */
    border-radius: 10px; /* 圓角效果 */
    font-size: 12px; /* 字體大小 */
    text-align: left; /* 文字靠左對齊 */
    margin-left: 0px; /* 左側留白，讓標籤不緊貼容器 */
    margin-top: 5px; /* 添加上方間距 */
  }
  
  .quantity {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0px; /* 數量上下元素間距 */
    width: 100%; /* 撐滿容器 */
    text-align: left; /* 文字靠左對齊 */
  }
  
  .quantity p ,.options p {
      margin: 5px;
  }
  
  .quantitycontent {
    display: flex;
    align-items: center;
    gap: 10px; /* 按鈕與數量之間的間距 */
    background-color: #F7F7F7;
    border-radius: 100px;
    margin: 0;
   
  }
  
  .quantitycontent button {
    width: 30px;
    height: 30px;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 50%;
    background-color: #f7f7f7;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .quantitycontent button:hover {
    background-color: #50af6b;
    color: white;
  }
  
  .quantitycontent span {
    font-size: 18px;
    font-weight: bold;
  }
  
  .options {
    display: flex;
    flex-direction: column;
    gap: 0px;
    width: 100%; /* 撐滿容器 */
    margin: 0;
    margin-left: auto; /* 將選項推向右側 */
  }
  
  .options p {
    font-weight: 700;
  }
  
  .colorcontent, .colormodel {
    display: flex;
    flex-direction: col; /* 水平排列 */
    justify-content: space-between; /* 選項左右均分對齊 */
    align-items: center; /* 垂直居中 */
    gap: 20px; /* 增加選項之間的距離 */
    margin-left: 5px;
    width: 100%; /* 撐滿容器寬度 */
  }
  
  label {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 800;
  }
  
  
  
  
  textarea {
    width: 100%;
    height: 80px;
    border: none;
    border-radius: 8px;
    padding: 10px;
    resize: none;
    background-color: #f7f7f7;
    font-size: 14px;
    margin: 0;
  }
  
  .add-to-cart-btn {
    width: 100%;
    height: 40px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: #50af6b;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .add-to-cart-btn:hover {
    background-color: #45a062;
  }
  
  /* 針對 label 的樣式 */
  .colorcontent label,
  .colormodel label {
    display: flex; /* 將文字和圓圈橫向排列 */
    justify-content: space-between; /* 左右對齊 */
    align-items: center; /* 垂直居中 */
    width: 100%; /* 讓每個 label 撐滿容器 */
    padding: 5px 0; /* 增加上下間距 */
    font-size: 16px; /* 文字大小 */
  }
  
  .colorcontent label input,
  .colormodel label input {
    margin-left: auto; /* 圓圈向右對齊 */
  }
  
  
  </style> -->