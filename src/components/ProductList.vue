<template>
  <section class="product-list">
    <div class="product-category">
      <button 
        v-for="(category, index) in categories" 
        :key="index" 
        :class="{ selected: selectedIndex === index }" 
        @click="selectCategory(index)"
      >
        {{ category }}
      </button>
    </div>
    <h2>{{ categories[selectedIndex] }}</h2>
    <div v-if="filteredProducts.length > 0">


      <div class="product-card" v-for="product in filteredProducts" :key="product.id">
  <div class="product-image-wrapper" @click="goToDetail(product.id)">
    <img :src="product.image" alt="商品照片" />
    <!-- 加號按鈕 -->
    <button class="add-to-cart-button" @click="addToCart(product)">
            +
          </button>
  </div>
  <div>
    <p>{{ product.name }}</p>
    <p>${{ product.price }}</p>
    <p>{{ product.description }}</p>
  </div>
</div>

    </div>
    <p v-else>沒有可顯示的商品。</p>
  </section>
</template>
  
<!-- <script>
export default {
  data() {
    return {
      categories: ["最高人氣", "全部", "貓咪", "狗狗"], // 按鈕名稱
      selectedIndex: 0, // 預設選中第一個按鈕
      products: [
        {
          id: 1,
          name: "便攜式狗狗飲水器",
          price: 99,
          description: "適合外出旅行或散步的便攜飲",
          image: "/product1.png",
          category: ["狗狗"], // 單一分類
        },
        {
          id: 2,
          name: "智能逗貓棒",
          price: 199,
          description: "自動偵測貓咪動態並吸引互..",
          image: "/product2.png",
          category: ["貓咪"], // 單一分類
        },
        {
          id: 3,
          name: "多功能貓爬架",
          price: 199,
          description: "提供貓咪運動與娛樂的完美選",
          image: "/product2.png",
          category: ["貓咪"],
        },
        {
          id: 4,
          name: "寵物舒適床",
          price: 299,
          description: "適合貓狗的高品質舒適床墊。",
          image: "/product1.png",
          category: ["狗狗", "最高人氣"], // 同時屬於狗狗和最高人氣
        },
      ],
    };
  },
  computed: {
    filteredProducts() {
      const selectedCategory = this.categories[this.selectedIndex];

      // 如果選中 "全部"，返回所有商品
      if (selectedCategory === "全部") {
        return this.products;
      }

      // 篩選商品的邏輯：檢查 category 是否包含當前選中的分類
      return this.products.filter((product) =>
        product.category.includes(selectedCategory)
      );
    },
  },
  methods: {
    selectCategory(index) {
      this.selectedIndex = index; // 更新選中的按鈕索引
    },
    goToDetail(productId) {
    this.$router.push({ name: "ProductDetail", params: { id: productId } }); // 導航到詳細頁面，帶上商品 ID
  },
  },
};
</script> -->

<script>
export default {
  data() {
    return {
      categories: ["最高人氣", "全部", "貓咪", "狗狗"], // 按鈕名稱
      selectedIndex: 0, // 預設選中第一個按鈕
      products: [
        {
          id: 1,
          name: "便攜式狗狗飲水器",
          price: 99,
          description: "適合外出旅行或散步的便攜飲",
          image: "/product1.png",
          category: ["狗狗"], // 單一分類
        },
        {
          id: 2,
          name: "智能逗貓棒",
          price: 199,
          description: "自動偵測貓咪動態並吸引互..",
          image: "/product2.png",
          category: ["貓咪"], // 單一分類
        },
        {
          id: 3,
          name: "多功能貓爬架",
          price: 199,
          description: "提供貓咪運動與娛樂的完美選",
          image: "/product2.png",
          category: ["貓咪"],
        },
        {
          id: 4,
          name: "寵物舒適床",
          price: 299,
          description: "適合貓狗的高品質舒適床墊。",
          image: "/product1.png",
          category: ["狗狗", "最高人氣"], // 同時屬於狗狗和最高人氣
        },
      ],
    };
  },
  computed: {
    filteredProducts() {
      const selectedCategory = this.categories[this.selectedIndex];

      // 如果選中 "全部"，返回所有商品
      if (selectedCategory === "全部") {
        return this.products;
      }

      // 篩選商品的邏輯：檢查 category 是否包含當前選中的分類
      return this.products.filter((product) =>
        product.category.includes(selectedCategory)
      );
    },
  },
  methods: {
    selectCategory(index) {
      this.selectedIndex = index; // 更新選中的按鈕索引
    },
    goToDetail(productId) {
      this.$router.push({ name: "ProductDetail", params: { id: productId } }); // 導航到詳細頁面，帶上商品 ID
    },
    addToCart(product) {
      // 添加到購物車的邏輯
      console.log(`已將 ${product.name} 添加到購物車！`);
      // alert(`已將 ${product.name} 添加到購物車！`);
    },
  },
};
</script>
  
<style scoped>

.product-image-wrapper {
  position: relative; /* 設置容器為相對定位 */
  width: 90px;
  height: 90px;
}

.product-image-wrapper img {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover; /* 確保圖片不變形 */
}

.add-to-cart-button {
  position: absolute; /* 絕對定位按鈕 */
  bottom: 5px; /* 距離底部 10px */
  left: 5px; /* 距離右側 10px */
  width: 30px;
  height: 30px;
  background-color: #ffffff; /* 綠色背景 */
  color: #323232; /* 白色文字 */
  border: none;
  border-radius: 50%; /* 圓形按鈕 */
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 按鈕陰影 */
  transition: background-color 0.3s ease;
}

.add-to-cart-button:hover {
  background-color: #50AF6B; /* 滑鼠懸停時按鈕顏色 */
  color: #ffffff;
}

/* 加號按鈕 */
.add-to-cart-button {
  position: absolute; /* 絕對定位按鈕 */
  bottom: 8px; /* 距離底部 8px */
  right: 8px; /* 距離右側 8px */
  width: 30px;
  height: 30px;
  background-color: #50af6b; /* 按鈕背景白色 */
  color: #ffffff; /* 按鈕文字顏色 */
  border: none;
  border-radius: 50%; /* 圓形按鈕 */
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 按鈕陰影 */
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.add-to-cart-button:hover {
  background-color: #50af6b; /* 滑鼠懸停時背景顏色 */
  color: #ffffff; /* 滑鼠懸停時文字顏色 */
}


.product-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: white;
}

.product-card {
  display: flex;
  height: 80px;
  align-items: center;
  gap: 16px;
  background-color: white;
  padding: 12px;
  border-radius: 12px;
}

.product-list h2 {
  height: 10px;
  font-size: 20px;
  margin-left: 15px;
}

.product-card img {
  width: 90px;
  height: 90px;
  border-radius: 12px;
}

.product-card p {
  margin: 4px 0;
  font-size: 16px;
  color: #555;
  
}

.product-category {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.product-category button {
  background-color: white; /* 預設背景顏色 */
  color: grey; /* 預設文字顏色 */
  width: 78px;
  height: 30px;
  border: none; /* 移除邊框 */
  border-radius: 5px; /* 圓角 */
  font-size: 16px; /* 字體大小 */
  cursor: pointer; /* 鼠標為手型 */
  transition: background-color 0.3s, color 0.3s; /* 平滑過渡 */
}

.product-category button:hover {
  background-color: #50AF6B; /* 滑鼠懸停時背景顏色 */
  color: white; /* 滑鼠懸停時文字顏色 */
}

.product-category button.selected {
  background-color: #50AF6B; /* 被選中按鈕背景顏色 */
  color: white; /* 被選中按鈕文字顏色 */
}
</style>