import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 引入 router
import { createPinia } from "pinia"; // 引入 Pinia

const app = createApp(App);
const pinia = createPinia();

app.use(router); // 啟用 vue-router
app.use(pinia); // 啟用 Pinia
app.mount("#app");