import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import "./router/premit.js";
Vue.config.productionTip = false;
//Element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 自定义全局组件
import "./icons/index.js";

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
