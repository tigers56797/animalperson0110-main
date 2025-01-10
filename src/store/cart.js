import { defineStore } from "pinia"; // 确保正确引入 pinia

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [], // 購物車中的商品
  }),
  getters: {
    // 確保 getters 返回正確的邏輯
    showCartButton: (state) => state.cartItems.length > 0,
  },
  actions: {
    // 添加商品到購物車
    addToCart(item) {
      const existingItem = this.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        this.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    // 從購物車移除商品
    removeItem(id) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
    },
    // 增加商品數量
    increaseQuantity(id) {
      const item = this.cartItems.find((cartItem) => cartItem.id === id);
      if (item) item.quantity += 1;
    },
    // 減少商品數量
    decreaseQuantity(id) {
      const item = this.cartItems.find((cartItem) => cartItem.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          this.removeItem(id);
        }
      }
    },
  },
});