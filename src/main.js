// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import Aplayer from 'vue-aplayer'
import VueLazyload from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './vuex/store'
import router from './router'
import axiosHttp from './utils/apis'
import formats from './common/AjaxDataFormat'
import commonData from './common/CommonData'


/**
 * 网易接口
 */
Vue.prototype.$axioss = axiosHttp;
/**
 * 网易接口解析
 */
Vue.prototype.$formats = formats;
/**
 *公共静态数据 
 */
Vue.prototype.$commonData = commonData;

Vue.config.productionTip = false
Vue.use(store);
Vue.use(Aplayer);
Vue.use(ElementUI, { size: 'small' });
Vue.use(VueLazyload, {
//    preLoad: 1.3,
//    error: 'dist/error.png',
//    loading: 'dist/loading.gif',
//    attempt: 1
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to,from,next)=>{
//		let loginFlag = JSON.parse(sessionStorage.getItem("isLogin")); //获取登录状态
//	  if (to.meta.login && !loginFlag) {//判断进入的路由功能模块是否需要登录并且当前是出处于已登录状态
//	    next({path:'../common/login',query:{fromUrl:from.path}});
//	  }else{
//	    next();
//	  }
});
