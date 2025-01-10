import { createRouter, createWebHistory } from "vue-router";
import MemberPage from "../pages/MemberPage.vue";
import MemberList from "../components/MemberList.vue";
import MemberDetail from "../components/MemberDetail.vue";
import ProductList from "../components/ProductList.vue"; // 商品列表頁
import ProductDetail from "../pages/ProductDetail.vue"; // 商品詳情頁

const routes = [
  {
    path: "/member",
    component: MemberPage,
    children: [
      { path: "", name: "MemberList", component: MemberList },
      { path: ":id", name: "MemberDetail", component: MemberDetail, props: true },
    ],
  },
  {
    path: "/product",
    name: "ProductList",
    component: ProductList, // 商品列表頁
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: () => import("@/pages/ProductDetail.vue"),
    props: true,
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/pages/Cart/Cart.vue"),
  },
  {
    path: "/",
    redirect: "/index", // 根路径重定向到 /index
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/pages/index/Index.vue"),
    meta: { keepAlive: false },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/index", // 未知路径重定向到首页
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 滾動到頁面頂部
    return { top: 0 };
  },
});

export default router;