<template>
  <div class="memberlist-bg">
    <!-- 成員區塊標題 -->
    <h2 class="section-title">成員</h2>
    <div class="scroll-container">
      <!-- 左側按鈕 -->
      <button class="scroll-btn left" @click="scrollLeft">←</button>
      
      <!-- 成員列表 -->
      <div class="member-list" ref="memberList">
        <div
          class="member-card"
          v-for="member in members"
          :key="member.id"
          @click="goToDetail(member.id)"
        >
          <!-- 成員圖片 -->
          <img :src="member.image" alt="成員照片" class="member-image" />
          <!-- 成員資訊 -->
          <div class="member-info">
            <p class="member-name">{{ member.name }}</p>
            <p class="member-age">年齡：{{ member.age }}歲</p>
            <p class="member-breed">品種：{{ member.breed }}</p>
          </div>
        </div>
      </div>

      <!-- 右側按鈕 -->
      <button class="scroll-btn right" @click="scrollRight">→</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      members: [
        { id: 1, name: "花花", age: 2, breed: "待寵清", image: "/member1.png" },
        { id: 2, name: "甜甜", age: 5, breed: "待寵清", image: "/member2.png" },
        { id: 3, name: "咪咪", age: 5, breed: "待寵清", image: "/member2.png" },
        { id: 4, name: "蛋蛋", age: 3, breed: "待寵清", image: "/member2.png" },
        { id: 5, name: "皮皮", age: 4, breed: "待寵清", image: "/member1.png" },
      ],
    };
  },
  methods: {
    // 左按鈕滾動
    scrollLeft() {
      const container = this.$refs.memberList;
      container.scrollLeft -= 200; // 每次向左滾動 200px
    },
    // 右按鈕滾動
    scrollRight() {
      const container = this.$refs.memberList;
      container.scrollLeft += 200; // 每次向右滾動 200px
    },
    // 點擊跳轉至詳細頁面
    goToDetail(id) {
      this.$router.push({ name: "MemberDetail", params: { id } });
    },
  },
};
</script>

<style scoped>
/* 整體背景 */
.memberlist-bg {
  background-color: #ffffff;

 
  position: relative;
}

/* 標題 */
.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 0px;
  margin-left: 10px;
}

/* 滾動容器 */
.scroll-container {
  position: relative;
  display: flex;
  align-items: center;
  overflow: visible;
}

/* 成員列表：橫向滾動 */
.member-list {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px 0;
  flex: 1; /* 填滿剩餘空間 */
}

/* 成員卡片 */
.member-card {
  flex: 0 0 150px; /* 固定卡片寬度 */
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* 成員圖片 */
.member-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

/* 成員資訊 */
.member-info p {
  margin: 4px 0;
  font-size: 14px;
  color: #555;
}

.member-name {
  font-weight: bold;
  color: #333;
}

/* 滾動按鈕 */
.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #ffcc80;
  border: none;
  color: #fff;
  font-size: 18px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.scroll-btn.left {
  left: -10px;
}

.scroll-btn.right {
  right: -10px;
}

.scroll-btn:hover {
  background-color: #ffa726;
}
</style>