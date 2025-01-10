<template>
  <div class="member-detail-container">
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
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <!-- 篩選條件按鈕 -->
    <div class="section-bar">
      <h2 class="section-number-title">浪浪家族成員</h2>
      <button class="category" @click="toggleFilter">
        {{ currentFilterLabel }}
        <span class="arrow-icon">
          ▲
          <br />
          ▼
        </span>
      </button>
    </div>

    <!-- 成員列表 -->
    <div class="member-list">
      <transition-group name="fade" tag="div">
        <div
          v-for="member in displayedMembers"
          :key="member.id"
          class="detail-card"
          @click="showMemberDetail(member)"
        >
          <div class="member-image-wrapper">
            <img :src="member.image" alt="成員照片" class="member-image" />
          </div>
          <div class="member-info">
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-age">年齡：{{ member.age }}歲</p>
            <p class="member-breed">品種：{{ member.breed }}</p>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- 彈框 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <img :src="selectedMember.image" alt="成員照片" />
        <h2>{{ selectedMember.name }}</h2>
        <p>年齡：{{ selectedMember.age }}歲</p>
        <p>品種：{{ selectedMember.breed }}</p>
        <button class="close-btn" @click="closeModal">關閉</button>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterType: "all", // 當前篩選條件
      members: [
        { id: 1, name: "花花", age: 2, breed: "待寵清", image: "/member1.png", type: "cat" },
        { id: 2, name: "甜甜", age: 5, breed: "待寵清", image: "/member1.png", type: "dog" },
        { id: 3, name: "咪咪", age: 3, breed: "待寵清", image: "/member1.png", type: "cat" },
        { id: 4, name: "皮皮", age: 4, breed: "待寵清", image: "/member1.png", type: "dog" },
      ],
      filteredMembers: [], // 篩選後的成員列表
      displayedMembers: [], // 用於動畫顯示的成員列表
      filters: [
        { value: "all", label: "全部" },
        { value: "cat", label: "貓咪" },
        { value: "dog", label: "狗狗" },
      ], // 篩選條件列表
      showModal: false, // 控制彈框顯示
      selectedMember: null, // 當前選中的成員
    };
  },
  computed: {
    // 當前篩選條件的標籤
    currentFilterLabel() {
      const currentFilter = this.filters.find(
        (filter) => filter.value === this.filterType
      );
      return currentFilter ? currentFilter.label : "全部";
    },
  },
  methods: {
    // 切換篩選條件
    toggleFilter() {
      const currentIndex = this.filters.findIndex(
        (filter) => filter.value === this.filterType
      );
      const nextIndex = (currentIndex + 1) % this.filters.length; // 循環切換
      this.filterType = this.filters[nextIndex].value;
      this.filterMembers(); // 切換後更新篩選結果
    },
    // 根據當前篩選條件過濾成員
    filterMembers() {
      if (this.filterType === "all") {
        // 如果是 "全部"，顯示所有成員
        this.filteredMembers = [...this.members];
      } else {
        // 按類型過濾
        this.filteredMembers = this.members.filter(
          (member) => member.type === this.filterType
        );
      }
      this.animateDisplay(); // 更新顯示列表
    },
    // 動畫顯示篩選後的成員
    animateDisplay() {
      this.displayedMembers = []; // 清空顯示列表
      this.filteredMembers.forEach((member, index) => {
        setTimeout(() => {
          this.displayedMembers.push(member);
        }, index * 100); // 每隔 0.1 秒添加一個成員
      });
    },
    // 顯示成員詳細資訊的彈框
    showMemberDetail(member) {
      this.selectedMember = member;
      this.showModal = true;
    },
    // 關閉彈框
    closeModal() {
      this.showModal = false;
      this.selectedMember = null;
    },
  },
  mounted() {
    // 初始化時加載所有成員
    this.filterMembers();
  },
};
</script>


<style scoped>
/* 整體容器 */
.member-detail-container {
  padding: 20px;
  background-color: #F5E5CC;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  background-image: url('@/assets/img/Ellipse 59.png'), url('@/assets/img/Ellipse 59.png'), url('@/assets/img/circle-icon.png');
  background-position: 10px 250px, 320px 148px, calc(100% - 50px) calc(100% - 50px);
  background-repeat: no-repeat;
  background-size: 50px, 30px, 60px; /* 控制圖案大小 */
}

.member-list {
  display: flex; /* 使用 Flexbox */
  flex-direction: column; /* 卡片按列顯示 */
  align-items: stretch; /* 子元素宽度拉伸到父容器的宽度 */
  gap: 2px; /* 卡片之間的間距 */
  width: 100%; /* 撐滿父容器 */
  box-sizing: border-box; /* 确保 padding 不影响宽度 */
}

