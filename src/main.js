import { createApp } from "vue";
import { createPinia } from "pinia";

// 匯入BS5、客製化
import "./assets/all.scss";
// 匯入BS5、客製化
import axios from "axios";
import VueAxios from "vue-axios";
// vue-loading
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
// vue-loading

// vee-validate

import App from "./App.vue";
import router from "./router";

// import "./assets/main.css";

const app = createApp(App);
app.use(LoadingPlugin);
app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);

app.mount("#app");
