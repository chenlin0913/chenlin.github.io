// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import Aplayer from 'vue-aplayer'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './vuex/store'
import router from './router'
import axiosPlugin from './utils/indexs'
import axiosHttp from './utils/apis'
import formats from './common/AjaxDataFormat'

/**
 * 本地
 */
Vue.prototype.$axios = axiosPlugin;
/**
 * 网易接口
 */
Vue.prototype.$axioss = axiosHttp;
/**
 * 网易接口解析
 */
Vue.prototype.$formats = formats;

Vue.config.productionTip = false
Vue.use(store);
Vue.use(Aplayer);
Vue.use(ElementUI, { size: 'small' });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
