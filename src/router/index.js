import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import { Message } from 'element-ui'

Vue.use(Router)
Vue.use(Vuex)

const router = new Router({
	routes: [{
			path: '/',
			name: 'Mains',
			component: resolve => require(['@/page/Mains'], resolve),
		},
		{
			path: '/Mains',
			name: 'Mains',
			component: resolve => require(['@/page/Mains'], resolve),
		},
		{
			path: '/Counter',
			name: 'Counter',
			component: resolve => require(['@/page/Counter'], resolve),
		},
		{
			path: '/Login',
			name: 'Login',
			component: resolve => require(['@/page/Login'], resolve),
		},
		{
			path: '/403',
			name: '403',
			component: resolve => require(['@/page/error/403'], resolve),
		},
		{
			path: '/404',
			name: '404',
			component: resolve => require(['@/page/error/404'], resolve),
		},
		{
			path: '/500',
			name: '500',
			component: resolve => require(['@/page/error/500'], resolve),
		},
		{
			path: '/502',
			name: '502',
			component: resolve => require(['@/page/error/502'], resolve),
		},
	]
})

// 路由拦截
// 差点忘了说明,不是所有版块都需要鉴权的
// 所以需要鉴权,我都会在路由meta添加添加一个字段requireLogin,设置为true的时候
// 这货就必须走鉴权,像登录页这些不要,是可以直接访问的!!!
//router.beforeEach((to, from, next) => {
//	if(to.matched.some(res => res.meta.requireLogin)) {
//		// 判断是否需要登录权限
//		if(window.localStorage.getItem("loginUserBaseInfo")) {
//			// 判断是否登录
//			let lifeTime = JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime * 1000;
//			let nowTime = (new Date()).getTime(); // 当前时间的时间戳
//			if(nowTime < lifeTime) {
//				next();
//			} else {
//				Message({
//					showClose: true,
//					message: "登录状态信息过期,请重新登录",
//					type: "error"
//				});
//				next({
//					path: "/Login"
//				});
//			}
//		} else {
//			// 没登录则跳转到登录界面
//			next({
//				path: "/Login"
//			});
//		}
//	} else {
//		next();
//	}
//});

export default router;