/* 標題樣式 */
.section-number-title {
  font-size: 22px;
  font-weight: bold;
  color: #014E72;
  margin-bottom: 20px;
  align-self: flex-start;
}

/* 右側圖案樣式 */
.member-icon {
  display: flex;
  flex-shrink: 0; /* 防止圖案縮小 */
  align-items: center;
  justify-content: flex-end; /* 靠右對齊 */
}

.animal-icon {
  width: 30px;
  height: 30px;
  object-fit: cover;
  
}


.category {
  height: 30px;
  display: flex;
  border: none;
  justify-content: space-between; /* 保證文字和箭頭左右分佈 */
  background-color: #50AF6B;
  border-radius: 10px;
  color: white;
  text-align: center;
  padding: 0 10px; /* 調整按鈕內部左右間距 */
  margin-left: auto; /* 將按鈕推到右邊 */
  align-items: center;

}
.category:hover {
  background-color: #45a062;
}

.member-image-wrapper {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 100px;
  height: 100px;
  overflow: hidden; /* 確保圖片溢出時隱藏 */
  border-radius: 50%; /* 圓形效果 */
}


.arrow-icon {
  font-size: 8px; /* 調整箭頭大小 */
  margin-left: 10px; /* 與文字保持間距 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 10px; /* 控制上下箭頭的間距 */
}

/* 返回按鈕 */
.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  background-color: #ffa825;
  color: #fff;
  border: none;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;
}

.back-btn:hover {
  background-color: #ffa726;
}

/* 詳細資訊卡片 */
.detail-card {
  display: flex;
  flex-direction: row;
  justify-content: space-around; /* 靠右對齊 */
  background-color: #ffffff;
  border: 1px solid #EDD1A6 ;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 10px; /* 確保卡片內部有合適的空間 */

  height: auto; /* 高度自適應 */
  margin: 5px 0; /* 調整上下外邊距為 5px，讓卡片間距更窄 */
  gap: 10px; /* 控制圖片和文字之間的距離 */
}

.section-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  gap: 90px;
  justify-content: space-between; /* 讓子元素左右分佈 */
  width: 100%; /* 撐滿父容器 */
}

/* 圓形圖片 */


.member-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  display: block;
  margin: auto;
  
}

/* 成員資訊樣式 */
.member-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 取消垂直居中，改為向上對齊 */
  align-items: flex-start; /* 內容靠左對齊 */
  text-align: left; /* 確保文字靠左對齊 */
  width: 100%; /* 確保佔滿可用空間 */
  padding: 0; /* 移除內邊距 */
  margin: 0; /* 移除外邊距 */
  gap: 4px; /* 控制內部元素間距 */
}

.member-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0; /* 移除多餘的外邊距 */
}

.member-age{
  margin: 0; /* 移除多餘的外邊距 */
  color: #F15D43;
}

.member-breed {
  font-size: 16px;
  color: #555;
  margin: 0; /* 移除多餘的外邊距 */
}

.member-age span,
.member-breed span {
  color: #ff8c00;
  font-weight: bold;
}

/* 找不到成員的資訊 */
.not-found {
  font-size: 18px;
  color: #ff4d4f;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
}

/* 篩選條件按鈕 */
.filter-btn {
  background-color: #50af6b;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* 彈框樣式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center; /* 垂直方向居中 */
  justify-content: center; /* 水平方向居中 */
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: center;
}
.modal-content img {
  max-width: 100%; /* 確保圖片不會超出彈框的寬度 */
  height: auto; /* 保持圖片比例 */
  margin-top: 10px; /* 與其他元素保持一定距離 */
}

.close-btn {
  font-size: 14px;
  margin-top: 10px;
  background: #50af6b;
  color: white;
  border: none;
  border-radius: 10px;
  width: 100%;
  height: 36px;
  cursor: pointer;
}

/* 動畫效果 */
/* 卡片進入動畫 */
.fade-enter-active {
  animation: fade-in 0.5s ease forwards; /* 動畫時長為0.5秒 */
}

.fade-leave-active {
  animation: fade-out 0.5s ease forwards;
}

/* 初始狀態 */
.fade-enter {
  opacity: 0;
  transform: translateY(20px); /* 向下移動 */
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px); /* 從向下移動開始 */
  }
  to {
    opacity: 1;
    transform: translateY(0); /* 移動回原位 */
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }}
</style>