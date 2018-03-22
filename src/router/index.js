import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import { Message } from 'element-ui'

Vue.use(Router)
Vue.use(Vuex)

const router = new Router({
	mode: 'history',
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
			path: '/MusicDetail',
			name: 'MusicDetail',
			component: resolve => require(['@/page/MusicDetail'], resolve),
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

export default router;