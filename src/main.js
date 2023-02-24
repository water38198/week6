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
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";
// vee-validate

import App from "./App.vue";
import router from "./router";

// import "./assets/main.css";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

// 將當前 VeeValidate 的語系設定為繁體中文
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale("zh_TW");

const app = createApp(App);
app.use(LoadingPlugin);
app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.component("VField", Field);
app.component("VForm", Form);
app.component("ErrorMessage", ErrorMessage);
app.mount("#app");
