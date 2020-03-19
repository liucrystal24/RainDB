// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VCharts from "v-charts";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import BaiduMap from "vue-baidu-map";
import { BmlMarkerClusterer } from "vue-baidu-map";

import App from "./App";
import router from "./router";

Vue.prototype.axios = axios;
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: "3IOUQ6Hcni8qwdXXyMD8sGssfCOGwjYD"
});
Vue.component("bml-marker-cluster", BmlMarkerClusterer);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
