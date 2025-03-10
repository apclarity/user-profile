import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index.js";
import "./style.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(Toast, {
  timeout: 2000,
});
app.use(router);
app.use(pinia);
app.mount("#app");
