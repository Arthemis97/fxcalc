import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import "vue-search-select/dist/VueSearchSelect.css";
import "@/tailwind.css";

new Vue({
  render: h => h(App)
}).$mount("#app");
